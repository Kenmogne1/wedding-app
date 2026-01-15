// src/pages/CountdownSection.jsx
import React from 'react';

const CountdownSection = ({ timeLeft, isDeadlinePassed }) => {
  return (
    <section className="py-8 md:py-12 px-4 relative bg-white">
      
      {/* Chargement des polices : Great Vibes (Cursive) et Montserrat (Chiffres fins) */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Great+Vibes&family=Montserrat:wght@100;200;300&display=swap');
      `}</style>

      <div className="max-w-4xl mx-auto">
        {!isDeadlinePassed && (
           <h2 className="text-xl md:text-3xl font-serif text-center mb-6 md:mb-8 text-stone-600 italic">
             Temps restant
           </h2>
        )}

        {isDeadlinePassed ? (
           <div className="text-center text-xl md:text-2xl font-serif text-[#4F772D]">
             Le grand jour est arrivé !
           </div>
        ) : (
          /* RESPONSIVE : Vertical sur Mobile (flex-col), Horizontal sur PC (md:flex-row) */
          <div className="flex flex-col md:flex-row justify-center items-center w-full gap-4 md:gap-0">
            
            {[
              { label: 'jours', value: timeLeft.days },
              { label: 'heures', value: timeLeft.hours },
              { label: 'minutes', value: timeLeft.minutes },
              { label: 'secondes', value: timeLeft.seconds }
            ].map((item, idx, array) => (
              <React.Fragment key={idx}>
                
                {/* BLOC UNITAIRE */}
                <div className="flex flex-col items-center justify-center min-w-[90px]">
                  
                  {/* CHIFFRE : Police Montserrat, épaisseur très fine (font-thin / weight 100), vert */}
                  <div className="font-['Montserrat',_sans-serif] font-thin text-5xl md:text-6xl text-[#4F772D] leading-none mb-1">
                    {String(item.value)}
                  </div>
                  
                  {/* LABEL : Police Great Vibes, doré/beige */}
                  <div className="font-['Great_Vibes',_cursive] text-xl md:text-2xl text-[#A49364] mt-[-5px]">
                    {item.label}
                  </div>
                </div>

                {/* SÉPARATEURS (Ligne fine) */}
                {idx !== array.length - 1 && (
                  <>
                    {/* Mobile : Trait Horizontal très fin */}
                    <div className="h-[1px] w-24 bg-[#A49364]/20 md:hidden"></div>
                    
                    {/* Desktop : Trait Vertical très fin */}
                    <div className="hidden md:block h-14 w-[1px] bg-[#A49364]/20 mx-6 lg:mx-10"></div>
                  </>
                )}

              </React.Fragment>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default CountdownSection;