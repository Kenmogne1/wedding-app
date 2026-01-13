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
        nom: formData.nom.trim(),
        prenom: formData.prenom.trim(),
        email: formData.email.trim(),
        nombrePersonnes: isAttending ? 1 : 0,
        sexe: formData.sexe || '',
        confirmed: isAttending
      };

      // Ajouter le téléphone uniquement s'il est rempli
      if (formData.telephone && formData.telephone.trim() !== '') {
        const cleaned = formData.telephone.replace(/\s+/g, '');
        payload.telephone = isAttending ? `+237${cleaned}` : formData.telephone;
      }

      console.log('📤 Envoi des données:', payload);

      const response = await fetch(`${CONFIG.apiUrl}/guests/rsvp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      console.log('📥 Réponse reçue:', response.status);

      if (!response.ok) {
        let errorData;
        const contentType = response.headers.get('content-type');
        
        if (contentType && contentType.includes('application/json')) {
          errorData = await response.json();
        } else {
          const text = await response.text();
          errorData = { message: text };
        }
        
        throw new Error(errorData.message || 'Erreur serveur');
      }

      const data = await response.json();
      console.log('✅ Succès:', data);

      setStatus({ 
          type: 'success', 
          message: isAttending 
            ? (data.message || '🎉 Confirmation réussie ! Hâte de vous voir !')
            : (data.message || 'Merci de nous avoir prévenus. Vous nous manquerez ! 💔')
      });

      setFormData({ nom: '', prenom: '', telephone: '', email: '', sexe: isAttending ? 'homme' : '', confirmed: isAttending });

    } catch (error) {
      console.error('❌ Erreur complète:', error);
      setStatus({ 
        type: 'error', 
        message: error.message || 'Erreur de connexion. Veuillez réessayer.' 
      });
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen px-4 py-8 md:py-12">
      <FloatingHearts />
      <button onClick={() => (typeof onGoBack === 'function' ? onGoBack() : onNavigate('home'))} className="mb-6 text-stone-500 hover:text-stone-800 flex items-center gap-2 transition-colors relative z-10 font-medium">
        <ArrowLeft size={20} /> Retour
      </button>

      <div className="max-w-xl mx-auto relative z-10">
        <div className="bg-white/90 backdrop-blur-xl border border-stone-200 rounded-3xl p-6 md:p-10 shadow-2xl">
          
          <div className="text-center mb-8">
            {isAttending ? (
                <>
                    <h2 className="text-2xl md:text-3xl font-serif text-stone-800 mb-2 font-bold uppercase tracking-wide">Inscription</h2>
                    <p className="text-stone-500 text-sm">Veuillez compléter vos informations</p>
                </>
            ) : (
                <>
                    <div className="bg-red-50 border border-red-100 rounded-2xl p-6 mb-8 flex items-center gap-4 text-left">
                        <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                             <Heart className="text-red-400" size={24} />
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold text-red-800 mb-1">Désolé que vous ne puissiez pas assister</h3>
                            <p className="text-red-600/80 text-sm">Merci de nous laisser votre nom.</p>
                        </div>
                    </div>
                    <h2 className="text-3xl font-serif text-stone-800 mb-4">Vos Coordonnées</h2>
                </>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {isAttending && (
            <div>
              <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-3">Sexe *</label>
              <div className="flex gap-4">
                {/* Bouton Homme */}
                <label className={`relative flex items-center p-4 rounded-2xl border transition-all cursor-pointer flex-1 h-24 shadow-sm
                    ${formData.sexe === 'homme' ? 'border-red-400 bg-red-50/30 ring-1 ring-red-400' : 'border-stone-200 bg-white hover:border-stone-300'}`}>
                  <input
                    type="radio"
                    name="sexe"
                    value="homme"
                    checked={formData.sexe === 'homme'}
                    onChange={(e) => setFormData({...formData, sexe: e.target.value})}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-red-600 border-stone-300 focus:ring-red-500"
                  />
                  <div className="flex-1 flex flex-col items-center justify-center pl-6">
                    <span className="text-2xl mb-1">👨</span>
                    <span className={`text-sm font-medium ${formData.sexe === 'homme' ? 'text-stone-900' : 'text-stone-600'}`}>Homme</span>
                  </div>
                </label>

                {/* Bouton Femme */}
                <label className={`relative flex items-center p-4 rounded-2xl border transition-all cursor-pointer flex-1 h-24 shadow-sm
                    ${formData.sexe === 'femme' ? 'border-red-400 bg-red-50/30 ring-1 ring-red-400' : 'border-stone-200 bg-white hover:border-stone-300'}`}>
                  <input
                    type="radio"
                    name="sexe"
                    value="femme"
                    checked={formData.sexe === 'femme'}
                    onChange={(e) => setFormData({...formData, sexe: e.target.value})}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-red-600 border-stone-300 focus:ring-red-500"
                  />
                  <div className="flex-1 flex flex-col items-center justify-center pl-6">
                    <span className="text-2xl mb-1">👩</span>
                    <span className={`text-sm font-medium ${formData.sexe === 'femme' ? 'text-stone-900' : 'text-stone-600'}`}>Femme</span>
                  </div>
                </label>
              </div>
            </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
              <div>
                <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">Nom *</label>
                <input required value={formData.nom} onChange={(e) => setFormData({...formData, nom: e.target.value})}
                  className="w-full rounded-xl px-4 py-3.5 focus:outline-none transition-colors placeholder-stone-400 bg-white border border-stone-300 text-stone-800 focus:border-red-500 focus:ring-1 focus:ring-red-500 shadow-sm"
                  placeholder="Entrez votre nom" />
              </div>
              <div>
                <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">Prénom *</label>
                <input required value={formData.prenom} onChange={(e) => setFormData({...formData, prenom: e.target.value})}
                  className="w-full rounded-xl px-4 py-3.5 focus:outline-none transition-colors placeholder-stone-400 bg-white border border-stone-300 text-stone-800 focus:border-red-500 focus:ring-1 focus:ring-red-500 shadow-sm"
                  placeholder="Entrez votre prénom" />
              </div>
            </div>

            {/* Téléphone optionnel affiché uniquement si participation */}
            {isAttending && (
            <div>
              <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">
                  Téléphone <span className="text-stone-400 font-normal text-[10px]">(Optionnel)</span>
              </label>
                <div className="flex items-stretch gap-2">
                  <div className="w-16 flex items-center justify-center rounded-xl bg-stone-100 text-stone-600 border border-stone-300 font-bold text-sm shadow-sm select-none">
                    +237
                  </div>
                  <input type="tel"
                    value={formData.telephone}
                    onChange={(e) => {
                      const cleaned = e.target.value.replace(/[^0-9\s]/g, '').slice(0, 12);
                      setFormData({...formData, telephone: cleaned});
                    }}
                    className="flex-1 min-w-0 rounded-xl px-3 py-3.5 focus:outline-none transition-colors placeholder-stone-400 bg-white border border-stone-300 text-stone-800 focus:border-red-500 focus:ring-1 focus:ring-red-500 shadow-sm"
                    placeholder="6XX XXX XXX" />
                </div>
            </div>
            )}

            {status.message && (
              <div className={`p-4 rounded-xl text-center animate-pulse font-medium text-sm ${status.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
                {status.message}
              </div>
            )}

            <button type="submit" disabled={loading}
              className={`btn-animate w-full text-white py-4 rounded-xl hover:scale-[1.01] active:scale-95 transition-all disabled:opacity-50 disabled:hover:scale-100 font-bold text-lg shadow-lg mt-4
                ${isAttending 
                    ? 'bg-[#00a86b] hover:bg-[#008f5b] shadow-green-200'
                    : 'bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-400 hover:to-pink-500 shadow-red-200'
                }`}>
              {loading ? 'Envoi en cours...' : (isAttending ? 'Confirmer ma participation' : 'Confirmer')}
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