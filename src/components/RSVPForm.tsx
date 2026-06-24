import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { submitToGoogleSheet } from '../googleSheets';
import { CheckCircle, Loader2, Heart, Sparkles } from 'lucide-react';

export const RSVPForm: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    guests: '1',
    dietaryNotes: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [isRevealed, setIsRevealed] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    const normalizedGuests = parseInt(formData.guests, 10);

    try {
      await submitToGoogleSheet('rsvp', {
        fullName: formData.fullName,
        guests: normalizedGuests,
        dietaryNotes: formData.dietaryNotes,
        submittedAt: new Date().toISOString(),
      });

      try {
        await addDoc(collection(db, 'rsvps'), {
          ...formData,
          guests: normalizedGuests,
          createdAt: serverTimestamp(),
        });
      } catch (firestoreError) {
        console.warn('Firestore RSVP backup failed:', firestoreError);
      }

      setStatus('success');
      setFormData({ fullName: '', guests: '1', dietaryNotes: '' });
    } catch (error) {
      console.error('Error sending RSVP to Google Sheets: ', error);
      setStatus('error');
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-6 relative py-10">
      <AnimatePresence mode="wait">
        {!isRevealed ? (
          <motion.div
            key="cover"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.8 }}
            className="max-w-md mx-auto bg-brand-champagne p-12 sm:p-20 rounded-[3rem] shadow-[0_20px_40px_rgba(0,0,0,0.05)] text-center border border-brand-primary/10 flex flex-col items-center justify-center min-h-[550px] relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] opacity-20 pointer-events-none" />

            <p className="text-brand-primary-deep font-serif italic text-2xl mb-6 relative z-10">Kindly</p>
            <h2 className="text-5xl font-display text-brand-dark tracking-[0.3em] mb-16 uppercase relative z-10">RSVP</h2>
            
            <div className="w-24 h-24 rounded-full border-[1.5px] border-brand-primary flex flex-col items-center justify-center mb-16 relative z-10 shadow-sm bg-white/30 backdrop-blur-sm">
              <div className="absolute inset-1.5 border border-brand-primary/40 rounded-full" />
              <span className="text-brand-primary-deep font-serif text-xl tracking-widest">C</span>
              <div className="w-6 h-[1px] bg-brand-primary/50 my-1" />
              <span className="text-brand-primary-deep font-serif text-xl tracking-widest">R</span>
            </div>

            <p className="text-[10px] sm:text-[11px] font-sans tracking-[0.4em] text-brand-primary-deep font-bold mb-8 uppercase relative z-10">
              By 01.08.2026
            </p>

            <button
              onClick={() => setIsRevealed(true)}
              className="group relative z-10 inline-flex items-center gap-3 bg-black/40 hover:bg-black/50 backdrop-blur-md px-6 py-3 rounded-full transition-all duration-300 shadow-md"
            >
              <div className="w-2 h-2 rounded-full bg-white group-hover:scale-125 transition-transform duration-300 shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
              <span className="text-[9px] font-sans tracking-[0.2em] text-white font-bold uppercase drop-shadow-sm">Tap to reveal</span>
            </button>
          </motion.div>
        ) : (
          <motion.div 
            key="form"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="glass p-10 sm:p-14 lg:p-16 rounded-[3rem] border border-white/40 shadow-[0_30px_60px_rgba(0,0,0,0.05)] relative overflow-hidden bg-white/60 backdrop-blur-3xl lg:flex items-center gap-16"
          >
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-brand-primary/40 via-brand-primary-light to-brand-primary/40" />
            
            <div className="lg:w-1/2 lg:pr-10 mb-12 lg:mb-0 relative text-center lg:text-left">
              <Sparkles className="absolute -top-6 -left-6 w-12 h-12 text-brand-primary-light/40 animate-pulse" />
              
              <div className="inline-flex items-center justify-center lg:justify-start gap-4 mb-6">
                <span className="text-brand-primary uppercase tracking-[0.5em] text-[10px] sm:text-[11px] font-bold drop-shadow-sm">
                  Kindly Respond
                </span>
                <div className="hidden lg:block w-16 h-[1px] bg-gradient-to-r from-brand-primary/60 to-transparent" />
              </div>

              <h2 className="text-5xl sm:text-6xl font-display text-brand-dark tracking-tight leading-[1.1] mb-6 drop-shadow-sm">
                Reserve <span className="italic font-light text-brand-primary">Your</span> Seat
              </h2>
              
              <p className="text-brand-primary-deep/80 font-serif text-lg leading-relaxed mb-6">
                Your presence means the world to us. Please kindly let us know if you will be able to join our celebration.
              </p>
              <div className="w-12 h-[1px] bg-brand-primary/50 mx-auto lg:mx-0" />
            </div>

            <div className="lg:w-1/2 relative z-10">
              <AnimatePresence mode="wait">
                {status === 'success' ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="text-center py-16 px-8 bg-white/80 backdrop-blur-md rounded-[2rem] border border-white shadow-xl"
                  >
                    <div className="w-24 h-24 bg-brand-champagne rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner border border-brand-primary/20">
                      <CheckCircle className="w-12 h-12 text-brand-primary" />
                    </div>
                    <h3 className="text-4xl font-display text-brand-dark mb-4 tracking-tight">With Gratitude</h3>
                    <p className="text-brand-primary-deep/80 leading-relaxed font-serif text-lg mb-8">
                      Your response has been warmly received. We cannot wait to celebrate with you!
                    </p>
                    <button
                      onClick={() => setStatus('idle')}
                      className="px-6 py-2 rounded-full border border-brand-primary/30 text-brand-primary font-sans text-[10px] tracking-[0.2em] uppercase hover:bg-brand-champagne transition-all duration-300 shadow-sm"
                    >
                      Update Response
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-6 bg-white/50 p-8 sm:p-10 rounded-[2.5rem] border border-white shadow-[0_15px_30px_rgba(0,0,0,0.05)]"
                  >
                    <div>
                      <label className="block text-[10px] uppercase tracking-[0.2em] font-bold text-brand-primary-deep mb-3 ml-2">Full Name</label>
                      <input
                        required
                        type="text"
                        placeholder="E.g., John & Jane Doe"
                        className="w-full bg-white/90 px-6 py-4 rounded-full border border-brand-primary/20 focus:ring-2 focus:ring-brand-primary/40 focus:border-brand-primary-light outline-none transition-all duration-300 font-serif italic text-lg shadow-sm text-brand-dark placeholder:text-brand-primary-muted"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase tracking-[0.2em] font-bold text-brand-primary-deep mb-3 ml-2">Number of Guests</label>
                      <div className="relative group">
                        <select
                          className="w-full bg-white/90 px-6 py-4 rounded-full border border-brand-primary/20 focus:ring-2 focus:ring-brand-primary/40 focus:border-brand-primary-light outline-none transition-all duration-300 appearance-none font-serif italic text-lg shadow-sm text-brand-dark cursor-pointer"
                          value={formData.guests}
                          onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                        >
                          <option value="1">Just Me (1 Guest)</option>
                          <option value="2">We are coming! (2 Guests)</option>
                          <option value="3">3 Guests</option>
                          <option value="4">4 Guests</option>
                        </select>
                        <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-brand-primary-light transition-transform duration-300 group-hover:scale-110">
                          <Heart className="w-5 h-5 fill-brand-primary/30 text-brand-primary drop-shadow-sm" />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase tracking-[0.2em] font-bold text-brand-primary-deep mb-3 ml-2">Dietary Notes (Optional)</label>
                      <textarea
                        placeholder="We'd love to know if you have any allergies..."
                        className="w-full bg-white/90 px-6 py-4 rounded-[2rem] border border-brand-primary/20 focus:ring-2 focus:ring-brand-primary/40 focus:border-brand-primary-light outline-none transition-all duration-300 h-28 resize-none font-serif italic text-lg shadow-sm text-brand-dark placeholder:text-brand-primary-muted"
                        value={formData.dietaryNotes}
                        onChange={(e) => setFormData({ ...formData, dietaryNotes: e.target.value })}
                      />
                    </div>

                    <div className="pt-4">
                      <button
                        disabled={status === 'loading'}
                        type="submit"
                        className="w-full bg-brand-dark text-white py-5 rounded-full font-sans tracking-[0.3em] font-bold text-[11px] uppercase hover:bg-brand-primary-deep transition-all duration-300 shadow-md hover:shadow-lg active:scale-[0.98] flex items-center justify-center gap-3 disabled:opacity-70"
                      >
                        {status === 'loading' ? (
                          <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                          'Confirm Attendance'
                        )}
                      </button>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

