import React from 'react';
import { Gift } from 'lucide-react';

const Cadeaux = () => {
  return (
    <section className="relative py-16 md:py-28 px-4 overflow-hidden bg-stone-50 reveal-on-scroll">
      
      {/* --- DÉFINITION DU DÉGRADÉ SVG (Invisible) --- */}
      {/* Ce bloc définit le mélange de couleurs qui sera appliqué à l'icône */}
      <svg width="0" height="0" className="absolute pointer-events-none">
        <defs>
          <linearGradient id="gift-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E2725B" /> {/* Orange Terracotta */}
            <stop offset="100%" stopColor="#34D399" /> {/* Vert Émeraude */}
          </linearGradient>
        </defs>
      </svg>
      
      {/* --- DÉCORATION D'ARRIÈRE-PLAN --- */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-red-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute top-0 right-0 w-72 h-72 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-32 left-20 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

      <div className="relative z-10 max-w-4xl mx-auto">
        
        {/* CARTE PRINCIPALE STYLE "GLASS" */}
        <div className="bg-white/60 backdrop-blur-xl border border-white/50 rounded-[2rem] p-8 md:p-14 shadow-2xl relative">
          
          {/* Icône flottante en haut */}
          <div className="absolute -top-10 left-1/2 -translate-x-1/2">
             <div className="relative group">
                {/* MODIFICATION ICI : Le halo lumineux derrière l'icône est aussi ajusté au mélange */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#E2725B] to-[#34D399] rounded-full blur opacity-40 group-hover:opacity-60 transition-opacity"></div>
                
                <div className="relative w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg border border-white/80">
                   {/* MODIFICATION ICI : Application du dégradé sur l'icône via le style stroke */}
                   <Gift 
                     className="w-8 h-8 md:w-10 md:h-10 animate-bounce-subtle" 
                     strokeWidth={1.5}
                     style={{ stroke: "url(#gift-gradient)" }} // <-- C'est ici que la magie opère
                   />
                </div>
             </div>
          </div>

          <div className="mt-8 text-center">
            <h2 className="text-3xl md:text-5xl font-serif mb-8 text-transparent bg-clip-text bg-gradient-to-r from-stone-700 via-stone-500 to-stone-700">
              Cadeaux de Mariage
            </h2>

            {/* Texte Original Remis */}
            <div className="mb-10">
                <p className="text-stone-600 text-lg md:text-xl font-serif italic leading-relaxed">
                  "Nous savons à quel point vous souhaitez nous témoigner votre amour à travers vos cadeaux de mariage, mais pour défaut pratique nous préférons les cadeaux en espèces dans une enveloppe que vous nous remettrez a la soirée pendant la remise des cadeaux officielle. Merci pour votre compréhension."
                </p>
            </div>

            {/* Zone NB Moderne */}
            <div className="flex justify-center">
               <div className="group relative inline-flex items-center justify-center px-6 py-3 overflow-hidden font-medium transition-all bg-white rounded-xl border border-red-100 shadow-sm hover:shadow-md hover:border-red-200 cursor-default">
                  <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-red-50"></span>
                  <div className="relative flex flex-col md:flex-row items-center gap-2 md:gap-3">
                     <span className="flex items-center gap-1.5 text-[#c05641] font-bold text-xs md:text-sm tracking-widest uppercase">
                        <AlertBadge /> NB :
                     </span>
                     <span className="hidden md:block w-px h-4 bg-stone-300"></span>
                     <span className="text-stone-600 text-xs md:text-sm font-bold uppercase tracking-wider">
                        LES BILLETS PHYSIQUES SONT EXIGÉS A LA SOIRÉE
                     </span>
                  </div>
               </div>
            </div>

          </div>
        </div>

      </div>

      <style>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </section>
  );
};

// Petite icône d'alerte custom
const AlertBadge = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#E2725B]">
    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 8V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 16H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default Cadeaux;