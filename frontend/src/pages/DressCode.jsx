import React from 'react';
import { Palette } from 'lucide-react';

const DressCode = () => {
  // Les 5 couleurs extraites
  const colors = [
    "#445548", // Vert gris foncé
    "#335546", // Vert forêt profond
    "#8B4B28", // Marron terre cuite
    "#CB5924", // Orange brulé
    "#FA7838"  // Orange vif
  ];

  // Vos photos d'inspiration
  const inspirations = [
    { src: "/p1.jpeg", alt: "Homme" },
    { src: "/p2.jpeg", alt: "Femme" },
    { src: "/p3.jpeg", alt: "Accessoires" },
    { src: "/p4.jpeg", alt: "Couple" }
  ];

  return (
    <section className="py-12 md:py-20 bg-white relative reveal-on-scroll">
      <div className="max-w-5xl mx-auto px-4">
        
        <div className="flex flex-col md:flex-row gap-8 md:gap-20 items-center">
          
          {/* --- PARTIE GAUCHE : TEXTES --- */}
          <div className="w-full md:w-1/2 space-y-8">
            
            {/* Titre & Thème */}
            <div>
              <h2 className="text-4xl md:text-5xl font-sans font-light text-black mb-2 tracking-wide">
                Dress Code
              </h2>
              
              <div className="flex flex-row items-baseline gap-2">
                <span className="text-black font-sans text-lg">Thème:</span>
                <span className="text-3xl md:text-4xl font-serif italic text-black" style={{ fontFamily: 'cursive' }}>
                  Élégance & Glamour
                </span>
              </div>
            </div>

            
              {/* MODIFICATION : Suppression du cadre (bg-stone-50 et border) */}
              <div className="pl-1">
                <div className="flex items-start gap-3 mb-3">
                    <Palette className="w-5 h-5 text-black mt-0.5 shrink-0" />
                    <p className="text-black text-sm md:text-base">
                        Les nuances d’Orange ( terracota ) et de Vert ( émeraude ).
                    </p>
                </div>

                {/* Les 5 ronds de couleurs */}
                <div className="flex gap-2 pl-8">
                    {colors.map((color, index) => (
                    <div 
                        key={index}
                        className="w-6 h-6 rounded-full border border-black/10 shadow-sm"
                        style={{ backgroundColor: color }}
                        title={color}
                    ></div>
                    ))}
                </div>
              </div>
            </div>

            {/* Texte Poétique */}
            <div className="pt-2">
              <p className="text-lg text-black font-serif italic opacity-90 leading-relaxed">
                "Dans un univers Glamour et dans une ambiance chaleureuse, pensez à venir avec votre plus beau sourire, il illuminera cette journée !"
              </p>
            </div>
          </div>

          {/* Suggestions & Couleurs */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-black font-sans">Suggestion :</h3>
              </div> 

          {/* --- PARTIE DROITE : GALERIE PHOTOS (COLLAGE) --- */}
          <div className="w-full md:w-1/2 pt-4">
            <div className="rounded-3xl border border-black/10 shadow-[0_10px_30px_rgba(0,0,0,0.1)] overflow-hidden">
                <div className="grid grid-cols-2 gap-0">
                   {inspirations.map((img, index) => (
                     <div key={index} className="aspect-[3/4] relative group">
                        <img 
                          src={img.src} 
                          alt={img.alt} 
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
                     </div>
                   ))}
                </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default DressCode;