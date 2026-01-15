import React from 'react';
import { Calendar, MapPin, Clock, Navigation, Leaf, Wine } from 'lucide-react';

const EventDetails = () => {
  // Liens Google Maps
  const dotMapUrl = "https://www.google.com/maps/search/?api=1&query=Yaoundé+Manguier";
  const soireeMapUrl = "https://www.google.com/maps/search/?api=1&query=Carrefour+Beignet+Yaoundé+Manguier+Foyer+Bangou";

  // --- STYLES ---
  const whiteText = "text-white";
  const whiteOpacityText = "text-white/70"; 
  const darkContainerBg = "bg-black/30"; 
  const whiteBorder = "border-white/20"; 

  return (
    // MODIF : py-6 md:py-12 (au lieu de py-10 md:py-20) pour réduire la hauteur globale
    <section className="relative w-full py-6 md:py-12 overflow-hidden reveal-on-scroll">
      
      {/* 1. L'IMAGE DE FOND */}
      <div 
        className="absolute inset-0 z-0"
        style={{ 
          backgroundImage: "url('/fff.jpeg')", 
          backgroundSize: 'cover', 
          backgroundPosition: 'center' 
        }}
      ></div>

      {/* 2. LE CALQUE NOIR */}
      <div className="absolute inset-0 bg-black/70 z-0 backdrop-blur-[2px]"></div>

      {/* 3. LE CONTENU */}
      <div className={`relative z-10 w-full border-y ${whiteBorder}`}>
            
            <div className="w-full h-0.5 bg-white/40"></div>

            {/* Titre Général */}
            {/* MODIF : py-6 md:py-8 (réduit) */}
            <div className={`text-center py-6 md:py-8 border-b ${whiteBorder} px-4`}>
              <h2 className={`text-2xl md:text-5xl font-serif ${whiteText} mb-2 drop-shadow-lg`}>
                  Détails de l'événement
              </h2>
              <p className={`${whiteOpacityText} font-serif italic text-sm md:text-lg`}>
                  Venez partager avec nous ces moments spéciaux
              </p>
            </div>

            {/* CONTENEUR GRID */}
            <div className="flex flex-col md:flex-row w-full">
            
              {/* --- PARTIE GAUCHE : DOT --- */}
              {/* MODIF : p-5 md:p-10 (au lieu de p-6 md:p-16) pour gagner de l'espace */}
              <div className={`w-full md:w-1/2 p-5 md:p-10 border-b md:border-b-0 md:border-r ${whiteBorder} relative`}>
                  
                  <div className="mb-2 opacity-90">
                    <Leaf className={`w-6 h-6 md:w-10 md:h-10 ${whiteText}`} strokeWidth={1} />
                  </div>

                  {/* MODIF : mb-6 (réduit) */}
                  <h3 className={`text-2xl md:text-4xl font-serif ${whiteText} mb-6 inline-block border-b border-white/40 pb-2`}>
                    Dot
                  </h3>
                  
                  {/* MODIF : space-y-5 (réduit) */}
                  <div className="space-y-5 md:space-y-8 pl-1">
                    {/* Date */}
                    <div className="flex items-center gap-3 md:gap-5">
                        <div className={`p-2.5 md:p-3 ${darkContainerBg} rounded-xl shrink-0 border ${whiteBorder} backdrop-blur-md`}>
                          <Calendar className={`w-4 h-4 md:w-6 md:h-6 ${whiteText}`} />
                        </div>
                        <div>
                            <p className={`text-[10px] md:text-xs ${whiteOpacityText} uppercase font-bold tracking-widest mb-0.5`}>Date</p>
                            <p className={`text-base md:text-2xl ${whiteText} font-serif font-medium`}>Vendredi 03 Avril 2026</p>
                        </div>
                    </div>

                    {/* Heure */}
                    <div className="flex items-center gap-3 md:gap-5">
                        <div className={`p-2.5 md:p-3 ${darkContainerBg} rounded-xl shrink-0 border ${whiteBorder} backdrop-blur-md`}>
                          <Clock className={`w-4 h-4 md:w-6 md:h-6 ${whiteText}`} />
                        </div>
                        <div>
                            <p className={`text-[10px] md:text-xs ${whiteOpacityText} uppercase font-bold tracking-widest mb-0.5`}>Heure</p>
                            <p className={`text-base md:text-2xl ${whiteText} font-serif font-medium`}>15h00</p>
                        </div>
                    </div>

                    {/* Lieu */}
                    <div className="flex items-start gap-3 md:gap-5">
                        <div className={`p-2.5 md:p-3 ${darkContainerBg} rounded-xl shrink-0 border ${whiteBorder} backdrop-blur-md`}>
                          <MapPin className={`w-4 h-4 md:w-6 md:h-6 ${whiteText}`} />
                        </div>
                        <div className="flex-1">
                            <p className={`text-[10px] md:text-xs ${whiteOpacityText} uppercase font-bold tracking-widest mb-0.5`}>Lieu</p>
                            <p className={`text-base md:text-2xl ${whiteText} font-serif font-medium mb-3 leading-snug`}>
                                Yaoundé, Manguier( entre Chapelle Manguier et Carrefour Alpha face Minat hôtel )
                            </p>
                            
                            <a 
                              href={dotMapUrl} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className={`inline-flex items-center gap-2 px-3 py-2 md:px-5 md:py-2.5 bg-white/10 hover:bg-white/20 text-white border border-white/30 rounded-lg text-xs md:text-sm font-bold transition-all uppercase tracking-wider group backdrop-blur-sm`}
                            >
                                <Navigation size={14} className="group-hover:rotate-45 transition-transform" /> 
                                Voir sur la carte
                            </a>
                        </div>
                    </div>
                  </div>
              </div>

              {/* --- PARTIE DROITE : SOIRÉE --- */}
              {/* MODIF : p-5 md:p-10 (réduit) */}
              <div className={`w-full md:w-1/2 p-5 md:p-10 relative`}>
                  
                  <div className="relative z-10">
                    
                    <div className="mb-2 opacity-90 flex">
                        <Wine className={`w-6 h-6 md:w-10 md:h-10 ${whiteText}`} strokeWidth={1} />
                        <Wine className={`w-6 h-6 md:w-10 md:h-10 ${whiteText} -ml-2 md:-ml-3`} strokeWidth={1} />
                    </div>

                    {/* MODIF : mb-6 (réduit) */}
                    <h3 className={`text-2xl md:text-4xl font-serif ${whiteText} mb-6 inline-block border-b border-white/40 pb-2`}>
                        Soirée
                    </h3>

                    {/* Info Date & Lieu */}
                    {/* MODIF : mb-6 space-y-4 (réduit) */}
                    <div className="mb-6 md:mb-10 space-y-4 md:space-y-6">
                        <div className={`flex items-center gap-3 ${whiteText}`}>
                            <Calendar className={`w-4 h-4 md:w-6 md:h-6 ${whiteText}`} />
                            <span className="text-base md:text-2xl font-serif font-medium">Samedi 04 Avril 2026</span>
                        </div>
                        
                        <div className={`flex items-start gap-3 md:gap-4 ${darkContainerBg} p-3 md:p-6 rounded-xl border ${whiteBorder} backdrop-blur-md`}>
                            <MapPin className={`w-4 h-4 md:w-6 md:h-6 ${whiteText} shrink-0 mt-1`} />
                            <div>
                            <p className={`text-sm md:text-lg ${whiteText} leading-relaxed font-serif font-medium mb-1`}>
                                Yaoundé, Quartier Manguier au lieu dit <span className="font-bold underline decoration-white/30 underline-offset-4">CARREFOUR BEIGNET</span> salle foyer Bangou
                            </p>
                            <a 
                                href={soireeMapUrl} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className={`inline-flex items-center gap-1.5 text-[10px] md:text-xs ${whiteOpacityText} hover:text-white font-bold hover:underline uppercase tracking-wide transition-colors`}
                            >
                                <Navigation size={12} /> Ouvrir le GPS
                            </a>
                            </div>
                        </div>
                    </div>
                    
                    {/* Timeline */}
                    {/* MODIF : space-y-6 (réduit) */}
                    <div className={`relative pl-6 md:pl-8 border-l-2 md:border-l-4 ${whiteBorder} ml-2 md:ml-4 space-y-6 md:space-y-10 py-1`}>
                        {/* 19h */}
                        <div className="relative group">
                            <div className="absolute -left-[29px] md:-left-[38px] top-1.5 w-3 h-3 md:w-4 md:h-4 bg-white rounded-full ring-2 md:ring-4 ring-white/30 shadow-[0_0_10px_rgba(255,255,255,0.5)]"></div>
                            <div className="flex flex-col">
                            <span className={`${whiteText} font-serif font-bold text-sm md:text-lg mb-0.5`}>19h00</span>
                            <span className={`${whiteText} text-sm md:text-xl font-serif font-medium opacity-90 leading-tight`}>Arrivée et installation des invités</span>
                            </div>
                        </div>

                        {/* 20h30 */}
                        <div className="relative group">
                            <div className={`absolute -left-[29px] md:-left-[38px] top-1.5 w-3 h-3 md:w-4 md:h-4 bg-white/50 rounded-full ring-2 md:ring-4 ring-white/20`}></div>
                            <div className="flex flex-col">
                            <span className={`${whiteOpacityText} font-serif font-bold text-sm md:text-lg mb-0.5`}>20h00</span>
                            <span className={`${whiteText} text-sm md:text-xl font-serif font-medium opacity-90`}>Début des activités</span>
                            </div>
                        </div>

                        {/* 23h30 */}
                        <div className="relative group">
                            <div className={`absolute -left-[29px] md:-left-[38px] top-1.5 w-3 h-3 md:w-4 md:h-4 bg-white/50 rounded-full ring-2 md:ring-4 ring-white/20`}></div>
                            <div className="flex flex-col">
                            <span className={`${whiteOpacityText} font-serif font-bold text-sm md:text-lg mb-0.5`}>23h30</span>
                            <span className={`${whiteText} text-sm md:text-xl font-serif font-medium opacity-90 leading-tight`}>Danse d'ouverture et piste libre</span>
                            </div>
                        </div>
                    </div>
                  </div>
              </div>

            </div>
            
            <div className="w-full h-0.5 bg-white/40"></div>
      </div>
    </section>
  );
};

export default EventDetails;