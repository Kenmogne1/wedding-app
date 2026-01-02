import React, { useState, useEffect } from 'react';
import { Heart, Calendar, MapPin, Clock, Lock, AlertCircle, X, ArrowUpRight } from 'lucide-react';

// --- CONFIGURATION ---
const CONFIG = {
  coupleNames: "Fabrice\u00A0&\u00A0Caïus",
  groomName: "Fabrice",
  brideName: "Caïus",
  weddingDate: "2026-04-04T20:00:00",
  rsvpDeadline: "2026-03-20T20:00:00",
  venue: "Yaoundé, Quartier Manguier",
  apiUrl: import.meta.env.VITE_API_URL || "http://localhost:5000/api"
};

// --- COMPOSANTS DECORATIFS ---
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

const FlowerImage = ({ className = '', alt = 'Fleur décorative' }) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
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

const MagnoliaLeft = ({ className }) => (
  <svg viewBox="0 0 200 400" className={className} xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M20,380 Q40,300 30,200 Q20,100 80,50 M80,50 Q120,20 160,60 M80,50 Q40,40 20,80 M30,200 Q80,180 120,220 M30,200 Q-10,180 10,140 M120,220 Q160,200 180,240 M120,220 Q100,260 140,280" opacity="0.6" />
    <path d="M30,300 Q60,280 50,250 M50,250 Q80,230 100,260 M50,250 Q30,220 60,200" opacity="0.6" />
  </svg>
);

const MagnoliaRight = ({ className }) => (
  <svg viewBox="0 0 200 400" className={className} xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M180,380 Q160,300 170,200 Q180,100 120,50 M120,50 Q80,20 40,60 M120,50 Q160,40 180,80 M170,200 Q120,180 80,220 M170,200 Q210,180 190,140 M80,220 Q40,200 20,240 M80,220 Q100,260 60,280" opacity="0.6" />
    <path d="M170,300 Q140,280 150,250 M150,250 Q120,230 100,260 M150,250 Q170,220 140,200" opacity="0.6" />
  </svg>
);

// --- COMPOSANT GUIDE DE BIENVENUE (ONBOARDING) ---
const WelcomeGuide = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center sm:justify-end p-4 sm:p-10 bg-black/20 backdrop-blur-sm transition-all duration-500">
      <div className="relative mt-20 sm:mt-16 bg-white rounded-3xl p-6 shadow-2xl max-w-sm border-2 border-[#E2725B] animate-bounce-subtle">
        <div className="absolute -top-4 right-10 w-8 h-8 bg-white border-t-2 border-l-2 border-[#E2725B] rotate-45"></div>
        <button onClick={onClose} className="absolute top-3 right-3 text-stone-400 hover:text-[#E2725B] transition-colors">
          <X size={20} />
        </button>
        <div className="flex items-start gap-4">
          <div className="bg-orange-50 p-3 rounded-full flex-shrink-0">
             <ArrowUpRight className="text-[#E2725B] animate-pulse" size={24} />
          </div>
          <div>
            <h4 className="font-serif text-[#064E3B] font-bold text-lg mb-2">Bienvenue !</h4>
            <p className="text-stone-600 text-sm leading-relaxed">
              Ravi d'interagir avec nous sur le site, cliquer sur ce bouton <span className="text-[#E2725B] font-bold">présence</span> pour directement accéder au formulaire pour confirmer votre présence au mariage de <span className="italic font-medium text-[#064E3B]">Fabrice & Caïus-ange</span>.
            </p>
            <button 
              onClick={onClose}
              className="mt-4 w-full py-2 bg-[#E2725B] text-white rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-[#d6614a] transition-colors shadow-md"
            >
              C'est compris !
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- COMPOSANT HOMEPAGE ---
const HomePage = ({ onNavigate }) => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [isDeadlinePassed, setIsDeadlinePassed] = useState(false);
  const [showGuide, setShowGuide] = useState(false);

  useEffect(() => {
    // Vérifier si c'est la première visite pour afficher le guide
    const hasSeenGuide = localStorage.getItem('wedding_guide_seen');
    if (!hasSeenGuide) {
      const timer = setTimeout(() => setShowGuide(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const closeGuide = () => {
    setShowGuide(false);
    localStorage.setItem('wedding_guide_seen', 'true');
  };

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date();
      const deadlineDate = new Date(CONFIG.rsvpDeadline);
      const diff = deadlineDate - now;

      setIsDeadlinePassed(diff <= 0);

      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / 1000 / 60) % 60),
          seconds: Math.floor((diff / 1000) % 60)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
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
    <div className="min-h-screen overflow-x-hidden relative">
      <FloatingHearts />
      
      {/* Guide Onboarding */}
      {showGuide && <WelcomeGuide onClose={closeGuide} />}

      {/* Hero Section */}
      <section
        className="relative min-h-screen flex items-center justify-center px-4 py-12 reveal-on-scroll reveal-scale bg-stone-900"
        style={{ backgroundImage: "url('/picture.jpeg')", backgroundSize: 'cover', backgroundPosition: 'center center', backgroundRepeat: 'no-repeat' }}
      >
        {/* BOUTONS DE RACCOURCIS (RESPONSIVE) */}
        <div className="absolute top-4 right-3 sm:top-6 sm:right-6 z-20 flex gap-2 sm:gap-4">
          <button
            onClick={() => document.getElementById('notre-histoire')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-2.5 py-1.5 sm:px-4 sm:py-3 bg-[#E2725B] text-[#064E3B] font-bold text-[8px] sm:text-[10px] md:text-xs rounded-xl sm:rounded-2xl shadow-lg hover:scale-105 transition-transform border border-[#064E3B]/10 uppercase tracking-wider whitespace-nowrap"
          >
            Notre Histoire
          </button>
          <button
            onClick={() => {
              if (showGuide) closeGuide();
              onNavigate('rsvp-oui');
            }}
            className="px-2.5 py-1.5 sm:px-4 sm:py-3 bg-[#E2725B] text-[#064E3B] font-bold text-[8px] sm:text-[10px] md:text-xs rounded-xl sm:rounded-2xl shadow-lg hover:scale-105 transition-transform border border-[#064E3B]/10 uppercase tracking-wider whitespace-nowrap"
          >
            Présence
          </button>
        </div>

        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute inset-0 bg-gradient-radial from-red-900/20 via-transparent to-transparent mix-blend-overlay"></div>
        <div className="relative z-10 text-center w-full max-w-5xl mx-auto" style={{transform: `translateY(${scrollY * 0.3}px)`}}>
          <div className="mb-6 md:mb-8 inline-block">
            <Heart className="w-16 h-16 md:w-24 md:h-24 text-red-500 animate-pulse-slow mx-auto" fill="currentColor" strokeWidth={0.5} />
          </div>
          
          <h1 className="font-serif italic text-4xl sm:text-6xl md:text-7xl lg:text-9xl mb-4 md:mb-6 text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-pink-300 to-red-400 leading-tight px-4 text-center drop-shadow-2xl">
            {CONFIG.coupleNames}
          </h1>
          
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-amber-200 font-medium italic mb-8 tracking-wide px-4 drop-shadow-lg">
            Nous unissons nos vies
          </p>

          <div className="w-24 md:w-32 h-px bg-gradient-to-r from-transparent via-amber-300 to-transparent mx-auto mb-8 md:mb-12 opacity-80"></div>

          <p className="text-sm md:text-lg text-amber-200 font-medium italic tracking-widest uppercase drop-shadow-lg">
            {new Date(CONFIG.weddingDate).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
        </div>

        <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-[0] pointer-events-none">
          <svg className="relative block w-full h-[100px]" viewBox="0 0 1200 120" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,0 L1200,0 L1200,120 L0,120 Z" fill="#fafaf9" />
          </svg>
        </div>
      </section>

      {/* Message d'invitation */}
      <section className="relative w-full bg-[#fafaf9] py-16 md:py-24 px-4 overflow-hidden">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-24 md:w-48 text-pink-300/80 pointer-events-none">
           <MagnoliaLeft className="w-full h-auto" />
        </div>
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-24 md:w-48 text-pink-300/80 pointer-events-none">
           <MagnoliaRight className="w-full h-auto" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto bg-white border border-gray-100 rounded-3xl p-8 md:p-16 shadow-xl text-center card-animate reveal-on-scroll">
          <h2 className="text-5xl md:text-7xl mb-8 text-slate-600 font-serif italic" style={{ fontFamily: 'cursive, serif' }}>
            Vous êtes invité!
          </h2>
          
          <div className="text-slate-600 leading-relaxed text-sm md:text-lg space-y-4 font-sans max-w-2xl mx-auto">
            <p>
              Nous voulons passer le jour le plus important de notre vie avec les personnes qui comptent le plus pour nous. C’est pourquoi nous vous invitons cordialement à notre mariage.
            </p>
            <p className="font-medium pt-2 text-slate-800">
              Nous nous réjouissons de passer une journée inoubliable avec vous !
            </p>
          </div>
        </div>
      </section>

      {/* Countdown Section */}
      <section className="py-16 md:py-24 px-4 relative reveal-on-scroll">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-4xl font-serif text-center mb-12 md:mb-16 text-stone-700 px-4">
            {isDeadlinePassed ? "Les confirmations sont closes" : "Temps restant pour confirmer"}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
            {[
              {label: 'Jours', value: timeLeft.days},
              {label: 'Heures', value: timeLeft.hours},
              {label: 'Minutes', value: timeLeft.minutes},
              {label: 'Secondes', value: timeLeft.seconds}
            ].map((item, idx) => (
              <div key={idx} className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-red-200 to-pink-200 rounded-xl md:rounded-2xl blur-lg opacity-0 group-hover:opacity-60 transition-opacity duration-500"></div>
                <div className="relative bg-white border border-stone-200 rounded-xl md:rounded-2xl p-4 md:p-8 text-center hover:border-red-200 transition-all duration-300 shadow-sm hover:shadow-md">
                  
                  <div className="text-3xl sm:text-4xl md:text-6xl font-bold text-[#E35336] mb-1 md:mb-2">
                    {String(item.value).padStart(2, '0')}
                  </div>
                  
                  <div className="text-[10px] sm:text-xs md:text-sm uppercase tracking-widest text-stone-500">{item.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Event Details */}
      <section className="py-16 md:py-24 px-4 relative reveal-on-scroll">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/60 backdrop-blur-xl border border-stone-200 rounded-2xl md:rounded-3xl p-6 md:p-12 shadow-xl">
            <h2 className="text-3xl md:text-4xl font-serif text-center mb-8 md:mb-12 text-stone-800">Détails de l'événement</h2>
            <div className="space-y-6 md:space-y-8">
              {[
                {
                    Icon: Calendar, 
                    label: 'Date', 
                    value: new Date(CONFIG.weddingDate).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }), 
                    color: 'text-red-500'
                },
                {
                    Icon: Clock, 
                    label: 'Heure', 
                    value: new Date(CONFIG.weddingDate).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }), 
                    color: 'text-pink-500'
                },
                {Icon: MapPin, label: 'Lieu', value: CONFIG.venue, color: 'text-red-500'}
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-4 md:gap-6 p-4 md:p-6 rounded-xl hover:bg-stone-50 transition-all group border border-transparent hover:border-stone-100">
                  <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-red-50 flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0">
                    <item.Icon className={`w-6 h-6 md:w-8 md:h-8 ${item.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs md:text-sm text-stone-500 uppercase tracking-wider mb-1">{item.label}</div>
                    <div className="text-base sm:text-lg md:text-xl text-stone-800 break-words first-letter:uppercase font-medium">{item.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Notre Histoire */}
      <section id="notre-histoire" className="py-16 md:py-24 px-4 relative reveal-on-scroll scroll-mt-24">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-center mb-16 md:mb-20 px-4">
            <FlowerImage className="w-12 h-12 md:w-28 md:h-28 mx-4 md:mx-8 opacity-95" />
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-center text-stone-800">Notre Histoire</h2>
            <FlowerImage className="w-12 h-12 md:w-28 md:h-28 mx-4 md:mx-8 opacity-95" />
          </div>
           <div className="bg-white rounded-2xl md:rounded-3xl p-8 md:p-12 text-center shadow-xl card-animate reveal-on-scroll border border-stone-100">
              <Heart className="w-12 h-12 md:w-16 md:h-16 text-red-500 mx-auto mb-6 md:mb-8" fill="currentColor" />
              <p className="text-stone-700 leading-relaxed text-base md:text-lg max-w-3xl mx-auto">
                Mars 2020, une exposition d'art à Yaoundé. Un regard, une conversation, une connexion instantanée. Six années plus tard, nous sommes prêts à écrire le plus beau chapitre de notre vie ensemble.
              </p>
            </div>
        </div>
      </section>

      {/* RSVP Section */}
      <section className="py-16 md:py-24 px-4 relative reveal-on-scroll">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 md:mb-16 px-4">
              <h3 className="text-xl md:text-3xl font-serif text-stone-700 mb-6 leading-relaxed">
                  Nous attendons avec impatience votre confirmation
              </h3>
              <p className="text-stone-500 text-sm md:text-lg max-w-3xl mx-auto mb-8 leading-relaxed">
                  Chaque détail compte pour nous, et votre présence est le cadeau le plus précieux. Veuillez confirmer votre participation avant le 20 mars 2026.
              </p>
              <p className="text-xl md:text-4xl font-serif text-red-500 mb-12">
                  Aidez-nous à planifier le jour parfait
              </p>

            <h2 className="text-5xl md:text-6xl font-bold text-red-500 mb-6 md:mb-8">RSVP</h2>
            <h3 className="text-xl md:text-2xl text-stone-600 mb-4 uppercase tracking-wider">Confirmation de Présence</h3>
            <p className="text-stone-400 text-sm md:text-base">
                 Date limite : {new Date(CONFIG.rsvpDeadline).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
            </p>
          </div>

          {isDeadlinePassed ? (
            <div className="bg-red-50 border border-red-200 rounded-3xl p-8 md:p-12 text-center max-w-2xl mx-auto shadow-lg reveal-on-scroll card-animate">
              <div className="flex justify-center mb-6">
                <AlertCircle className="w-16 h-16 text-red-500" />
              </div>
              <h3 className="text-2xl font-serif text-red-700 mb-3">Date limite atteinte</h3>
              <p className="text-red-600/80 text-lg">
                Vous ne pouvez plus confirmer votre présence car la date limite du {new Date(CONFIG.rsvpDeadline).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })} est passée.
              </p>
            </div>
          ) : (
            <div className="flex flex-row gap-4 md:gap-6 max-w-lg mx-auto justify-center items-stretch">
              <button
                onClick={() => onNavigate('rsvp-oui')}
                className="flex-1 group relative w-full"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-green-200 to-emerald-200 rounded-3xl blur-lg opacity-0 group-hover:opacity-70 transition-opacity duration-500"></div>
                <div className="relative bg-white text-stone-800 rounded-3xl p-8 md:p-12 hover:scale-105 transition-transform shadow-xl h-full flex flex-col items-center justify-center card-animate reveal-on-scroll border border-stone-100">
                  <div className="w-16 h-16 md:w-32 md:h-32 bg-green-50 rounded-full flex items-center justify-center mb-4 md:mb-6">
                    <svg className="w-8 h-8 md:w-16 md:h-16 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-stone-500 text-sm md:text-lg mb-1 md:mb-2">Oui,</p>
                  <p className="text-lg md:text-3xl font-bold text-center leading-tight">je vais participer</p>
                </div>
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <section className="py-12 md:py-16 px-4 border-t border-stone-200">
        <p className="text-center text-stone-400 italic text-base md:text-lg max-w-2xl mx-auto px-4">
          "L'amour ne consiste pas à se regarder l'un l'autre, mais à regarder ensemble dans la même direction."
        </p>
      </section>

       {/* Admin Button */}
       <a
        href="?view=admin"
        className="fixed bottom-5 right-5 md:bottom-5 md:right-6 w-5 h-5 md:w-6 md:h-6 bg-white border border-stone-200 rounded-full hover:bg-stone-100 transition-all flex items-center justify-center shadow-xl z-50 cursor-pointer text-stone-400"
        title="Accès Contrôleur"
      >
        <Lock className="w-2 h-2 md:w-3 md:h-3" />
      </a>
    </div>
  );
};

export default HomePage;