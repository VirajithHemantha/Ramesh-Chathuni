import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { submitToGoogleSheet } from '../googleSheets';
import { CheckCircle, Loader2, Sparkles } from 'lucide-react';

export const WishesForm: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      await submitToGoogleSheet('wish', {
        fullName: formData.fullName,
        message: formData.message,
        submittedAt: new Date().toISOString(),
      });

      try {
        await addDoc(collection(db, 'wishes'), {
          ...formData,
          createdAt: serverTimestamp(),
        });
      } catch (firestoreError) {
        console.warn('Firestore wish backup failed:', firestoreError);
      }

      setStatus('success');
      setFormData({ fullName: '', message: '' });
    } catch (error) {
      console.error('Error sending wish to Google Sheets: ', error);
      setStatus('error');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 relative py-10 z-10">
      <AnimatePresence mode="wait">
        {status === 'success' ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="text-center py-16 px-8 bg-white/80 backdrop-blur-md rounded-[2rem] border border-brand-primary/20 shadow-xl"
          >
            <div className="w-24 h-24 bg-brand-champagne rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner border border-brand-primary/20">
              <CheckCircle className="w-12 h-12 text-brand-primary" />
            </div>
            <h3 className="text-4xl font-display text-brand-dark mb-4 tracking-tight">Thank You</h3>
            <p className="text-brand-primary-deep/80 leading-relaxed font-serif text-lg mb-8">
              Your lovely wishes have been received. They mean the world to us!
            </p>
            <button
              onClick={() => setStatus('idle')}
              className="px-6 py-2 rounded-full border border-brand-primary/30 text-brand-primary font-sans text-[10px] tracking-[0.2em] uppercase hover:bg-brand-champagne transition-all duration-300 shadow-sm"
            >
              Send Another Wish
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit}
            className="bg-white/80 backdrop-blur-xl p-8 sm:p-14 rounded-[3rem] border border-white/60 shadow-[0_30px_60px_rgba(0,0,0,0.05)] relative overflow-hidden"
          >
            <Sparkles className="absolute -top-4 -left-4 w-12 h-12 text-brand-primary/40 animate-pulse" />
            
            <div className="text-center mb-10">
              <span className="text-brand-primary uppercase tracking-[0.5em] text-[10px] sm:text-[11px] font-bold drop-shadow-sm mb-4 block">
                Leave a Message
              </span>
              <h2 className="text-4xl sm:text-5xl font-display text-brand-dark tracking-tight">
                Send Your Wishes
              </h2>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] font-bold text-brand-primary-deep mb-3 ml-2">Your Name</label>
                <input
                  required
                  type="text"
                  placeholder="E.g., John Doe"
                  className="w-full bg-white/90 px-6 py-4 rounded-full border border-brand-primary/20 focus:ring-2 focus:ring-brand-primary/40 focus:border-brand-primary-light outline-none transition-all duration-300 font-serif italic text-lg shadow-sm text-brand-dark placeholder:text-brand-primary-muted"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] font-bold text-brand-primary-deep mb-3 ml-2">Your Wishes</label>
                <textarea
                  required
                  placeholder="Write a beautiful message for the couple..."
                  className="w-full bg-white/90 px-6 py-4 rounded-[2rem] border border-brand-primary/20 focus:ring-2 focus:ring-brand-primary/40 focus:border-brand-primary-light outline-none transition-all duration-300 h-32 resize-none font-serif italic text-lg shadow-sm text-brand-dark placeholder:text-brand-primary-muted"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
              </div>

              <div className="pt-4">
                <button
                  disabled={status === 'loading'}
                  type="submit"
                  className="w-full bg-brand-primary text-white py-5 rounded-full font-sans tracking-[0.3em] font-bold text-[11px] uppercase hover:bg-brand-primary-deep transition-all duration-300 shadow-md hover:shadow-lg active:scale-[0.98] flex items-center justify-center gap-3 disabled:opacity-70"
                >
                  {status === 'loading' ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    'Send Wishes'
                  )}
                </button>
              </div>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
};
