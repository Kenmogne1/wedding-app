import React, { useState, useEffect } from 'react';
import { Heart, Lock, X, ArrowUpRight, AlignJustify } from 'lucide-react';

import EventDetails from './EventDetails';
import Son from './Son'; 
import DressCode from './DressCode';
import Cadeaux from './Cadeaux'; 
import StorySection from './StorySection';
import CountdownSection from './CountdownSection';
import RSVPSection from './RSVPSection';
import MomentOui from './MomentOui';

// --- CONFIGURATION ---
const CONFIG = {
  coupleNames: "Caïus-Ange\u00A0et\u00A0Fabrice",
  groomName: "Fabrice",
  brideName: "Caïus",
  weddingDate: "2026-04-04T20:00:00+01:00",
  rsvpDeadline: "2026-03-20T20:00:00+01:00",
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

// --- COMPOSANT GUIDE DE BIENVENUE ---
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
              Ravi d'interagir avec nous sur le site, cliquer sur ce bouton <span className="text-[#E2725B] font-bold">présence</span> pour directement accéder au formulaire pour confirmer votre présence au mariage de <span className="italic font-medium text-[#064E3B]">Caïus-ange & Fabrice</span>.
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

let guideDejaAffiche = false;

// --- COMPOSANT HOMEPAGE PRINCIPAL ---
const HomePage = ({ onNavigate }) => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [isDeadlinePassed, setIsDeadlinePassed] = useState(false);
  const [showGuide, setShowGuide] = useState(false);

  useEffect(() => {
    if (!guideDejaAffiche) {
      const timer = setTimeout(() => {
        setShowGuide(true);
        guideDejaAffiche = true;
      }, 2200);
      return () => clearTimeout(timer);
    }
  }, []);

  const closeGuide = () => setShowGuide(false);

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
    <div className="min-h-screen overflow-x-hidden bg-stone-50">
      
      {/* Styles globaux */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap');

        /* Animation pour les petits coeurs flottants */
        @keyframes heartbeat {
          0% { transform: scale(1); }
          50% { transform: scale(1.15); } 
          100% { transform: scale(1); }
        }
        .animate-image-pulse {
          transform-origin: center;
          transform-box: fill-box; 
          animation: heartbeat 4s ease-in-out infinite;
        }

        /* NOUVELLE Animation spécifique pour la grande photo */
        @keyframes hero-pulse-slow {
          0% { transform: scale(1); }
          50% { transform: scale(1.06); } /* Zoom léger */
          100% { transform: scale(1); }
        }
        .animate-hero-image-only {
          animation: hero-pulse-slow 5s ease-in-out infinite;
          transform-origin: center center;
        }
      `}</style>

      <FloatingHearts />
      
      {showGuide && <WelcomeGuide onClose={closeGuide} />}

      {/* --- HEADER --- */}
      <nav className="bg-white border-b border-stone-100 px-3 py-3 sticky top-0 z-50 flex items-center justify-between shadow-sm">
        <div className="text-[#064E3B] pl-1">
          <AlignJustify size={24} />
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => document.getElementById('notre-histoire')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-2.5 py-1.5 bg-[#E2725B] text-white font-bold text-[9px] sm:text-[10px] md:text-xs rounded-lg shadow-md hover:bg-[#d1624c] transition-colors uppercase tracking-wider whitespace-nowrap"
          >
            Notre Histoire
          </button>
          <button
            onClick={() => {
              closeGuide();
              onNavigate('rsvp-oui');
            }}
            className="px-2.5 py-1.5 bg-[#E2725B] text-white font-bold text-[9px] sm:text-[10px] md:text-xs rounded-lg shadow-md hover:bg-[#d1624c] transition-colors uppercase tracking-wider whitespace-nowrap"
          >
            Présence
          </button>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <div className="w-full bg-white pt-10 pb-0 flex flex-col items-center">
        
        {/* BLOC TEXTE */}
        <div className="text-center z-10 px-4 mb-8">
             <h1 className="font-['Great_Vibes',_cursive] text-6xl md:text-8xl lg:text-9xl mb-3 text-[#064E3B] leading-tight px-4 drop-shadow-sm">
                {CONFIG.coupleNames}
             </h1>
             <p className="text-xl md:text-3xl text-emerald-700 font-medium italic tracking-wide px-4">
                Se disent OUI devant Dieu, devant les Hommes et les ancêtres
             </p>
             <p className="mt-6 text-sm md:text-lg text-stone-500 font-bold uppercase tracking-[0.2em]">
                03 & 04 AVRIL 2026
             </p>
        </div>

        {/* BLOC PHOTO (Style "Anna et Jean" : Ovale parfait + Filet blanc interne) */}
        <div className="relative w-full max-w-sm md:max-w-md lg:max-w-lg px-6 md:px-0 pb-10">
           
           {/* Le Cadre : rounded-full crée un ovale parfait (pilule) */}
           <div className="relative w-full aspect-[3/5] overflow-hidden rounded-full shadow-2xl z-20 bg-stone-100">
               
               {/* L'image animée (Zoom In/Out) */}
               <img 
                 src="/im2.jpeg" 
                 className="w-full h-full object-cover animate-hero-image-only"
                 alt="Les mariés"
               />

               {/* Le Filet Blanc Interne (Fixe et superposé) */}
               <div className="absolute inset-2.5 border border-white/70 rounded-full pointer-events-none z-30"></div>
           </div>

        </div>

      </div>

      {/* Message d'invitation */}
      <section className="relative w-full bg-[#fafaf9] py-16 md:py-24 px-4 overflow-hidden -mt-20 pt-28 rounded-t-3xl z-10">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-24 md:w-48 text-pink-300/80 pointer-events-none">
           <MagnoliaLeft className="w-full h-auto" />
        </div>
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-24 md:w-48 text-pink-300/80 pointer-events-none">
           <MagnoliaRight className="w-full h-auto" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto bg-white border border-gray-100 rounded-3xl p-8 md:p-16 shadow-xl text-center card-animate reveal-on-scroll">
         
          <img 
             src="/image.jpeg" 
             alt="Décoration avant" 
             className="absolute -top-5 -left-5 w-24 md:w-36 h-auto z-20 pointer-events-none mix-blend-multiply brightness-110 contrast-125 transform -rotate-6"
          />
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

      {/* --- SECTION COMPTE À REBOURS --- */}
      <CountdownSection timeLeft={timeLeft} isDeadlinePassed={isDeadlinePassed} />

      {/* --- SECTION HISTOIRE --- */}
      <StorySection />
      <MomentOui />
      <Son />
      <div className="w-full h-35 md:h-40"></div>
      <EventDetails />
      
      <DressCode />

      <Cadeaux />

      {/* --- SECTION RSVP --- */}
      <RSVPSection 
        isDeadlinePassed={isDeadlinePassed} 
        onNavigate={onNavigate} 
        deadlineDate={CONFIG.rsvpDeadline} 
      />

      {/* Footer */}
      <section className="py-12 md:py-16 px-4 border-t border-stone-200">
        <p className="text-center text-stone-400 italic text-base md:text-lg max-w-2xl mx-auto px-4">
          "L'amour ne consiste pas à se regarder l'un l'autre, mais à regarder ensemble dans la même direction."
        </p>
      </section>

       {/* Admin Button */}
       <button
        onClick={() => onNavigate('admin')}
        className="fixed bottom-5 right-5 md:bottom-5 md:right-6 w-5 h-5 md:w-6 md:h-6 bg-white border border-stone-200 rounded-full hover:bg-stone-100 transition-all flex items-center justify-center shadow-xl z-50 cursor-pointer text-stone-400"
        title="Accès Contrôleur"
      >
        <Lock className="w-2 h-2 md:w-3 md:h-3" />
      </button>
    </div>
  );
};

export default HomePage;