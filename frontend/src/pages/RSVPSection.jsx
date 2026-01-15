// src/pages/RSVPSection.jsx
import React from 'react';
import { AlertCircle, X } from 'lucide-react';

const RSVPSection = ({ isDeadlinePassed, onNavigate, deadlineDate }) => {
  return (
    <section className="py-16 md:py-24 px-4 relative reveal-on-scroll">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 md:mb-16 px-4">
          <h3 className="text-xl md:text-3xl font-serif text-stone-700 mb-6 leading-relaxed">
            Nous attendons avec impatience votre confirmation
          </h3>
          <p className="text-stone-500 text-sm md:text-lg max-w-3xl mx-auto mb-8 leading-relaxed">
            Chaque détail compte pour nous, et votre présence est le cadeau le plus précieux. Veuillez confirmer votre participation avant le {new Date(deadlineDate).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}.
          </p>
        </div>

        {isDeadlinePassed ? (
          <div className="bg-red-50 border border-red-200 rounded-3xl p-8 md:p-12 text-center max-w-2xl mx-auto shadow-lg reveal-on-scroll card-animate">
            <div className="flex justify-center mb-6">
              <AlertCircle className="w-16 h-16 text-red-500" />
            </div>
            <h3 className="text-2xl font-serif text-red-700 mb-3">Date limite atteinte</h3>
            <p className="text-red-600/80 text-lg">
              Vous ne pouvez plus confirmer votre présence car la date limite du {new Date(deadlineDate).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })} est passée.
            </p>
          </div>
        ) : (
          <div className="flex flex-row gap-4 md:gap-6 max-w-4xl mx-auto justify-center items-stretch">
            {/* Bouton OUI */}
            <button
              onClick={() => onNavigate('rsvp-oui')}
              className="flex-1 group relative w-full"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-green-200 to-emerald-200 rounded-3xl blur-lg opacity-0 group-hover:opacity-70 transition-opacity duration-500"></div>
              <div className="relative bg-white text-stone-800 rounded-3xl p-6 md:p-12 hover:scale-105 transition-transform shadow-xl h-full flex flex-col items-center justify-center card-animate reveal-on-scroll border border-stone-100">
                <div className="w-16 h-16 md:w-32 md:h-32 bg-green-50 rounded-full flex items-center justify-center mb-4 md:mb-6">
                  <svg className="w-8 h-8 md:w-16 md:h-16 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-stone-500 text-sm md:text-lg mb-1 md:mb-2">Oui,</p>
                <p className="text-lg md:text-3xl font-bold text-center leading-tight">je vais participer</p>
              </div>
            </button>

            {/* Bouton NON */}
            <button
              onClick={() => onNavigate('rsvp-non')}
              className="flex-1 group relative w-full"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-red-200 to-pink-200 rounded-3xl blur-lg opacity-0 group-hover:opacity-70 transition-opacity duration-500"></div>
              <div className="relative bg-white text-stone-800 rounded-3xl p-6 md:p-12 hover:scale-105 transition-transform shadow-xl h-full flex flex-col items-center justify-center card-animate reveal-on-scroll border border-stone-100">
                <div className="w-16 h-16 md:w-32 md:h-32 bg-red-50 rounded-full flex items-center justify-center mb-4 md:mb-6">
                  <X className="w-8 h-8 md:w-16 md:h-16 text-red-500" strokeWidth={3} />
                </div>
                <p className="text-stone-500 text-sm md:text-lg mb-1 md:mb-2">Non,</p>
                <p className="text-lg md:text-3xl font-bold text-center leading-tight">je ne pourrai pas participer</p>
              </div>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default RSVPSection;