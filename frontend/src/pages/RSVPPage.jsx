import React, { useState } from 'react';
import { Heart, CheckCircle, ArrowLeft } from 'lucide-react';

const CONFIG = {
  coupleNames: "Fabrice\u00A0&\u00A0Caïus",
  groomName: "Fabrice",
  brideName: "Caïus",
  weddingDate: "2026-04-04T20:00:00",
  venue: "Yaoundé, Quartier Manguier",
  apiUrl: import.meta.env.VITE_API_URL || "http://localhost:5000/api"
};

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
          opacity: 0.06
        }}
      >
        <Heart className="text-red-400" size={30 + Math.random() * 40} fill="currentColor" />
      </div>
    ))}
  </div>
);

const RSVPPage = ({ onNavigate, onGoBack, isAttending }) => {
  const [formData, setFormData] = useState({
    nom: '', 
    prenom: '', 
    telephone: '',
    email: '', 
    sexe: isAttending ? 'homme' : '',
    confirmed: isAttending
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' }); 

    if (!isAttending && (!formData.nom || !formData.prenom)) {
        setStatus({ type: 'error', message: 'Veuillez remplir votre nom et prénom.' });
        setLoading(false);
        return;
    }

    try {
      const payload = {
        nom: formData.nom,
        prenom: formData.prenom,
        telephone: isAttending ? `+237${(formData.telephone || '').replace(/\s+/g, '')}` : formData.telephone,
        email: formData.email,
        nombrePersonnes: isAttending ? 1 : 0,
        sexe: formData.sexe || '',
        confirmed: !!formData.confirmed
      };

      const response = await fetch(`${CONFIG.apiUrl}/guests/rsvp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        let text = await response.text();
        try { text = JSON.parse(text).message || text; } catch (e) {}
        throw new Error(text || 'Erreur serveur');
      }

      let data = {};
      try { data = await response.json(); } catch (e) { /* ignore */ }

      setStatus({ 
          type: 'success', 
          message: isAttending 
            ? (data.message || '🎉 Confirmation réussie ! Hâte de vous voir !')
            : (data.message || 'Merci de nous avoir prévenus. Vous nous manquerez ! 💔')
      });

      setFormData(prev => ({ ...prev, nom: '', prenom: '', telephone: '', email: '' }));

    } catch (error) {
      setStatus({ type: 'error', message: 'Erreur de connexion. Veuillez réessayer.' });
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen px-4 py-12">
      <FloatingHearts />
      <button onClick={() => (typeof onGoBack === 'function' ? onGoBack() : onNavigate('home'))} className="mb-8 text-stone-500 hover:text-stone-800 flex items-center gap-2 transition-colors relative z-10 font-medium">
        <ArrowLeft size={20} /> Retour
      </button>

      <div className="max-w-2xl mx-auto relative z-10">
        <div className="bg-white/80 backdrop-blur-xl border border-stone-200 rounded-3xl p-8 md:p-12 shadow-2xl">
          
          <div className="text-center mb-10">
            {isAttending ? (
                <>
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
                    <h2 className="text-3xl md:text-4xl font-serif text-stone-800 mb-2">Confirmation de présence</h2>
                    <p className="text-stone-500">Veuillez compléter vos informations</p>
                </>
            ) : (
                <>
                    <div className="bg-red-50 border border-red-100 rounded-2xl p-6 mb-8 flex items-center gap-4 text-left">
                        <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                             <Heart className="text-red-400" size={24} />
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold text-red-800 mb-1">Désolé que vous ne puissiez pas assister</h3>
                            <p className="text-red-600/80 text-sm">Veuillez compléter vos coordonnées.</p>
                        </div>
                    </div>
                    <h2 className="text-3xl font-serif text-stone-800 mb-4">Informations Personnelles</h2>
                </>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {isAttending && (
            <div>
              <label className="block text-sm text-stone-500 uppercase tracking-wider mb-3 font-semibold">Sexe *</label>
              <div className="flex gap-4 md:gap-6">
                <label className="flex items-center gap-3 cursor-pointer group p-3 rounded-xl bg-white border border-stone-200 hover:border-red-300 transition-all flex-1 shadow-sm">
                  <input
                    type="radio"
                    name="sexe"
                    value="homme"
                    checked={formData.sexe === 'homme'}
                    onChange={(e) => setFormData({...formData, sexe: e.target.value})}
                    className="w-5 h-5 text-red-600 bg-stone-100 border-stone-300 focus:ring-red-500 focus:ring-2"
                  />
                  <span className="text-stone-700 group-hover:text-stone-900">👨 Homme</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer group p-3 rounded-xl bg-white border border-stone-200 hover:border-red-300 transition-all flex-1 shadow-sm">
                  <input
                    type="radio"
                    name="sexe"
                    value="femme"
                    checked={formData.sexe === 'femme'}
                    onChange={(e) => setFormData({...formData, sexe: e.target.value})}
                    className="w-5 h-5 text-red-600 bg-stone-100 border-stone-300 focus:ring-red-500 focus:ring-2"
                  />
                  <span className="text-stone-700 group-hover:text-stone-900">👩 Femme</span>
                </label>
              </div>
            </div>
            )}

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm text-stone-500 uppercase tracking-wider mb-2 font-semibold">Nom *</label>
                <input required value={formData.nom} onChange={(e) => setFormData({...formData, nom: e.target.value})}
                  className="w-full rounded-xl px-4 py-3 focus:outline-none transition-colors placeholder-stone-400 bg-white border border-stone-300 text-stone-800 focus:border-red-500 shadow-sm"
                  placeholder="Entrez votre nom" />
              </div>
              <div>
                <label className="block text-sm text-stone-500 uppercase tracking-wider mb-2 font-semibold">Prénom *</label>
                <input required value={formData.prenom} onChange={(e) => setFormData({...formData, prenom: e.target.value})}
                  className="w-full rounded-xl px-4 py-3 focus:outline-none transition-colors placeholder-stone-400 bg-white border border-stone-300 text-stone-800 focus:border-red-500 shadow-sm"
                  placeholder="Entrez votre prénom" />
              </div>
            </div>

            {!isAttending && (
              <div>
                <label className="block text-sm text-stone-500 uppercase tracking-wider mb-2 font-semibold">Email (Facultatif)</label>
                <input type="email"
                  value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full rounded-xl px-4 py-3 focus:outline-none transition-colors placeholder-stone-400 bg-white border border-stone-300 text-stone-800 focus:border-red-500 shadow-sm"
                  placeholder="Entrez votre adresse email" />
              </div>
            )}

            <div>
              <label className="block text-sm text-stone-500 uppercase tracking-wider mb-2 font-semibold">
                  Téléphone {isAttending ? '*' : '(Facultatif)'}
              </label>
              {isAttending ? (
                <div className="flex items-center gap-3">
                  <div className="select-none px-3 py-3 rounded-l-xl bg-stone-100 text-stone-600 border border-r-0 border-stone-300 font-medium">+237</div>
                  <input type="tel"
                    required={isAttending}
                    value={formData.telephone}
                    onChange={(e) => {
                      const cleaned = e.target.value.replace(/[^0-9\s]/g, '').slice(0, 12);
                      setFormData({...formData, telephone: cleaned});
                    }}
                    className="flex-1 rounded-r-xl px-4 py-3 focus:outline-none transition-colors placeholder-stone-400 bg-white border border-stone-300 text-stone-800 focus:border-red-500 shadow-sm"
                    placeholder="6XX XXX XXX" />
                </div>
              ) : (
                <input type="tel"
                  required={isAttending}
                  value={formData.telephone} onChange={(e) => setFormData({...formData, telephone: e.target.value})}
                  className="w-full rounded-xl px-4 py-3 focus:outline-none transition-colors placeholder-stone-400 bg-white border border-stone-300 text-stone-800 focus:border-red-500 shadow-sm"
                  placeholder="Entrez votre numéro de téléphone" />
              )}
            </div>

            {status.message && (
              <div className={`p-4 rounded-xl text-center animate-pulse font-medium ${status.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
                {status.message}
              </div>
            )}

            <button type="submit" disabled={loading}
              className={`btn-animate w-full text-white py-4 rounded-xl hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 disabled:hover:scale-100 font-semibold text-lg shadow-lg
                ${isAttending 
                    ? 'bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-500 hover:to-teal-500 shadow-green-200' 
                    : 'bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-400 hover:to-pink-500 shadow-red-200'
                }`}>
              {loading ? 'Envoi en cours...' : (isAttending ? 'Confirmer ma participation' : 'Envoyer')}
            </button>
          </form>
        </div>
      </div>
      {!isAttending && (
           <div className="fixed bottom-0 right-0 w-64 h-64 bg-red-100 rounded-tl-[100px] pointer-events-none z-0 blur-3xl opacity-50"></div>
      )}
    </div>
  );
};

export default RSVPPage;