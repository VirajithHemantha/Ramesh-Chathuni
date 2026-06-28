import React from 'react';
import { motion } from 'motion/react';
import { CornerFlowers } from './CornerFlowers';

export const WelcomeMessage: React.FC = () => {
  return (
    <section className="relative py-24 sm:py-32 bg-brand-champagne overflow-hidden flex items-center justify-center">
      <CornerFlowers position="top-left" opacity={0.5} scale={1.2} />
      <CornerFlowers position="bottom-right" opacity={0.5} scale={1.2} />
      
      <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] opacity-30 pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 sm:px-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="bg-white/60 backdrop-blur-sm p-8 sm:p-16 rounded-3xl border border-brand-primary/20 shadow-2xl relative"
        >

          <h2 className="text-3xl sm:text-5xl font-display text-brand-dark mb-10 mt-4 italic">
            To our family and friends,
          </h2>

          <div className="space-y-6 text-brand-primary-deep/80 font-serif text-lg sm:text-xl leading-relaxed sm:leading-loose">
            <p>
              This ceremony and celebration mark the beginning of a new chapter in both of our lives. As we reflect on the journey that has brought us to this day, we are filled with gratitude for the many meaningful moments we have each shared with you, whether at family gatherings, through school and college friendships, or alongside colleagues at work.
            </p>

            <p>
              We warmly invite your presence, your blessings, and your joyful energy on this very special occasion of our lives. Your support, encouragement, love, and laughter would mean the world to us on this day.
            </p>
            <p>
              We would also be deeply honoured to read any special messages you may have for us, whether blessings, advice, or simply words of love on our wedding day.
            </p>
            <p className="font-medium text-brand-dark pt-4">
              We truly hope you can join us in celebrating this beautiful moment.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
