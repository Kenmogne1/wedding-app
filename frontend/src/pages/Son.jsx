import React from 'react';
import { Music, Heart } from 'lucide-react';

const Son = () => {
  const videoId = "LZRnvEEgAW0"; 

  return (
    // Padding réduit (py-8) pour prendre moins de hauteur
    <section className="relative w-full py-8 md:py-16 overflow-hidden reveal-on-scroll">
      
      {/* IMAGE DE FOND */}
      <div 
        className="absolute inset-0 z-0"
        style={{ 
          backgroundImage: "url('/fun.jpeg')", // Votre photo de fond
          backgroundSize: 'cover', 
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      ></div>

      {/* CALQUE SOMBRE */}
      <div className="absolute inset-0 bg-black/60 z-0 backdrop-blur-[1px]"></div>

      {/* CONTENU : Marges réduites et max-width contrôlé */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 flex flex-col md:flex-row items-center gap-6 md:gap-12">
          
          {/* --- PARTIE GAUCHE : CITATION (Plus petite) --- */}
          <div className="w-full md:w-1/2 text-center md:text-left text-white">
             {/* Guillemet plus discret */}
             <div className="text-4xl md:text-6xl text-[#E2725B] opacity-60 font-serif leading-none mb-2">“</div>
             
             {/* Texte réduit : text-lg sur mobile, text-2xl sur PC (au lieu de 4xl) */}
             <p className="text-lg md:text-2xl font-serif italic leading-relaxed drop-shadow-md">
               Lorsque vous réalisez que vous voulez passer le reste de votre vie ensemble, vous voulez que le reste de votre vie commence le plus tôt possible.
             </p>
             
             <div className="mt-4 flex items-center justify-center md:justify-start gap-2 opacity-90">
                <div className="h-px w-8 bg-[#E2725B]"></div>
                <p className="text-xs md:text-sm font-light uppercase tracking-widest">Harry & Sally</p>
             </div>
          </div>

          {/* --- PARTIE DROITE : CARTE VIDÉO (Compacte) --- */}
          <div className="w-full md:w-1/2 flex justify-center">
             {/* Padding réduit (p-4), max-width réduit (max-w-sm) */}
             <div className="bg-white p-4 md:p-6 rounded-2xl shadow-xl max-w-xs md:max-w-sm w-full text-center transform hover:scale-[1.02] transition-transform duration-500">
                
                {/* Titre plus petit */}
                <h3 className="text-xl md:text-2xl font-serif text-[#E2725B] mb-3 flex items-center justify-center gap-2">
                   Notre Chanson <Heart size={16} fill="#E2725B" />
                </h3>
                
                {/* Vidéo */}
                <div className="relative w-full pb-[56.25%] rounded-xl overflow-hidden shadow-inner bg-black">
                   <iframe 
                      className="absolute top-0 left-0 w-full h-full"
                      src={`https://www.youtube.com/embed/${videoId}`}
                      title="Notre Chanson"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                   ></iframe>
                </div>
                
                <div className="mt-3 flex items-center justify-center gap-2 text-stone-600">
                   <Music size={14} className="text-[#E2725B]" />
                   <span className="font-medium text-xs md:text-sm">Slimane - Des milliers de je t'aime</span>
                </div>
             </div>
          </div>

      </div>
    </section>
  );
};

export default Son;