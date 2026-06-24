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
    <div className="w-full max-w-6xl mx-auto px-6 py-16 flex justify-center">
      <AnimatePresence mode="wait">
        {!isRevealed ? (
          <motion.div
            key="cover"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.8 }}
            className="relative max-w-md w-full mx-auto h-[550px] rounded-[3rem] shadow-[0_20px_40px_rgba(0,0,0,0.15)] overflow-hidden flex flex-col items-center justify-end pb-12"
          >
            <div className="absolute inset-0 bg-[url('/images/hotel.jpg')] bg-cover bg-center" />
            <div className="absolute inset-0 bg-black/20" />
            
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/70 backdrop-blur-md p-10 sm:p-14 rounded-3xl text-center shadow-2xl border border-white/50 w-[85%] max-w-sm">
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="h-[1px] w-8 bg-brand-primary" />
                <p className="text-[10px] uppercase tracking-[0.3em] text-brand-primary-deep font-bold">The Location</p>
                <div className="h-[1px] w-8 bg-brand-primary" />
              </div>
              
              <h2 className="text-3xl sm:text-4xl font-display text-brand-dark mb-8 leading-tight">Senuri Grand Castello</h2>
              
              <button 
                onClick={() => setIsRevealed(true)}
                className="bg-[#c47f63] text-white px-10 py-3.5 rounded-full text-[10px] font-sans font-bold tracking-[0.2em] uppercase hover:bg-[#b5684d] transition-colors shadow-md"
              >
                View Map
              </button>
            </div>

            <div className="absolute bottom-6 left-6 bg-white/80 backdrop-blur-md px-5 py-2.5 rounded-full flex items-center gap-2 border border-white/50 shadow-sm z-10 pointer-events-none">
              <MapPin className="w-4 h-4 text-[#c47f63]" />
              <span className="text-[9px] uppercase tracking-[0.2em] font-bold text-brand-primary-deep">Senuri Grand Castello</span>
            </div>

            <button
              onClick={() => setIsRevealed(true)}
              className="group relative z-10 inline-flex items-center gap-3 bg-black/50 hover:bg-black/60 backdrop-blur-md px-6 py-3 rounded-full transition-all duration-300 shadow-md"
            >
              <div className="w-2 h-2 rounded-full bg-white group-hover:scale-125 transition-transform duration-300 shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
              <span className="text-[9px] font-sans tracking-[0.2em] text-white font-bold uppercase drop-shadow-sm">Tap to reveal</span>
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="revealed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="w-full bg-white/60 backdrop-blur-md rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-brand-primary/20 overflow-hidden flex flex-col lg:flex-row"
          >
            {/* Image Half */}
            <div className="w-full lg:w-1/2 h-[350px] lg:h-auto relative overflow-hidden group">
              <img 
                src="/images/hotel.jpg" 
                alt="Hotel Venue" 
                className="w-full h-full object-cover transition-transform duration-[2s] ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-black/10 mix-blend-multiply pointer-events-none" />
            </div>

            {/* Details Half */}
            <div className="w-full lg:w-1/2 p-10 sm:p-16 flex flex-col justify-center bg-brand-ivory/90 relative">
              {/* Subtle background decoration */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-radial from-brand-primary/10 to-transparent blur-3xl pointer-events-none -z-10" />

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <div className="inline-flex items-center gap-4 mb-6">
                  <span className="text-brand-primary uppercase tracking-[0.4em] text-[10px] sm:text-[11px] font-bold drop-shadow-sm">
                    {addressesData.poruwa.title}
                  </span>
                  <div className="w-16 h-[1px] bg-gradient-to-r from-brand-primary/60 to-transparent" />
                </div>

                <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-stone-800 mb-6 drop-shadow-sm leading-[1.1]">
                  Senuri Grand <br/>
                  <span className="italic font-light text-brand-primary">Castello</span>
                </h2>

                <div className="space-y-4 mb-10">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-brand-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                      <MapPin className="w-4 h-4 text-brand-primary" />
                    </div>
                    <div>
                      <p className="font-serif text-xl text-stone-700 leading-snug">{addressesData.poruwa.address}</p>
                      <p className="font-serif text-sm text-stone-500 italic mt-2">{addressesData.poruwa.note}</p>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => handleGetDirections(`${addressesData.poruwa.name}, ${addressesData.poruwa.address}`)}
                  className="inline-flex items-center gap-3 bg-brand-primary text-white px-8 py-4 rounded-full font-sans tracking-[0.2em] text-[10px] sm:text-xs uppercase hover:bg-brand-primary-deep hover:shadow-[0_10px_20px_rgba(0,0,0,0.15)] transition-all duration-300 active:scale-95"
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
