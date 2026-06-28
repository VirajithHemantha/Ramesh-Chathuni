import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Heart } from 'lucide-react';
import { CornerFlowers } from './CornerFlowers';

export const HeroContent: React.FC = () => {
  return (
    <section className="relative min-h-screen py-24 sm:py-32 flex items-center justify-center overflow-hidden">
      <CornerFlowers position="all" opacity={0.8} scale={1.8} />
      {/* Background Image with Elegant Overlays */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-[url('/images/b.jpg')] bg-cover bg-center bg-no-repeat" 
        />
        <div className="absolute inset-0 bg-brand-ivory/60 backdrop-blur-[4px]" />
        <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/10 via-transparent to-brand-primary/5 mix-blend-multiply" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center"
        >
          <div className="flex flex-col items-center justify-center min-h-[50vh]">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display text-stone-800 leading-tight drop-shadow-sm mb-4">
              You are invited
            </h1>
            <p className="text-lg sm:text-2xl font-serif italic text-stone-600 tracking-wide px-4 text-center">
              ( to celebrate the beginning of an eternal bond )
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
