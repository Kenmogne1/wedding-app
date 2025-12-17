// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();



// Middleware
app.use(cors());
app.use(express.json());

if (!process.env.MONGODB_URI) {
  console.error('❌ MONGODB_URI manquant dans .env');
  process.exit(1);
}

// Configuration MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/wedding', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
mongoose.connection.on('connected', () => {
  console.log('✅ Connecté à MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('❌ Erreur de connexion MongoDB:', err.message);
});

// Schéma Guest
const guestSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  prenom: { type: String, required: true },
  telephone: { type: String, required: true, unique: true },
  email: String,
  nombrePersonnes: { type: Number, default: 1 },
  confirmed: { type: Boolean, default: true },
  checkedIn: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

const Guest = mongoose.model('Guest', guestSchema);

const africastalking = require('africastalking');

const AT = africastalking({
  apiKey: process.env.AT_API_KEY,
  username: process.env.AT_USERNAME
});

const sms = AT.SMS;


// Fonction d'envoi SMS

async function sendWelcomeSMS(telephone, prenom) {
  console.log('📲 Tentative d’envoi SMS à', telephone);
  try {
    const response = await sms.send({
      to: [telephone],
      message: `BIENVENUE Mrs/Mme ${prenom} ! Votre présence au mariage de Fabrice & Caïus est confirmée. À très bientôt !`
    });
    console.log('✅ SMS envoyé à', telephone, response);
  } catch (error) {
    console.error('❌ Erreur SMS Africa’s Talking:', error);
    console.error("❌ SMS ERROR STATUS:", error.response?.status);
    console.error("❌ SMS ERROR DATA:", error.response?.data);
    console.error("❌ SMS ERROR MESSAGE:", error.message);
  }
}



// Routes API

// 1. Créer une confirmation RSVP
app.post('/api/guests/rsvp', async (req, res) => {
  console.log('📩 Requête RSVP reçue:', req.body);
  try {
    const { nom, prenom, telephone, email, nombrePersonnes } = req.body;

    // Vérifier si l'invité existe déjà
    const existing = await Guest.findOne({ telephone });
    if (existing) {
      return res.status(400).json({ 
        message: 'Ce numéro de téléphone est déjà enregistré' 
      });
    }

    // Créer le guest
    const guest = new Guest({
      nom,
      prenom,
      telephone,
      email,
      nombrePersonnes,
      confirmed: true
    });

    await guest.save();

    // Envoyer SMS de bienvenue (en arrière-plan)
    sendWelcomeSMS(telephone, prenom);

    res.status(201).json({ 
      message: 'Confirmation réussie',
      guest 
    });
  } catch (error) {
    console.error('Erreur RSVP:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// 2. Récupérer tous les invités (admin)
app.get('/api/guests', async (req, res) => {
  try {
    const guests = await Guest.find().sort({ createdAt: -1 });
    res.json(guests);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// 3. Check-in d'un invité (contrôleur à l'entrée)
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

// 4. Rechercher un invité
app.get('/api/guests/search', async (req, res) => {
  try {
    const { q } = req.query;
    const guests = await Guest.find({
      $or: [
        { nom: new RegExp(q, 'i') },
        { prenom: new RegExp(q, 'i') },
        { telephone: new RegExp(q, 'i') }
      ]
    });
    res.json(guests);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// 5. Statistiques
app.get('/api/stats', async (req, res) => {
  try {
    const total = await Guest.countDocuments();
    const confirmed = await Guest.countDocuments({ confirmed: true });
    const checkedIn = await Guest.countDocuments({ checkedIn: true });
    const totalPersonnes = await Guest.aggregate([
      { $group: { _id: null, total: { $sum: '$nombrePersonnes' } } }
    ]);

    res.json({
      total,
      confirmed,
      checkedIn,
      totalPersonnes: totalPersonnes[0]?.total || 0
    });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur le port ${PORT}`);
});