import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Navigation } from 'lucide-react';

export const AddressesSection: React.FC = () => {
  
  // Quick helper to search the address on google map link safely without prompt failure
  const handleGetDirections = (address: string) => {
    const encoded = encodeURIComponent(address);
    window.open(`https://www.google.com/maps/search/?api=1&query=${encoded}`, '_blank');
  };

  const addressesData = {
    church: {
      title: 'Church Function',
      name: "St. Joseph's Church",
      address: 'Wennappuwa, Sri Lanka',
    },
    poruwa: {
      title: 'Poruwa & Reception',
      name: 'Senuri Grand Castello',
      address: 'Divulapitiya',
      note: 'Ceremony begins at 10:00 AM',
    },
    homecoming: {
      title: 'The Homecoming',
      name: 'Maze Glass House',
      address: 'Chilaw - Colombo Main Rd, Wennappuwa 61170',
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-6 py-16 flex justify-center">
      <div className="w-full bg-white/60 backdrop-blur-md rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-brand-primary/20 overflow-hidden flex flex-col lg:flex-row">
        
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
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
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
      </div>
    </div>
  );
};
