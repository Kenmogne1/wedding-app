// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors({
  origin: [
    "https://wedding-fabrice-ange.vercel.app", 
    "https://wedding-ange-et-fabrice.vercel.app", 
    "http://localhost:5173",  // Pour les tests locaux
    "http://localhost:3000"  
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
  optionsSuccessStatus: 200
}));
app.use(express.json());

if (!process.env.MONGODB_URI) {
  console.error('❌ MONGODB_URI manquant dans .env');
  process.exit(1);
}

// Configuration MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
mongoose.connection.on('connected', () => {
  console.log('✅ Connecté à MongoDB Atlas');
});

mongoose.connection.on('error', (err) => {
  console.error('❌ Erreur de connexion MongoDB:', err.message);
});

// Schéma Guest
const guestSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  prenom: { type: String, required: true },
  telephone: { 
    type: String, 
    required: false,  
    default: null
  },
  email: String,
  // 0 = Ne participe pas, 1+ = Participe
  nombrePersonnes: { type: Number, default: 0 }, 
  sexe: String,
  // True = A répondu au formulaire (Oui ou Non)
  confirmed: { type: Boolean, default: true }, 
  checkedIn: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

// Index unique sparse sur telephone
guestSchema.index({ telephone: 1 }, { 
  unique: true, 
  sparse: true
});

const Guest = mongoose.model('Guest', guestSchema);

const africastalking = require('africastalking');

// Configuration Africa's Talking (Optionnel si pas de clés)
const AT = (process.env.AT_API_KEY && process.env.AT_USERNAME) 
  ? africastalking({ apiKey: process.env.AT_API_KEY, username: process.env.AT_USERNAME }) 
  : null;

// Fonction d'envoi SMS
async function sendWelcomeSMS(telephone, prenom) {
  if (!AT) return; // Pas de config SMS
  if (!telephone || telephone.trim() === '') return;

  console.log('📲 Tentative d\'envoi SMS à', telephone);
  try {
    const response = await AT.SMS.send({
      to: [telephone],
      message: `BIENVENUE Mrs/Mme ${prenom} ! Votre présence au mariage de Fabrice & Caïus est confirmée. À très bientôt !`
    });
    console.log('✅ SMS envoyé à', telephone, response);
  } catch (error) {
    console.error('❌ Erreur SMS:', error.message);
  }
}

// Routes API

// 1. Créer une confirmation RSVP (Oui ou Non)
app.post('/api/guests/rsvp', async (req, res) => {
  console.log('📩 Requête RSVP reçue:', req.body);
  try {
    const { nom, prenom, telephone, email, nombrePersonnes, sexe, confirmed } = req.body;

    // Validation du téléphone uniquement s'il est fourni (cas du OUI)
    if (telephone && telephone.trim() !== '') {
      const existing = await Guest.findOne({ 
        telephone: telephone.trim()
      });
      if (existing) {
        return res.status(400).json({ 
          message: 'Ce numéro de téléphone est déjà enregistré' 
        });
      }
    }

    // Création des données
    const guestData = {
      nom: nom ? nom.trim() : '',
      prenom: prenom ? prenom.trim() : '',
      email: email || '',
      // Si nombrePersonnes n'est pas fourni (cas rare), on met 0 par sécurité
      nombrePersonnes: (nombrePersonnes !== undefined) ? nombrePersonnes : 0, 
      sexe: sexe || '',
      // IMPORTANT : On force confirmed à TRUE car l'invité a répondu (même si c'est Non)
      // La distinction se fait via nombrePersonnes (0 = Non, 1 = Oui)
      confirmed: true, 
      telephone: (telephone && telephone.trim() !== '') ? telephone.trim() : null
    };

    console.log('💾 Sauvegarde:', guestData);

    const guest = new Guest(guestData);
    const savedGuest = await guest.save();

    console.log('✅ Guest sauvegardé:', savedGuest._id);

    // Envoi SMS uniquement si participe (nombrePersonnes > 0) ET téléphone valide
    if (guestData.telephone && guestData.nombrePersonnes > 0) {
      sendWelcomeSMS(guestData.telephone, prenom);
    } else {
      console.log('ℹ️ Pas de SMS (Refus ou pas de téléphone)');
    }

    res.status(201).json({ 
      message: guestData.nombrePersonnes > 0 
        ? 'Confirmation réussie' 
        : 'Merci de nous avoir informés',
      guest: savedGuest
    });
    
  } catch (error) {
    console.error('❌ ERREUR:', error);
    
    if (error.code === 11000) {
      return res.status(400).json({ 
        message: 'Ces informations sont déjà enregistrées' 
      });
    }
    
    res.status(500).json({ 
      message: 'Erreur serveur lors de l\'enregistrement'
    });
  }
});

// 2. Récupérer tous les invités
app.get('/api/guests', async (req, res) => {
  try {
    const guests = await Guest.find().sort({ createdAt: -1 });
    res.json(guests);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// 3. Check-in
app.put('/api/guests/:id/checkin', async (req, res) => {
  try {
    const guest = await Guest.findByIdAndUpdate(
      req.params.id,
      { checkedIn: true },
      { new: true }
    );
    res.json(guest);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// 4. Statistiques
app.get('/api/stats', async (req, res) => {
  try {
    const total = await Guest.countDocuments();
    // Confirmés = Ceux qui ont répondu OUI (nombrePersonnes > 0)
    const confirmed = await Guest.countDocuments({ confirmed: true, nombrePersonnes: { $gt: 0 } });
    const checkedIn = await Guest.countDocuments({ checkedIn: true });
    
    res.json({
      total,
      confirmed,
      checkedIn
    });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur le port ${PORT}`);
});