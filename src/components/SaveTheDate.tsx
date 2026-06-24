import React from 'react';
import { motion } from 'motion/react';
import { Heart } from 'lucide-react';
import { CornerFlowers } from './CornerFlowers';

export const SaveTheDate: React.FC = () => {
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // August 2026 calendar data
  // 1st is Saturday
  const calendarDays = [
    null, null, null, null, null, null, 1,
    2, 3, 4, 5, 6, 7, 8,
    9, 10, 11, 12, 13, 14, 15,
    16, 17, 18, 19, 20, 21, 22,
    23, 24, 25, 26, 27, 28, 29,
    30, 31, null, null, null, null, null
  ];

  return (
    <section className="relative min-h-[120vh] py-24 sm:py-32 flex items-end justify-center overflow-hidden pb-32">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[url('/images/save%20the%20date.jpg')] bg-cover bg-center bg-no-repeat" />
        {/* Very subtle gradient just at the bottom to blend with the next section */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-ivory/80 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 w-full max-w-3xl mx-auto px-6 text-center mt-64 sm:mt-80">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="flex flex-col items-center"
        >
          <h2 className="text-4xl sm:text-6xl font-display text-brand-dark mb-10 drop-shadow-md">
            August 2026
          </h2>

          <div className="bg-white/80 backdrop-blur-md p-6 sm:p-10 rounded-2xl shadow-xl border border-brand-primary/20 w-full max-w-md mx-auto">
            <div className="grid grid-cols-7 gap-2 sm:gap-4 mb-4">
              {daysOfWeek.map((day) => (
                <div key={day} className="text-brand-primary-deep/60 text-xs sm:text-sm font-bold uppercase tracking-wider">
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-2 sm:gap-4">
              {calendarDays.map((day, index) => {
                const isWeddingDay = day === 14;

                return (
                  <div
                    key={index}
                    className={`relative flex items-center justify-center aspect-square text-sm sm:text-lg font-serif
                      ${!day ? 'invisible' : ''}
                      ${isWeddingDay ? 'text-white z-10 font-semibold' : 'text-stone-700'}
                    `}
                  >
                    {isWeddingDay && (
                      <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5, type: "spring" }}
                        className="absolute inset-0 bg-brand-gold rounded-full shadow-[0_0_15px_rgba(212,175,55,0.5)] flex items-center justify-center -z-10"
                      >
                        <Heart className="absolute -top-3 -right-3 w-5 h-5 text-brand-pink fill-brand-pink/80 animate-pulse" />
                      </motion.div>
                    )}
                    {day}
                  </div>
                );
              })}
            </div>
          </div>

          <p className="mt-12 text-brand-primary-deep italic font-serif text-xl sm:text-2xl">
            14th of August, 2026
          </p>
        </motion.div>
      </div>
    </section>
  );
};
