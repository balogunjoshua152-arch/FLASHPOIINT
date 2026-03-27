import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Fingerprint, CheckCircle2 } from 'lucide-react';

export const KYCProcess = ({ onComplete }: { onComplete: () => void }) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const nextStep = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (step < 3) setStep(step + 1);
      else onComplete();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 bg-obsidian flex items-center justify-center p-6">
      <div className="w-full max-w-sm">
        <div className="flex justify-between mb-12">
          {[1, 2, 3].map((s) => (
            <div key={s} className={`h-1 flex-1 mx-1 rounded-full ${s <= step ? 'bg-cyan' : 'bg-white/10'}`} />
          ))}
        </div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <h2 className="text-3xl font-bold tracking-tighter">Identity <span className="text-cyan">Sync</span></h2>
              <p className="text-white/60 text-sm">We need to verify your legal identity to enable high-speed transfers.</p>
              <div className="space-y-4">
                <input className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:border-cyan outline-none" placeholder="Full Legal Name" />
                <input className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:border-cyan outline-none" placeholder="Date of Birth (MM/DD/YYYY)" />
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <h2 className="text-3xl font-bold tracking-tighter">Biometric <span className="text-cyan">Link</span></h2>
              <p className="text-white/60 text-sm">Enable Flash-Lock for transactions over $500. Securely stored on-device.</p>
              <div className="flex justify-center py-12">
                <motion.div 
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="w-24 h-24 rounded-full bg-cobalt/20 flex items-center justify-center border border-cobalt/40"
                >
                  <Fingerprint className="w-12 h-12 text-cyan" />
                </motion.div>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6 text-center"
            >
              <div className="flex justify-center">
                <CheckCircle2 className="w-20 h-20 text-cyan" />
              </div>
              <h2 className="text-3xl font-bold tracking-tighter">Velocity <span className="text-cyan">Ready</span></h2>
              <p className="text-white/60 text-sm">Your account is now active. Welcome to the future of precision banking.</p>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={nextStep}
          disabled={loading}
          className="w-full mt-12 bg-cobalt hover:bg-cobalt/80 text-white font-bold py-4 rounded-2xl shadow-[0_0_20px_rgba(46,91,255,0.3)] transition-all flex items-center justify-center gap-2"
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            step === 3 ? "Enter Dashboard" : "Continue"
          )}
        </button>
      </div>
    </div>
  );
};
