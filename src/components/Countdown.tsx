import React, { useState, useEffect } from 'react';
import { differenceInDays, differenceInHours, differenceInMinutes, differenceInSeconds } from 'date-fns';
import { motion } from 'motion/react';

interface CountdownProps {
  targetDate: Date;
}

export const Countdown: React.FC<CountdownProps> = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const days = Math.max(0, differenceInDays(targetDate, now));
      const hours = Math.max(0, differenceInHours(targetDate, now) % 24);
      const minutes = Math.max(0, differenceInMinutes(targetDate, now) % 60);
      const seconds = Math.max(0, differenceInSeconds(targetDate, now) % 60);

      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="flex flex-wrap justify-center gap-4 sm:gap-6 lg:gap-10 py-6">
      {[
        { label: 'Days', value: timeLeft.days },
        { label: 'Hours', value: timeLeft.hours },
        { label: 'Minutes', value: timeLeft.minutes },
        { label: 'Seconds', value: timeLeft.seconds },
      ].map((item, i) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ delay: i * 0.15, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center min-w-[90px] sm:min-w-[140px] relative group"
        >
          {/* Elegant arched box background */}
          <div className="absolute inset-0 bg-black/15 border border-white/5 shadow-inner shadow-white/5 rounded-[3rem_3rem_1rem_1rem] sm:rounded-[5rem_5rem_1.5rem_1.5rem] group-hover:bg-black/20 group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.2)] transition-all duration-700 ease-out group-hover:-translate-y-2 pointer-events-none" />

          <div className="relative pt-12 pb-10 px-4 flex flex-col items-center w-full z-10 transition-transform duration-700 group-hover:-translate-y-2">
            {/* Elegant number */}
            <span className="text-5xl sm:text-6xl lg:text-7xl font-display text-white mb-5 drop-shadow-sm tabular-nums tracking-wider">
              {String(item.value).padStart(2, '0')}
            </span>
            {/* Soft gradient divider */}
            <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-brand-champagne/40 to-transparent mb-5" />
            {/* Label */}
            <span className="text-[9px] sm:text-[11px] uppercase tracking-[0.4em] text-white/90 font-bold font-sans drop-shadow-sm">{item.label}</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
};
