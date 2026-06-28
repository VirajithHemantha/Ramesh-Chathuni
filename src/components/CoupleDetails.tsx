import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Heart } from 'lucide-react';

export const CoupleDetails: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 relative flex flex-col items-center text-center">
      {/* Decorative ambient background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-radial from-brand-primary/15 to-transparent rounded-full blur-[100px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="relative z-10 w-full mb-12 sm:mb-16"
      >
        <div className="inline-flex items-center gap-4 mb-6 mt-4">
          <div className="w-12 sm:w-20 h-[1px] bg-gradient-to-r from-transparent to-brand-primary/60" />
          <Heart className="w-4 h-4 text-brand-pink fill-brand-pink/40" />
          <div className="w-12 sm:w-20 h-[1px] bg-gradient-to-l from-transparent to-brand-primary/60" />
        </div>
        <h2 className="text-4xl sm:text-6xl font-display text-stone-800 tracking-tight drop-shadow-sm mb-4">
          We are getting married
        </h2>
      </motion.div>

      <div className="flex flex-col items-center gap-12 relative z-10 w-full">
        {/* Bride Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
        >
          <span className="text-brand-primary uppercase tracking-[0.4em] text-[10px] font-bold mb-3 block">The Bride</span>
          <h3 className="text-4xl sm:text-5xl font-display text-stone-800 mb-2 drop-shadow-sm">Chathuni</h3>
          <p className="text-stone-500/90 font-serif italic text-base sm:text-lg">Daughter of Mr. & Mrs Mallawaachchi</p>
        </motion.div>

        {/* Center Couple Image (No Border) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
          className="relative px-4 sm:px-0 w-full max-w-[400px]"
        >
          <div className="relative w-full aspect-[3/4] overflow-hidden rounded-[2rem] shadow-[0_20px_50px_rgba(70,130,180,0.15)] bg-brand-champagne z-10">
            <img
              src="/images/a.jpg"
              alt="Couple"
              className="w-full h-full object-cover"
            />
            {/* Elegant inner shadow & overlay */}
            <div className="absolute inset-0 shadow-[inset_0_0_60px_rgba(70,130,180,0.1)] pointer-events-none" />
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
          </div>
          
          <Sparkles className="absolute -top-4 -left-4 w-8 h-8 text-brand-primary animate-pulse drop-shadow-sm z-20" />
          <Sparkles className="absolute -bottom-4 -right-4 w-6 h-6 text-brand-primary/60 animate-pulse delay-300 drop-shadow-sm z-20" />
        </motion.div>

        {/* Groom Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
        >
          <span className="text-brand-primary uppercase tracking-[0.4em] text-[10px] font-bold mb-3 block">The Groom</span>
          <h3 className="text-4xl sm:text-5xl font-display text-stone-800 mb-2 drop-shadow-sm">Ramesh</h3>
          <p className="text-stone-500/90 font-serif italic text-base sm:text-lg">Son of Mr. & Mrs Dissanayake</p>
        </motion.div>
      </div>
    </div>
  );
};
