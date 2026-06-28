import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Music, Music2, Volume2, VolumeX } from 'lucide-react';
import { FloatingPetals } from './components/FloatingPetals';

import { Countdown } from './components/Countdown';
import { PoruwaEvent } from './components/PoruwaEvent';
import { CoupleDetails } from './components/CoupleDetails';

// Removed Timeline import
// Removed Gallery import
import { AddressesSection } from './components/AddressesSection';
import { RSVPForm } from './components/RSVPForm';
import { WishesForm } from './components/WishesForm';
import { Footer } from './components/Footer';
import { IntroVideo } from './components/IntroVideo';

import { CornerFlowers } from './components/CornerFlowers';
import { WelcomeMessage } from './components/WelcomeMessage';
import { SaveTheDate } from './components/SaveTheDate';

export default function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [showMain, setShowMain] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const weddingDate = new Date('2026-08-14T09:30:00');
  const [isClosed, setIsClosed] = useState(false);

  const startMusic = () => {
    if (audioRef.current && !isMusicPlaying) {
      audioRef.current.play().catch(err => console.log("Audio play blocked: ", err));
      setIsMusicPlaying(true);
    }
  };

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isMusicPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(err => console.log("Audio play blocked: ", err));
      }
      setIsMusicPlaying(!isMusicPlaying);
    }
  };

  useEffect(() => {
    const playAudio = () => {
      if (audioRef.current && !isMusicPlaying) {
        audioRef.current.play().then(() => {
          setIsMusicPlaying(true);
        }).catch(err => {
          console.log("Autoplay blocked, waiting for interaction");
        });
      }
    };

    // Attempt to play immediately (may be blocked by browser)
    playAudio();

    // Unlock audio on first user interaction
    const handleInteraction = () => {
      playAudio();
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('touchstart', handleInteraction);
      document.removeEventListener('scroll', handleInteraction);
    };

    document.addEventListener('click', handleInteraction);
    document.addEventListener('touchstart', handleInteraction);
    document.addEventListener('scroll', handleInteraction, { once: true });

    return () => {
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('touchstart', handleInteraction);
      document.removeEventListener('scroll', handleInteraction);
    };
  }, [isMusicPlaying]);

  if (isClosed) {
    return (
      <div className="relative min-h-screen bg-brand-ivory flex items-center justify-center p-6 text-center">
        <FloatingPetals />
        <div className="bg-white/60 backdrop-blur-md p-10 sm:p-20 rounded-[3rem] border border-brand-primary/20 shadow-2xl relative max-w-2xl">
          <CornerFlowers position="all" opacity={0.6} scale={1.2} />
          <h1 className="text-4xl sm:text-6xl font-display text-brand-dark mb-6 tracking-tight drop-shadow-sm">Thank You</h1>
          <p className="font-serif italic text-lg sm:text-xl text-stone-600 mb-10 leading-relaxed">
            For taking the time to view our invitation. We hope to see you on our special day!
          </p>
          <button 
            onClick={() => setIsClosed(false)}
            className="px-8 py-3 rounded-full border border-brand-primary/30 text-brand-primary font-sans text-xs tracking-[0.2em] uppercase hover:bg-brand-champagne transition-all duration-300 shadow-sm"
          >
            Open Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen font-sans selection:bg-brand-gold selection:text-white overflow-x-hidden bg-brand-ivory">
      <FloatingPetals />
      
      {/* Background Music */}
      <audio
        ref={audioRef}
        src="/paulyudin-wedding-485932.mp3"
        loop
      />

      <AnimatePresence mode="wait">
        {showIntro ? (
          <IntroVideo key="intro" onComplete={() => { setShowIntro(false); setShowMain(true); startMusic(); }} />
        ) : (
          <motion.main
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
            className="relative z-10"
          >
            {/* Music Toggle Button */}
            <button
              onClick={toggleMusic}
              className="fixed bottom-8 right-8 z-[60] w-14 h-14 glass rounded-full flex items-center justify-center text-brand-gold-deep hover:bg-stone-800 hover:text-brand-champagne transition-all active:scale-90 shadow-2xl group"
            >
              <div className="absolute inset-0 rounded-full border border-brand-gold/20 scale-110 group-hover:scale-125 transition-transform" />
              {isMusicPlaying ? <Volume2 className="w-6 h-6" /> : <VolumeX className="w-6 h-6" />}
            </button>

            {/* Close Invitation Button */}
            <button
              onClick={() => setIsClosed(true)}
              className="fixed top-8 right-8 z-[60] bg-white/70 backdrop-blur-md px-6 py-2 rounded-full border border-brand-primary/30 text-brand-primary-deep font-sans text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase shadow-lg hover:bg-white hover:shadow-xl transition-all active:scale-95 flex items-center gap-2"
            >
              <div className="w-2 h-2 rounded-full bg-brand-pink/80" />
              Close
            </button>



            <section id="couple" className="py-16 sm:py-32 bg-gradient-to-b from-brand-ivory via-brand-champagne to-[#F4F6F2] relative overflow-hidden">
              <CornerFlowers position="top-right" opacity={0.6} scale={1.5} />
              <CornerFlowers position="bottom-left" opacity={0.6} scale={1.5} />
              <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] pointer-events-none" />
              <CoupleDetails />
            </section>
            
            <SaveTheDate />

            <section id="countdown" className="py-16 sm:py-32 relative overflow-hidden bg-brand-primary">
              <CornerFlowers position="top-left" opacity={0.3} scale={1.2} />
              <CornerFlowers position="bottom-right" opacity={0.3} scale={1.2} />
              {/* Premium Background Ambient Glows */}
              <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[70%] bg-white/10 blur-[120px] rounded-full" />
                <div className="absolute -bottom-[20%] -left-[10%] w-[50%] h-[70%] bg-brand-champagne/10 blur-[120px] rounded-full" />
              </div>
              
              <div className="relative z-10 max-w-5xl mx-auto px-6 flex flex-col items-center text-center">
                <div className="inline-flex items-center gap-4 mb-6">
                  <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-brand-champagne/60" />
                  <span className="text-brand-champagne uppercase tracking-[0.5em] text-[11px] font-semibold font-sans drop-shadow-sm">The Final Countdown</span>
                  <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-brand-champagne/60" />
                </div>
                
                <h2 className="text-5xl sm:text-7xl font-display text-white tracking-tight mb-6 drop-shadow-md">
                  Until We Say <span className="italic text-brand-champagne font-light">"I Do"</span>
                </h2>
                
                <p className="text-lg sm:text-xl font-serif italic text-white/90 mb-12 sm:mb-16 max-w-2xl text-center leading-relaxed drop-shadow-sm">
                  Time is standing still as we eagerly await the moment our forever begins.
                </p>

                <Countdown targetDate={weddingDate} />
              </div>
            </section>

            <section id="poruwa">
              <PoruwaEvent />
            </section>

            <section id="addresses" className="py-16 sm:py-32 bg-gradient-to-b from-[#F4F6F2] via-brand-ivory to-brand-primary/10 relative">
              <AddressesSection />
            </section>

            <section id="rsvp" className="py-16 sm:py-32 bg-gradient-to-b from-brand-primary/10 to-brand-ivory relative overflow-hidden">
              <CornerFlowers position="top-right" opacity={0.6} scale={1.6} />
              <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] opacity-20 pointer-events-none" />
              <RSVPForm />
            </section>

            <WelcomeMessage />

            <section id="wishes" className="py-16 sm:py-32 bg-gradient-to-b from-brand-ivory to-[#F4F6F2] relative overflow-hidden">
              <CornerFlowers position="top-left" opacity={0.4} scale={1.6} />
              <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] opacity-20 pointer-events-none" />
              <WishesForm />
            </section>

            <Footer />
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  );
}

