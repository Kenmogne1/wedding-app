import React from 'react';
import { Palette } from 'lucide-react';

const DressCode = () => {
  const colors = [
    "#445548",
    "#335546",
    "#8B4B28",
    "#CB5924",
    "#FA7838"
  ];

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

            <h2 className="text-4xl md:text-5xl font-sans font-light text-black tracking-wide">
              Dress to impress!!!
            </h2>

          {/* DOT */}
          <div className="relative pl-4 border-l-4 border-[#8B4B28]">
            <h3 className="text-xl font-semibold text-[#8B4B28] mb-2 font-serif">
              Dot
            </h3>
            <p className="text-black text-sm md:text-base leading-relaxed">
              Pour la cérémonie traditionnelle dans un élan de convivialité, nous avons prévu un tissu pagne en guise d'uniforme.
            </p>
          </div>

          {/* Séparateur élégant */}
          <div className="flex items-center gap-3 py-2">
            <span className="flex-1 h-px bg-gradient-to-r from-transparent via-black/20 to-transparent"></span>
            <span className="w-1.5 h-1.5 rounded-full bg-black/30"></span>
            <span className="flex-1 h-px bg-gradient-to-r from-transparent via-black/20 to-transparent"></span>
          </div>

          {/* SOIRÉE */}
          <div className="relative pl-4 border-l-4 border-[#166534]">
            <h3 className="text-xl font-semibold text-[#166534] mb-2 font-serif">
              Soirée
            </h3>
            <p className="text-black text-sm md:text-base leading-relaxed">
              Nous souhaiterions que vous vous joigniez à nous pour célébrer avec élégance en tenue formelle dans les nuances d'orange (teracotta) et de vert émeraude.
            </p>
          </div>


            {/* PALETTE DE COULEURS */}
            <div className="flex items-center gap-3">
              <span className="text-black font-sans text-sm md:text-base font-medium">
                La palette de couleur :
              </span>

              <div className="flex gap-2">
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

            {/* TEXTE POÉTIQUE (INCHANGÉ) */}
            <div className="pt-2">
              <p className="text-lg text-black font-serif italic opacity-90 leading-relaxed">
                "Dans un univers Glamour et dans une ambiance chaleureuse, pensez à venir avec votre plus beau sourire, il illuminera cette journée !"
              </p>
            </div>

            {/* SUGGESTION (INCHANGÉ) */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-black font-sans">
                  Suggestion :
                </h3>
              </div>
            </div>

          </div>

          {/* --- PARTIE DROITE : GALERIE PHOTOS --- */}
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
