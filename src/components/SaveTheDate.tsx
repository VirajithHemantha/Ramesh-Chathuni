import React from 'react';

export const SaveTheDate: React.FC = () => {
  return (
    <section className="relative w-full bg-brand-ivory py-16 sm:py-24 flex items-center justify-center overflow-hidden">
      {/* Decorative subtle background elements if needed */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-radial from-brand-primary/10 to-transparent blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-radial from-brand-champagne/40 to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="relative z-10 w-full max-w-2xl mx-auto px-6 text-center">
        <div className="w-full relative group">
          <div className="absolute -inset-2 bg-gradient-to-r from-brand-champagne/40 via-brand-primary/20 to-brand-champagne/40 rounded-[2.5rem] blur-xl opacity-50 transition-opacity duration-500 group-hover:opacity-100" />
          <img 
            src="/save%20the%20date.png?v=2" 
            alt="Save The Date" 
            className="relative w-full h-auto object-contain rounded-[2rem] sm:rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.15)] border-[6px] sm:border-[10px] border-white transition-transform duration-700 ease-out group-hover:scale-[1.02]"
          />
        </div>
      </div>
    </section>
  );
};
