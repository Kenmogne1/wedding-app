// src/pages/StorySection.jsx
import React from 'react';

const StorySection = () => {
  return (
    <section id="notre-histoire" className="py-16 md:py-24 px-4 relative reveal-on-scroll scroll-mt-24 bg-white">
      <div className="max-w-5xl mx-auto">
        {/* --- EN-TÊTE STYLE CAPTURE EXACT --- */}
        <div className="text-center mb-10 md:mb-14">
        {/* Titre */}
        <h2 className="font-serif text-4xl md:text-5xl text-[#B59A3A] font-medium">
            Notre Histoire
        </h2>

        {/* Sous-titre */}
        <p className="mt-4 font-serif text-lg md:text-xl text-[#6B8E23]">
            Comment nous nous sommes rencontrés et<br />
            avons décidé de parcourir la vie ensemble
        </p>

        {/* Traits décoratifs */}
        <div className="mt-4 flex justify-center gap-6">
          <span className="block w-24 h-px bg-[#6B8E23] animate-line"></span>
          <span className="block w-24 h-px bg-[#6B8E23] animate-line"></span>
        </div>
      </div>

        <div className="bg-white rounded-2xl md:rounded-3xl p-3 md:p-5 text-center shadow-xl card-animate reveal-on-scroll border border-stone-100">
          
          {/* Bloc Cœur */}
          <div className="mx-auto mb-6 w-60 h-60 md:w-80 md:h-80">
            <svg viewBox="0 0 24 24" className="w-full h-full drop-shadow-xl">
              <defs>
                <clipPath id="heartClip">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </clipPath>
              </defs>

              <path 
                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" 
                fill="#166534" 
                stroke="white" 
                strokeWidth="0.5" 
              />

              <image 
                className="animate-image-pulse"
                href="/photo1.jpeg" 
                x="2" 
                y="2" 
                width="20" 
                height="20" 
                preserveAspectRatio="xMidYMid slice" 
                clipPath="url(#heartClip)" 
              />
            </svg>
          </div>

          <p className="text-stone-700 leading-relaxed text-base md:text-lg max-w-3xl mx-auto font-serif italic">
            Tout a commencé par des regards croisés au Cameroun, sur les bancs d'un centre de langue. Mais c'est le destin qui nous a véritablement réunis à des milliers de kilomètres de là, au détour d'un rayon de supermarché. 
            <br /><br />
            Ce hasard incroyable s'est transformé en une conversation passionnée à la sortie du magasin. D'une belle amitié née de ces retrouvailles inattendues, l'amour a fini par éclore au fil des rendez-vous, transformant une simple coïncidence en une évidence éternelle.
          </p>
        </div>
      </div>
    </section>
  );
};

export default StorySection;