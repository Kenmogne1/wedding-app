import React, { useState } from 'react';

const EnvelopeWelcome = ({ onOpen }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFading, setIsFading] = useState(false);
  // Nouvel état pour gérer la superposition de la carte
  const [showCard, setShowCard] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
    
    // 1. On attend que le rabat s'ouvre un peu
    setTimeout(() => {
      // 2. On fait passer la carte DEVANT l'enveloppe (z-40)
      setShowCard(true);
    }, 600); // 500ms : délai ajusté pour que la transition soit naturelle

    // Séquence de fin (fondu noir)
    setTimeout(() => {
      setIsFading(true);
      setTimeout(() => {
        onOpen();
      }, 900);
    }, 3100); // Temps total de lecture un peu rallongé
  };

  if (isFading && !isOpen) return null;

  return (
    <div 
      className={`fixed inset-0 z-[9999] bg-[#022c22] transition-opacity duration-1000 overflow-hidden ${isFading ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
    >
      
      {/* ZONE DE L'ENVELOPPE */}
      <div className="absolute inset-x-0 top-[12vh] bottom-[12vh]">

        {/* 1. LA CARTE D'INVITATION */}
        {/* MODIFS ICI :
            - z-index dynamique : z-40 quand showCard est vrai (passe devant les rabats)
            - translate : monte de 20% seulement (suffisant si elle est au premier plan)
        */}
        <div 
          className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[85vw] max-w-md h-[70%] bg-[#fcfaf5] shadow-2xl rounded-sm flex flex-col items-center justify-center p-6 border border-stone-200 text-center transition-all duration-1000 ease-in-out
          ${showCard ? 'z-40' : 'z-10'} 
          ${isOpen ? '-translate-y-[30%] scale-105' : 'scale-100'}`}
        >
            <div className="w-full h-full border border-[#B59A3A]/40 p-4 flex flex-col justify-center items-center">
               <p className="text-[#B59A3A] text-xs uppercase tracking-[0.2em] mb-4">Invitation Mariage</p>
               <h3 className="font-['Great_Vibes'] text-4xl md:text-6xl text-[#064E3B] mb-4">Caïus-Ange <br/> & Fabrice</h3>
               <div className="w-16 h-px bg-[#B59A3A] opacity-60 mb-4"></div>
            </div>
        </div>

        {/* 2. LES RABATS (TRIANGLES) */}
        {/* Ils restent z-20. La carte passera devant eux (z-40) grâce au state showCard */}
        <div className="absolute inset-0 w-full h-full pointer-events-none z-20" style={{ perspective: '2000px' }}>

          {/* CÔTÉ GAUCHE */}
          <div className="absolute top-0 bottom-0 left-0 w-1/2 bg-gradient-to-r from-[#022c22] to-[#064e3b] shadow-2xl" 
               style={{ clipPath: 'polygon(0 0, 0 100%, 100% 50%)' }}></div>

          {/* CÔTÉ DROIT */}
          <div className="absolute top-0 bottom-0 right-0 w-1/2 bg-gradient-to-l from-[#022c22] to-[#064e3b] shadow-2xl" 
               style={{ clipPath: 'polygon(100% 0, 100% 100%, 0 50%)' }}></div>

          {/* CÔTÉ BAS */}
          <div className="absolute bottom-0 left-0 right-0 h-[55%] bg-gradient-to-t from-[#022c22] via-[#065f46] to-[#047857] shadow-[0_-10px_40px_rgba(0,0,0,0.5)] flex items-end justify-center pb-16 pointer-events-auto"
               style={{ clipPath: 'polygon(0 100%, 100% 100%, 50% 0)' }}>
               
               <div className={`text-center transition-opacity duration-500 ${isOpen ? 'opacity-0' : 'opacity-100'}`}>
                 <p className="font-['Great_Vibes'] text-white/80 text-2xl md:text-4xl drop-shadow-lg">
                   Pour Vous
                 </p>
               </div>
          </div>

          {/* RABAT DU HAUT */}
          <div 
            className={`absolute top-0 left-0 right-0 h-[50%] z-50 transition-all duration-1000 ease-in-out origin-top pointer-events-auto cursor-pointer ${isOpen ? 'rotate-x-180 opacity-0' : 'rotate-0'}`}
            onClick={handleOpen}
            style={{ transformStyle: 'preserve-3d' }}
          >
             <div className="w-full h-full bg-gradient-to-b from-[#022c22] via-[#065f46] to-[#059669] shadow-xl"
                  style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }}></div>

             {/* SCEAU */}
             <div className="absolute top-[90%] left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center z-50">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-[#FCD34D] via-[#d97706] to-[#92400e] shadow-[0_4px_15px_rgba(0,0,0,0.6)] border-[3px] border-[#fbbf24] flex items-center justify-center ring-4 ring-[#78350F]/20 animate-pulse">
                   <div className="absolute top-2 left-3 w-5 h-3 bg-white/40 rounded-full blur-[2px]"></div>
                   <span className="font-['Great_Vibes'] text-xl md:text-2xl text-[#78350F] font-bold pt-1 pr-1">Oui</span>
                </div>
                <p className="mt-4 text-white/90 text-xs font-bold uppercase tracking-widest drop-shadow-md">Toucher pour Ouvrir</p>
             </div>
          </div>

        </div>

      </div>

      <style>{`
        .rotate-x-180 { transform: rotateX(180deg); }
      `}</style>
    </div>
  );
};

export default EnvelopeWelcome;