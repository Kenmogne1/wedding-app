import React, { useState, useEffect, useRef } from 'react';
import { Heart, Calendar, MapPin, Clock, CheckCircle, Search, Lock, ArrowLeft, User } from 'lucide-react';

// --- CONFIGURATION ---
const CONFIG = {
  coupleNames: "Fabrice\u00A0&\u00A0Caïus",
  groomName: "Fabrice",
  brideName: "Caïus",
  // Date, heure et lieu mis à jour selon la demande
  weddingDate: "2026-04-04T20:00:00",
  venue: "Yaoundé, Quartier Manguier",
  apiUrl: import.meta.env.VITE_API_URL || "http://localhost:5000/api"
};

// --- COMPOSANT DE FOND ANIMÉ ---
const FloatingHearts = () => (
  <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
    {[...Array(20)].map((_, i) => (
      <div
        key={i}
        className="absolute animate-float"
        style={{
          left: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 10}s`,
          animationDuration: `${15 + Math.random() * 10}s`,
          opacity: 0.03
        }}
      >
        <Heart className="text-red-300" size={30 + Math.random() * 40} fill="currentColor" />
      </div>
    ))}
  </div>
);

// Flower image with fallback SVG when `/images.jpeg` is missing
const FlowerImage = ({ className = '', alt = 'Fleur décorative' }) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  // Ensure the passed Tailwind sizing classes apply to the img/svg
  const imgClass = `${className} ${loaded && !error ? 'block' : 'hidden'}`.trim();
  const svgClass = `${className} ${(!loaded || error) ? 'block' : 'hidden'}`.trim();

  return (
    <div className={`inline-block`} style={{lineHeight: 0}}>
      {!error && (
        <img
          src="/images.jpeg"
          alt={alt}
          className={imgClass}
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
          style={{ objectFit: 'contain' }}
        />
      )}

      {(error || !loaded) && (
        <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" className={svgClass} aria-hidden>
          <g fill="none" fillRule="evenodd">
            <circle cx="32" cy="32" r="30" fill="#FFEDE6" />
            <path d="M32 20c6 0 10 4 10 10s-4 10-10 10-10-4-10-10 4-10 10-10z" fill="#F48C49" />
            <path d="M22 32c0-6 4-10 10-10" stroke="#E26A2B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M42 32c0 6-4 10-10 10" stroke="#E26A2B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        </svg>
      )}
    </div>
  );
};

// --- PAGE D'ACCUEIL ---
const HomePage = ({ onNavigate }) => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const calculateTime = () => {
      const diff = new Date(CONFIG.weddingDate) - new Date();
      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / 1000 / 60) % 60),
          seconds: Math.floor((diff / 1000) % 60)
        });
      }
    };
    calculateTime();
    const timer = setInterval(calculateTime, 1000);
    
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      clearInterval(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black text-white overflow-x-hidden">
      <FloatingHearts />
      
      {/* Hero Section */}
      <section
        className="relative min-h-screen flex items-center justify-center px-4 py-12 reveal-on-scroll reveal-scale bg-black"
        style={{ backgroundImage: "url('/picture.jpeg')", backgroundSize: 'cover', backgroundPosition: 'center center', backgroundRepeat: 'no-repeat' }}
      >
        {/* dark overlay so text remains readable */}
        <div className="absolute inset-0 bg-black/45"></div>
        <div className="absolute inset-0 bg-gradient-radial from-red-950/20 via-transparent to-transparent mix-blend-screen"></div>
        <div className="relative z-10 text-center w-full max-w-5xl mx-auto" style={{transform: `translateY(${scrollY * 0.3}px)`}}>
          <div className="mb-6 md:mb-8 inline-block">
            <Heart className="w-16 h-16 md:w-24 md:h-24 text-red-500 animate-pulse-slow mx-auto" fill="currentColor" strokeWidth={0.5} />
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-9xl mb-4 md:mb-6 text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-pink-300 to-red-400 leading-tight px-4 text-center">
            {CONFIG.coupleNames}
          </h1>
          <p className="text-xl md:text-2xl lg:text-3xl text-gray-100 font-medium italic mb-6 md:mb-8 tracking-wide px-4 drop-shadow-sm">
            Nous unissons nos vies
          </p>
          <div className="w-24 md:w-32 h-px bg-gradient-to-r from-transparent via-red-500 to-transparent mx-auto mb-8 md:mb-12"></div>
          {/* Affichage de la date formatée */}
          <p className="text-base md:text-lg text-gray-200 font-medium italic tracking-widest uppercase">
            {new Date(CONFIG.weddingDate).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
        </div>

        {/* SVG divider at bottom of hero to create artistic cut into the dark site body */}
        <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-[0] pointer-events-none">
          <svg className="relative block w-full h-24 md:h-36" viewBox="0 0 1200 120" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            {/* Shallower curve to preserve more of the hero image */}
            <path d="M0,0 C150,110 350,110 600,105 C850,100 1050,100 1200,110 L1200,120 L0,120 Z" fill="#000" />
          </svg>
        </div>
      </section>

      {/* Countdown Section */}
      <section className="py-16 md:py-24 px-4 relative reveal-on-scroll">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-serif text-center mb-12 md:mb-16 text-gray-300 px-4">
            Le compte à rebours a commencé
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
            {[
              {label: 'Jours', value: timeLeft.days},
              {label: 'Heures', value: timeLeft.hours},
              {label: 'Minutes', value: timeLeft.minutes},
              {label: 'Secondes', value: timeLeft.seconds}
            ].map((item, idx) => (
              <div key={idx} className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-red-600/20 to-pink-600/20 rounded-xl md:rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-md border border-gray-700/50 rounded-xl md:rounded-2xl p-4 md:p-8 text-center hover:border-red-500/30 transition-all duration-300">
                  <div className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-red-400 to-pink-500 mb-1 md:mb-2">
                    {String(item.value).padStart(2, '0')}
                  </div>
                  <div className="text-xs md:text-sm uppercase tracking-widest text-gray-500">{item.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Event Details */}
      <section className="py-16 md:py-24 px-4 relative reveal-on-scroll">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl md:rounded-3xl p-6 md:p-12 shadow-2xl">
            <h2 className="text-3xl md:text-4xl font-serif text-center mb-8 md:mb-12 text-gray-300">Détails de l'événement</h2>
            <div className="space-y-6 md:space-y-8">
              {[
                {
                    Icon: Calendar, 
                    label: 'Date', 
                    value: new Date(CONFIG.weddingDate).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }), 
                    color: 'text-red-400'
                },
                {
                    Icon: Clock, 
                    label: 'Heure', 
                    value: new Date(CONFIG.weddingDate).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }), 
                    color: 'text-pink-400'
                },
                {Icon: MapPin, label: 'Lieu', value: CONFIG.venue, color: 'text-red-400'}
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-4 md:gap-6 p-4 md:p-6 rounded-xl hover:bg-gray-800/30 transition-all group">
                  <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0">
                    <item.Icon className={`w-6 h-6 md:w-8 md:h-8 ${item.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs md:text-sm text-gray-500 uppercase tracking-wider mb-1">{item.label}</div>
                    <div className="text-lg md:text-xl text-gray-200 break-words first-letter:uppercase">{item.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Story Section (abrégée pour l'exemple, gardez votre version complète) */}
      <section className="py-16 md:py-24 px-4 relative reveal-on-scroll">
        <div className="max-w-5xl mx-auto">
          {/* Modification ici pour ajouter les fleurs aux extrémités du titre */}
          <div className="flex items-center justify-center mb-16 md:mb-20 px-4">
            <FlowerImage className="w-20 h-20 md:w-28 md:h-28 mx-8 opacity-95" />
            <h2 className="text-4xl md:text-5xl font-serif text-center text-gray-300">Notre Histoire</h2>
            <FlowerImage className="w-20 h-20 md:w-28 md:h-28 mx-8 opacity-95" />
          </div>
           <div className="bg-white rounded-2xl md:rounded-3xl p-8 md:p-12 text-center shadow-2xl card-animate reveal-on-scroll">
              <Heart className="w-12 h-12 md:w-16 md:h-16 text-red-500 mx-auto mb-6 md:mb-8" fill="currentColor" />
              <p className="text-gray-800 leading-relaxed text-base md:text-lg max-w-3xl mx-auto">
                Mars 2020, une exposition d'art à Yaoundé. Un regard, une conversation, une connexion instantanée. Six années plus tard, nous sommes prêts à écrire le plus beau chapitre de notre vie ensemble.
              </p>
            </div>
        </div>
      </section>


      {/* RSVP Section Modifiée */}
      <section className="py-16 md:py-24 px-4 relative reveal-on-scroll">
        <div className="max-w-6xl mx-auto">
          {/* NOUVEAU TEXTE AJOUTÉ AVANT LE TITRE RSVP */}
          <div className="text-center mb-12 md:mb-16 px-4">
              <h3 className="text-xl md:text-3xl font-serif text-gray-200 mb-6 leading-relaxed">
                  Nous attendons avec impatience votre confirmation
              </h3>
              <p className="text-gray-400 text-sm md:text-lg max-w-3xl mx-auto mb-8 leading-relaxed">
                  Chaque détail compte pour nous, et votre présence est le cadeau le plus précieux. Veuillez confirmer votre participation avant le 4 avril 2026, pour nous assurer que tout sera comme nous l'avons rêvé.
              </p>
              <p className="text-2xl md:text-4xl font-serif text-red-400/90 mb-12">
                  Aidez-nous à planifier le jour parfait
              </p>

            <h2 className="text-5xl md:text-6xl font-bold text-red-500 mb-6 md:mb-8">RSVP</h2>
            <h3 className="text-xl md:text-2xl text-gray-300 mb-4 uppercase tracking-wider">Confirmation de Présence à l'Événement</h3>
            <p className="text-gray-500 text-sm md:text-base">
                 Le compte à rebours a commencé ! Confirmez avant le {new Date(CONFIG.weddingDate).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute:'2-digit' })}
            </p>
          </div>

          {/* MODIFICATION ICI : flex-row forcé pour l'alignement horizontal net */}
          <div className="flex flex-row gap-4 md:gap-6 max-w-4xl mx-auto justify-center items-stretch">
            {/* Carte OUI - Navigue vers le formulaire OUI */}
            <button
              onClick={() => onNavigate('rsvp-oui')}
              className="flex-1 group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-green-600/20 to-green-400/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative bg-white text-gray-900 rounded-3xl p-4 md:p-12 hover:scale-105 transition-transform shadow-2xl h-full flex flex-col items-center justify-center card-animate reveal-on-scroll">
                <div className="w-16 h-16 md:w-32 md:h-32 bg-green-100 rounded-full flex items-center justify-center mb-4 md:mb-6">
                  <svg className="w-8 h-8 md:w-16 md:h-16 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-gray-600 text-sm md:text-lg mb-1 md:mb-2">Oui,</p>
                <p className="text-lg md:text-3xl font-bold text-center leading-tight">je vais participer</p>
              </div>
            </button>

            {/* Carte NON - Navigue vers le formulaire NON */}
            <button
              onClick={() => onNavigate('rsvp-non')}
              className="flex-1 group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-red-600/20 to-red-400/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative bg-white text-gray-900 rounded-3xl p-4 md:p-12 hover:scale-105 transition-transform shadow-2xl h-full flex flex-col items-center justify-center card-animate reveal-on-scroll">
                <div className="w-16 h-16 md:w-32 md:h-32 bg-red-100 rounded-full flex items-center justify-center mb-4 md:mb-6">
                  <svg className="w-8 h-8 md:w-16 md:h-16 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <p className="text-gray-600 text-sm md:text-lg mb-1 md:mb-2">Non,</p>
                <p className="text-lg md:text-3xl font-bold text-center leading-tight">je ne pourrai pas participer</p>
              </div>
            </button>
          </div>
        </div>
      </section>

      {/* Footer Quote */}
      <section className="py-12 md:py-16 px-4 border-t border-gray-800">
        <p className="text-center text-gray-500 italic text-base md:text-lg max-w-2xl mx-auto px-4">
          "L'amour ne consiste pas à se regarder l'un l'autre, mais à regarder ensemble dans la même direction."
        </p>
      </section>

       {/* Admin Button */}
       <button
        onClick={() => onNavigate('admin')}
        className="fixed bottom-6 right-6 md:bottom-8 md:right-8 w-12 h-12 md:w-14 md:h-14 bg-gray-800 border border-gray-700 rounded-full hover:bg-gray-700 transition-all flex items-center justify-center shadow-2xl z-50"
      >
        <Lock className="w-5 h-5 md:w-6 md:h-6 text-gray-400" />
      </button>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0; }
          50% { opacity: 0.03; }
          100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.05); }
        }
        .animate-float { animation: float linear infinite; }
        .animate-pulse-slow { animation: pulse-slow 3s ease-in-out infinite; }
        .bg-gradient-radial { background: radial-gradient(circle, var(--tw-gradient-stops)); }
      `}</style>
    </div>
  );
};

// --- PAGE FORMULAIRE RSVP (Générique pour Oui et Non) ---
// Nouvelle prop: isAttending (booléen)
const RSVPPage = ({ onNavigate, onGoBack, isAttending }) => {
  // Initialisation conditionnelle selon si la personne vient ou pas
  const [formData, setFormData] = useState({
    nom: '', 
    prenom: '', 
    // For attending we keep only the rest of the number (without +237), UI shows prefix separately
    telephone: '',
    email: '', 
    // Ces champs ne sont pertinents que si la personne vient
    nombrePersonnes: isAttending ? 1 : 0, 
    sexe: isAttending ? 'homme' : '',
    confirmed: isAttending // Ajout d'un champ pour le backend
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' }); // Reset status

    // Validation basique si "Non"
    if (!isAttending && (!formData.nom || !formData.prenom)) {
        setStatus({ type: 'error', message: 'Veuillez remplir votre nom et prénom.' });
        setLoading(false);
        return;
    }

    try {
      // Build payload, ensuring phone includes +237 when attending
      const payload = {
        nom: formData.nom,
        prenom: formData.prenom,
        telephone: isAttending ? `+237${(formData.telephone || '').replace(/\s+/g, '')}` : formData.telephone,
        email: formData.email,
        nombrePersonnes: formData.nombrePersonnes || 0,
        sexe: formData.sexe || '',
        confirmed: !!formData.confirmed
      };

      const response = await fetch(`${CONFIG.apiUrl}/guests/rsvp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        // Try to read error message from server
        let text = await response.text();
        try { text = JSON.parse(text).message || text; } catch (e) {}
        throw new Error(text || 'Erreur serveur');
      }

      // Optionally read response body
      let data = {};
      try { data = await response.json(); } catch (e) { /* ignore */ }

      setStatus({ 
          type: 'success', 
          message: isAttending 
            ? (data.message || '🎉 Confirmation réussie ! Hâte de vous voir !')
            : (data.message || 'Merci de nous avoir prévenus. Vous nous manquerez ! 💔')
      });

      // Reset partiel du formulaire en cas de succès
      setFormData(prev => ({ ...prev, nom: '', prenom: '', telephone: '', email: '' }));

    } catch (error) {
      setStatus({ type: 'error', message: 'Erreur de connexion. Veuillez réessayer.' });
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black text-white px-4 py-12">
      <FloatingHearts />
      <button onClick={() => (typeof onGoBack === 'function' ? onGoBack() : onNavigate('home'))} className="mb-8 text-gray-400 hover:text-white flex items-center gap-2 transition-colors relative z-10">
        <ArrowLeft size={20} /> Retour
      </button>

      <div className="max-w-2xl mx-auto relative z-10">
        <div className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8 md:p-12 shadow-2xl">
          
          {/* Header du formulaire différent selon OUI ou NON */}
          <div className="text-center mb-10">
            {isAttending ? (
                <>
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
                    <h2 className="text-4xl font-serif text-gray-200 mb-2">Confirmation de présence</h2>
                    <p className="text-gray-400">Veuillez compléter vos informations</p>
                </>
            ) : (
                <>
                     {/* Bandeau rose style image_0.png */}
                    <div className="bg-pink-900/40 border border-pink-500/30 rounded-2xl p-6 mb-8 flex items-center gap-4 text-left">
                        <div className="w-12 h-12 rounded-full bg-pink-500/20 flex items-center justify-center flex-shrink-0">
                             <Heart className="text-pink-400" size={24} />
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold text-pink-200 mb-1">Désolé que vous ne puissiez pas assister</h3>
                            <p className="text-pink-300/80 text-sm">Veuillez compléter vos coordonnées.</p>
                        </div>
                    </div>
                    <h2 className="text-3xl font-serif text-gray-200 mb-4">Informations Personnelles</h2>
                </>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* --- CHAMPS SPÉCIFIQUES À "OUI" --- */}
            {isAttending && (
            <div>
              <label className="block text-sm text-gray-400 uppercase tracking-wider mb-3">Sexe *</label>
              {/* MODIFICATION ICI : Remplacement des gros boutons par des boutons radio standard */}
              <div className="flex gap-6">
                <label className="flex items-center gap-3 cursor-pointer group p-3 rounded-xl bg-gray-800/50 border border-gray-700 hover:border-gray-600 transition-all flex-1">
                  <input
                    type="radio"
                    name="sexe"
                    value="homme"
                    checked={formData.sexe === 'homme'}
                    onChange={(e) => setFormData({...formData, sexe: e.target.value})}
                    className="w-5 h-5 text-purple-600 bg-gray-700 border-gray-600 focus:ring-purple-500 focus:ring-2"
                  />
                  <span className="text-gray-200 group-hover:text-white">👨 Homme</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer group p-3 rounded-xl bg-gray-800/50 border border-gray-700 hover:border-gray-600 transition-all flex-1">
                  <input
                    type="radio"
                    name="sexe"
                    value="femme"
                    checked={formData.sexe === 'femme'}
                    onChange={(e) => setFormData({...formData, sexe: e.target.value})}
                    className="w-5 h-5 text-purple-600 bg-gray-700 border-gray-600 focus:ring-purple-500 focus:ring-2"
                  />
                  <span className="text-gray-200 group-hover:text-white">👩 Femme</span>
                </label>
              </div>
            </div>
            )}

            {/* --- CHAMPS COMMUNS (Nom/Prénom) --- */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm text-gray-400 uppercase tracking-wider mb-2">Nom *</label>
                <input required value={formData.nom} onChange={(e) => setFormData({...formData, nom: e.target.value})}
                  className={`w-full rounded-xl px-4 py-3 focus:outline-none transition-colors placeholder-gray-500 ${isAttending ? 'bg-white border border-gray-300 text-gray-900 focus:border-red-500' : 'bg-gray-800 border border-gray-700 text-white focus:border-red-500'}`}
                  placeholder="Entrez votre nom" />
              </div>
              <div>
                <label className="block text-sm text-gray-400 uppercase tracking-wider mb-2">Prénom *</label>
                <input required value={formData.prenom} onChange={(e) => setFormData({...formData, prenom: e.target.value})}
                  className={`w-full rounded-xl px-4 py-3 focus:outline-none transition-colors placeholder-gray-500 ${isAttending ? 'bg-white border border-gray-300 text-gray-900 focus:border-red-500' : 'bg-gray-800 border border-gray-700 text-white focus:border-red-500'}`}
                  placeholder="Entrez votre prénom" />
              </div>
            </div>

            {/* --- CHAMPS EMAIL & TÉLÉPHONE (Labels ajustés selon le cas) --- */}
            {/* Email enlevé pour le formulaire "je vais participer" */}
            {!isAttending && (
              <div>
                <label className="block text-sm text-gray-400 uppercase tracking-wider mb-2">Email (Facultatif)</label>
                <input type="email"
                  value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-red-500 focus:outline-none transition-colors placeholder-gray-500"
                  placeholder="Entrez votre adresse email" />
              </div>
            )}

            <div>
              <label className="block text-sm text-gray-400 uppercase tracking-wider mb-2">
                  Téléphone {isAttending ? '*' : '(Facultatif)'}
              </label>
              {isAttending ? (
                <div className="flex items-center gap-3">
                  <div className="select-none px-3 py-3 rounded-l-xl bg-gray-200 text-gray-900 border border-r-0 border-gray-300">+237</div>
                  <input type="tel"
                    required={isAttending}
                    value={formData.telephone}
                    onChange={(e) => {
                      // Allow only digits and spaces in the rest
                      const cleaned = e.target.value.replace(/[^0-9\s]/g, '').slice(0, 12);
                      setFormData({...formData, telephone: cleaned});
                    }}
                    className="flex-1 rounded-r-xl px-4 py-3 focus:outline-none transition-colors placeholder-gray-500 bg-white border border-gray-300 text-gray-900 focus:border-red-500"
                    placeholder="6XX XXX XXX" />
                </div>
              ) : (
                <input type="tel"
                  required={isAttending}
                  value={formData.telephone} onChange={(e) => setFormData({...formData, telephone: e.target.value})}
                  className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-red-500 focus:outline-none transition-colors placeholder-gray-500"
                  placeholder="Entrez votre numéro de téléphone" />
              )}
            </div>

            {/* --- CHAMP SPÉCIFIQUE À "OUI" (Nombre de personnes) --- */}
            {isAttending && (
            <div>
              <label className="block text-sm text-gray-400 uppercase tracking-wider mb-2">Nombre de personnes *</label>
              <select value={formData.nombrePersonnes} onChange={(e) => setFormData({...formData, nombrePersonnes: parseInt(e.target.value)})}
                className={`w-full rounded-xl px-4 py-3 appearance-none cursor-pointer transition-colors ${isAttending ? 'bg-white border border-gray-300 text-gray-900 focus:border-red-500' : 'bg-gray-800 border border-gray-700 text-white focus:border-red-500'}`}>
                {[1,2,3,4,5].map(n => <option key={n} value={n} className="bg-white text-gray-900">{n} personne{n>1?'s':''}</option>)}
              </select>
            </div>
            )}

            {/* Messages de statut */}
            {status.message && (
              <div className={`p-4 rounded-xl text-center animate-pulse ${status.type === 'success' ? 'bg-green-950/50 text-green-400 border border-green-500/50' : 'bg-red-950/50 text-red-400 border border-red-500/50'}`}>
                {status.message}
              </div>
            )}

            {/* Bouton de soumission (couleur différente selon le cas) */}
            <button type="submit" disabled={loading}
              className={`btn-animate w-full text-white py-4 rounded-xl hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 disabled:hover:scale-100 font-semibold text-lg shadow-lg
                ${isAttending 
                    ? 'bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-500 hover:to-teal-500 shadow-green-500/20' 
                    : 'bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-500 hover:to-pink-500 shadow-red-500/20'
                }`}>
              {loading ? 'Envoi en cours...' : (isAttending ? 'Confirmer ma participation' : 'Envoyer')}
            </button>
          </form>
        </div>
      </div>
      {/* Élément décoratif en bas à droite comme sur image_0.png */}
      {!isAttending && (
           <div className="fixed bottom-0 right-0 w-64 h-64 bg-red-500/10 rounded-tl-[100px] pointer-events-none z-0 blur-3xl"></div>
      )}
    </div>
  );
};

// --- PAGE ADMIN (Inchangée mais nécessaire pour que le code fonctionne) ---
const AdminPage = ({ onNavigate, onGoBack }) => {
  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [guests, setGuests] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({ total: 0, confirmed: 0, checked: 0 });

  const handleLogin = () => {
    if (password === 'wedding2025') {
      setAuthenticated(true);
      // fetchGuests(); // Décommenter pour récupérer les invités réels depuis le backend
      setGuests([]);
      setStats({ total: 0, confirmed: 0, checked: 0 });
    } else {
      alert('Mot de passe incorrect');
    }
  };

  // Fonction placeholder
  const fetchGuests = async () => { console.log("Fetching guests..."); };
  const handleCheckIn = async (id) => {
     console.log("Checkin id:", id);
     // Mise à jour optimiste fictive
     setGuests(guests.map(g => g._id === id ? {...g, checkedIn: true} : g));
  };

  const filteredGuests = guests.filter(g =>
    (g.nom?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
    (g.prenom?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
    (g.telephone || '').includes(searchTerm)
  );

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-950 to-black flex items-center justify-center p-4 relative">
        <button onClick={() => (typeof onGoBack === 'function' ? onGoBack() : onNavigate('home'))} className="absolute top-8 left-8 text-gray-400 hover:text-white flex items-center gap-2">
          <ArrowLeft /> Retour
        </button>
        <div className="bg-white rounded-2xl p-10 max-w-md w-full text-gray-900 card-animate reveal-on-scroll">
          <Lock className="w-16 h-16 mx-auto text-gray-800 mb-6" />
          <h1 className="text-3xl font-bold text-center mb-8">Accès Contrôleur</h1>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg mb-4 focus:border-gray-800 outline-none" placeholder="Mot de passe" />
          <button onClick={handleLogin} className="w-full bg-gray-900 text-white py-3 rounded-lg hover:bg-gray-800 btn-animate">
            Se connecter
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 to-black py-8 px-4 text-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Contrôle des Entrées</h1>
          <button onClick={() => setAuthenticated(false)} className="bg-gray-800 px-6 py-2 rounded-lg hover:bg-gray-700">
            Déconnexion
          </button>
        </div>

        <div className="grid grid-cols-3 gap-4 md:gap-6 mb-8">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-4 md:p-8 text-center">
            <div className="text-3xl md:text-5xl font-bold mb-2">{stats.total}</div>
            <div className="text-gray-500 uppercase text-xs md:text-sm">Total invités</div>
          </div>
          <div className="bg-green-950 border border-green-900 rounded-2xl p-4 md:p-8 text-center">
            <div className="text-3xl md:text-5xl font-bold text-green-400 mb-2">{stats.confirmed}</div>
            <div className="text-green-600 uppercase text-xs md:text-sm">Confirmés</div>
          </div>
          <div className="bg-blue-950 border border-blue-900 rounded-2xl p-4 md:p-8 text-center">
            <div className="text-3xl md:text-5xl font-bold text-blue-400 mb-2">{stats.checked}</div>
            <div className="text-blue-600 uppercase text-xs md:text-sm">Présents</div>
          </div>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-4 md:p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 text-gray-500" />
              <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-gray-600 outline-none"
                placeholder="Rechercher..." />
            </div>
            <button onClick={fetchGuests} className="bg-gray-800 px-6 py-3 rounded-lg hover:bg-gray-700">
              Actualiser
            </button>
          </div>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden overflow-x-auto">
          {loading ? (
            <div className="p-8 text-center text-gray-500">Chargement...</div>
          ) : (
            <table className="w-full min-w-[600px]">
              <thead className="bg-gray-800">
                <tr>
                  <th className="px-6 py-4 text-left text-xs uppercase text-gray-400">Nom</th>
                  <th className="px-6 py-4 text-left text-xs uppercase text-gray-400">Prénom</th>
                  <th className="px-6 py-4 text-left text-xs uppercase text-gray-400">Téléphone</th>
                  <th className="px-6 py-4 text-center text-xs uppercase text-gray-400">Pers.</th>
                  <th className="px-6 py-4 text-left text-xs uppercase text-gray-400">Statut</th>
                  <th className="px-6 py-4 text-left text-xs uppercase text-gray-400">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {filteredGuests.map((guest) => (
                  <tr key={guest._id} className={guest.checkedIn ? 'bg-green-950/30' : 'hover:bg-gray-800/50'}>
                    <td className="px-6 py-4">{guest.nom}</td>
                    <td className="px-6 py-4">{guest.prenom}</td>
                    <td className="px-6 py-4 text-gray-400">{guest.telephone}</td>
                    <td className="px-6 py-4 text-center text-gray-400">{guest.nombrePersonnes}</td>
                    <td className="px-6 py-4">
                      {guest.confirmed ? (
                         guest.checkedIn ? <span className="px-3 py-1 bg-green-900 text-green-400 rounded-full text-xs">✓ Présent</span> : <span className="px-3 py-1 bg-blue-900 text-blue-400 rounded-full text-xs">Confirmé</span>
                      ) : (
                        <span className="px-3 py-1 bg-red-900/50 text-red-400 rounded-full text-xs">Non confirmé</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {guest.confirmed && !guest.checkedIn && (
                        <button onClick={() => handleCheckIn(guest._id)}
                          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm">
                          Valider
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

// --- COMPOSANT PRINCIPAL ---
export default function WeddingApp() {
  // États de navigation : 'home', 'rsvp-oui', 'rsvp-non', 'admin'
  const [currentPage, setCurrentPage] = useState('home');
  // Stack to keep previous pages and scroll positions
  const [navStack, setNavStack] = useState([]);
  // Keep a persistent IntersectionObserver and a pending scroll restore
  const observerRef = useRef(null);
  const [restoreScrollY, setRestoreScrollY] = useState(null);

  const navigate = (page) => {
    // push current page + scroll position
    setNavStack(prev => [...prev, { page: currentPage, scrollY: typeof window !== 'undefined' ? window.scrollY : 0 }]);
    setCurrentPage(page);
    // scroll to top when navigating forward
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'auto' });
  };

  const goBack = () => {
    setNavStack(prev => {
      if (!prev || prev.length === 0) {
        setCurrentPage('home');
        return [];
      }
      const last = prev[prev.length - 1];
      const rest = prev.slice(0, -1);
      setCurrentPage(last.page);
      // Defer actual scroll restore until after the page change renders
      setRestoreScrollY(last.scrollY || 0);
      return rest;
    });
  };

  // Create observer once on mount and keep it in a ref
  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return;
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('is-visible');
      });
    }, { threshold: 0.15 });

    // Observe any existing elements on first mount
    document.querySelectorAll('.reveal-on-scroll').forEach(el => {
      // ensure hidden initial state
      if (!el.classList.contains('is-visible')) observerRef.current.observe(el);
    });

    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, []);

  // Whenever the current page changes, observe newly-mounted reveal elements
  useEffect(() => {
    if (!observerRef.current) return;
    const els = document.querySelectorAll('.reveal-on-scroll');
    els.forEach(el => {
      // If already visible, nothing to do; otherwise ensure observer watches it
      if (!el.classList.contains('is-visible')) {
        try { observerRef.current.observe(el); } catch (e) { /* ignore */ }
      }
      // If element is already in viewport, ensure it becomes visible immediately
      const rect = el.getBoundingClientRect();
      if (rect.top < (window.innerHeight || document.documentElement.clientHeight)) {
        el.classList.add('is-visible');
      }
    });
  }, [currentPage]);

  // Restore scroll after page content has had time to mount and observer attached
  useEffect(() => {
    if (restoreScrollY === null) return;
    const id = setTimeout(() => {
      if (typeof window !== 'undefined') window.scrollTo({ top: restoreScrollY || 0, behavior: 'auto' });
      setRestoreScrollY(null);
    }, 80);
    return () => clearTimeout(id);
  }, [currentPage, restoreScrollY]);

  return (
    <div className="min-h-screen font-sans">
      {/* global reveal CSS for scroll animations + site-wide animation utilities */}
      <style>{`
        /* reveal-on-scroll base */
        .reveal-on-scroll { opacity: 0; transform: translateY(20px); transition: opacity 600ms ease, transform 600ms ease; }
        .reveal-on-scroll.is-visible { opacity: 1; transform: translateY(0); }
        .reveal-scale { transform: scale(.98); transition: transform 600ms ease; }
        .reveal-scale.is-visible { transform: scale(1); }

        /* Card entrance + hover lift */
        .card-animate { transform: translateY(6px) scale(0.995); transition: transform 350ms cubic-bezier(.2,.9,.2,1), box-shadow 300ms ease, opacity 450ms ease; }
        .card-animate.is-visible { transform: translateY(0) scale(1); opacity: 1; }
        .card-animate:hover { transform: translateY(-6px) scale(1.01); box-shadow: 0 18px 40px rgba(16,24,40,0.35); }

        /* Button micro-interactions */
        .btn-animate { transition: transform 180ms cubic-bezier(.2,.9,.2,1), box-shadow 180ms ease; }
        .btn-animate:active { transform: scale(.98); }
        .btn-animate:hover { box-shadow: 0 10px 24px rgba(0,0,0,0.22); }

        /* subtle zoom-in for hero title */
        @keyframes zoomInSlow { from { transform: scale(.98); opacity: .0 } to { transform: scale(1); opacity: 1 } }
        .hero-zoom { animation: zoomInSlow 900ms cubic-bezier(.2,.9,.2,1) forwards; }

        /* small floating tilt for decorative elements */
        @keyframes floatTilt { 0% { transform: translateY(0) rotate(0deg) } 50% { transform: translateY(-6px) rotate(-2deg) } 100% { transform: translateY(0) rotate(0deg) } }
        .float-tilt { animation: floatTilt 6s ease-in-out infinite; }

        /* quick shimmer for highlight lines */
        .shimmer { position: relative; overflow: hidden; }
        .shimmer::after { content: ''; position: absolute; left: -120%; top: 0; width: 60%; height: 100%; background: linear-gradient(90deg, rgba(255,255,255,0), rgba(255,255,255,0.06), rgba(255,255,255,0)); transform: skewX(-12deg); animation: shimmer 2.2s linear infinite; }
        @keyframes shimmer { to { left: 120%; } }

        /* tweak for floating hearts (gentler) */
        .animate-float { animation: float 18s linear infinite; }
      `}</style>
      {currentPage === 'home' && <HomePage onNavigate={navigate} onGoBack={goBack} />}
      
      {/* Route pour le "Oui" : isAttending = true */}
      {currentPage === 'rsvp-oui' && <RSVPPage onNavigate={navigate} onGoBack={goBack} isAttending={true} />}
      
      {/* Route pour le "Non" : isAttending = false */}
      {currentPage === 'rsvp-non' && <RSVPPage onNavigate={navigate} onGoBack={goBack} isAttending={false} />}
      
      {currentPage === 'admin' && <AdminPage onNavigate={navigate} onGoBack={goBack} />}
    </div>
  );
}