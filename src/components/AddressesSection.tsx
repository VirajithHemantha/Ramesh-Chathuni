import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Navigation } from 'lucide-react';

export const AddressesSection: React.FC = () => {
  const [isRevealed, setIsRevealed] = useState(false);
  
  // Quick helper to search the address on google map link safely without prompt failure
  const handleGetDirections = (address: string) => {
    const encoded = encodeURIComponent(address);
    window.open(`https://www.google.com/maps/search/?api=1&query=${encoded}`, '_blank');
  };

  const addressesData = {
    poruwa: {
      title: 'Poruwa & Reception',
      name: 'Senuri Grand Castello',
      address: 'Divulapitiya',
      note: 'Ceremony begins at 10:00 AM',
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-6 py-16 flex justify-center" style={{ perspective: '1500px' }}>
      <AnimatePresence mode="wait">
        {!isRevealed ? (
          <motion.div
            key="cover"
            initial={{ opacity: 0, rotateY: 90 }}
            animate={{ opacity: 1, rotateY: 0 }}
            exit={{ opacity: 0, rotateY: -90 }}
            transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
            className="relative max-w-3xl w-full mx-auto h-[320px] sm:h-[400px] rounded-[2.5rem] shadow-[0_15px_30px_rgba(0,0,0,0.12)] overflow-hidden group cursor-pointer"
            onClick={() => setIsRevealed(true)}
          >
            <div className="absolute inset-0 bg-[url('/images/hotel.jpg')] bg-cover bg-center transition-transform duration-[2s] group-hover:scale-105" />
            <div className="absolute inset-0 bg-black/10 transition-opacity duration-500 group-hover:bg-black/20" />
            
            <div className="absolute top-8 right-8 sm:top-12 sm:right-12 bg-white/75 backdrop-blur-md p-6 sm:p-8 rounded-[2rem] text-center shadow-2xl border border-white/60 w-[65%] sm:w-[45%] transition-transform duration-500 group-hover:-translate-y-1">
              <div className="flex items-center justify-center gap-2 mb-4">
                <div className="h-[1px] w-5 bg-brand-primary/80" />
                <p className="text-[8px] sm:text-[9px] uppercase tracking-[0.3em] text-brand-primary-deep font-bold">The Location</p>
                <div className="h-[1px] w-5 bg-brand-primary/80" />
              </div>
              
              <h2 className="text-2xl sm:text-3xl font-display text-brand-dark mb-6 leading-tight px-2">Senuri Grand Castello</h2>
              
              <div className="bg-[#c47f63] text-white px-8 py-3 rounded-full text-[9px] sm:text-[10px] font-sans font-bold tracking-[0.2em] uppercase shadow-md inline-block w-full">
                View Map
              </div>
            </div>

            <div className="absolute bottom-6 left-6 bg-white/85 backdrop-blur-md px-4 py-2 rounded-full flex items-center gap-2 border border-white/60 shadow-sm transition-transform duration-500 group-hover:translate-x-1 z-10">
              <MapPin className="w-3.5 h-3.5 text-[#c47f63]" />
              <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.2em] font-bold text-brand-primary-deep">Senuri Grand Castello</span>
            </div>

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 inline-flex items-center gap-2 bg-black/50 backdrop-blur-md px-5 py-2.5 rounded-full shadow-md transition-all duration-500 group-hover:-translate-y-1 group-hover:bg-black/60 z-10">
              <div className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_5px_rgba(255,255,255,0.8)]" />
              <span className="text-[8px] font-sans tracking-[0.2em] text-white font-bold uppercase drop-shadow-sm">Tap to reveal</span>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="revealed"
            initial={{ opacity: 0, rotateY: 90 }}
            animate={{ opacity: 1, rotateY: 0 }}
            transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
            className="w-full max-w-3xl mx-auto bg-brand-ivory/90 backdrop-blur-md rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.08)] border border-brand-primary/20 overflow-hidden relative"
          >
            {/* Subtle background decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-radial from-brand-primary/10 to-transparent blur-3xl pointer-events-none -z-10" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-radial from-brand-champagne/40 to-transparent blur-3xl pointer-events-none -z-10" />

            {/* Details */}
            <div className="w-full p-10 sm:p-16 flex flex-col items-center text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="flex flex-col items-center"
              >
                <div className="inline-flex items-center gap-4 mb-6">
                  <div className="w-12 h-[1px] bg-gradient-to-l from-brand-primary/60 to-transparent" />
                  <span className="text-brand-primary uppercase tracking-[0.4em] text-[10px] sm:text-[11px] font-bold drop-shadow-sm">
                    {addressesData.poruwa.title}
                  </span>
                  <div className="w-12 h-[1px] bg-gradient-to-r from-brand-primary/60 to-transparent" />
                </div>

                <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-stone-800 mb-8 drop-shadow-sm leading-[1.1]">
                  Senuri Grand <br/>
                  <span className="italic font-light text-brand-primary">Castello</span>
                </h2>

                <div className="space-y-4 mb-10 flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-brand-primary/10 flex items-center justify-center mb-2">
                    <MapPin className="w-5 h-5 text-brand-primary" />
                  </div>
                  <p className="font-serif text-2xl text-stone-700 leading-snug">{addressesData.poruwa.address}</p>
                  <p className="font-serif text-base text-stone-500 italic">{addressesData.poruwa.note}</p>
                </div>

                <button
                  onClick={() => handleGetDirections(`${addressesData.poruwa.name}, ${addressesData.poruwa.address}`)}
                  className="inline-flex items-center justify-center gap-3 bg-brand-primary text-white px-10 py-4 rounded-full font-sans tracking-[0.2em] text-[10px] sm:text-xs uppercase hover:bg-brand-primary-deep hover:shadow-[0_10px_20px_rgba(0,0,0,0.15)] transition-all duration-300 active:scale-95"
                >
                  <Navigation className="w-4 h-4" />
                  Get Directions
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
