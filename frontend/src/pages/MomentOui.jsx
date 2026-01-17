// src/pages/MomentOui.jsx
import React from 'react';

const MomentOui = () => {
  return (
    <section className="py-16 md:py-24 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-4">
        
        {/* Conteneur Flex : 
            Mobile (flex-col-reverse) : Le texte en bas, l'image en haut.
            Desktop (md:flex-row) : Le texte à gauche, l'image à droite.
            items-center : Aligné verticalement au centre.
        */}
        <div className="flex flex-col-reverse md:flex-row items-center gap-12 md:gap-0">
          
           <div className="w-full md:w-1/2 relative z-10">
            {/* Cadre fin vert autour du texte (comme sur ton modèle) */}
            <div className="relative p-8 md:p-12 bg-white text-center md:text-left shadow-sm">
            {/* Trait supérieur */}
            <span className="absolute top-0 left-0 w-full h-px bg-[#6B8E23]/50"></span>

            {/* Trait inférieur */}
            <span className="absolute bottom-0 left-0 w-full h-px bg-[#6B8E23]/50"></span>
                        
              {/* Titre */}
              <h2 className="font-serif font-light text-3xl md:text-5xl text-[#6B8E23] mb-1 leading-tight">
                Le moment où nous <br />
                nous sommes dit 'Oui'
              </h2>
              
              {/* Sous-titre */}
              <p className="font-serif font-light text-[#B59A3A] italic text-base md:text-lg mb-8">
                Une promesse sous les étoiles
              </p>

              {/* Paragraphe */}
              <p className="text-stone-500 leading-relaxed font-serif font-light text-sm md:text-base">
                Sous le ciel étoilé d'une soirée parfaite, entouré de nos amis et de nos familles, 
                Fabrice s'est agenouillé, le cœur plein d'espoir et d'amour. 
                Ses mots sincères et émouvants ont été la musique de mon âme. 
                En disant 'Oui', nous avons promis de naviguer ensemble sur les mers de la vie, 
                peu importe les tempêtes.
              </p>
            </div>
          </div>

          {/* --- BLOC IMAGE (Droite sur PC) --- */}
          {/* md:-ml-12 : Marge négative sur PC pour que l'image chevauche légèrement le cadre texte (effet design) ou se rapproche */}
          <div className="w-full md:w-1/2 flex justify-center md:justify-start md:-ml-8 z-20">
            
            {/* Le Cercle Simple et Grand */}
            <div className="relative w-full max-w-[260px] sm:max-w-xs md:max-w-md lg:max-w-lg mx-auto">
  
              {/* Cadre ovale */}
              <div className="relative w-full aspect-[3/5] overflow-hidden rounded-full shadow-2xl bg-stone-100">
                
                {/* Image */}
                <img 
                  src="/photo.jpeg"
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                />

                {/* Filet blanc interne */}
                <div className="absolute inset-2.5 border border-white/70 rounded-full pointer-events-none"></div>
              
              </div>

            </div>


          </div>

        </div>
      </div>
    </section>
  );
};

export default MomentOui;