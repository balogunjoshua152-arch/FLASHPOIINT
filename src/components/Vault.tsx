import React from 'react';
import { motion } from 'framer-motion';
import { Shield, TrendingUp, Lock } from 'lucide-react';

export const Vault = () => {
  return (
    <div className="px-4 py-8 space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold tracking-tighter">The <span className="text-cyan">Vault</span></h2>
        <p className="text-white/40 text-xs uppercase tracking-widest">High-Interest Precision Storage</p>
      </div>

      <div className="relative h-64 flex items-center justify-center perspective-1000">
        <motion.div
          animate={{ rotateY: [0, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="relative w-48 h-48 preserve-3d"
        >
          {/* 3D Vault Visualization (Simplified with CSS) */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-3xl flex items-center justify-center shadow-2xl backdrop-blur-sm">
            <div className="w-32 h-32 rounded-full border-8 border-white/10 flex items-center justify-center">
              <div className="w-24 h-24 rounded-full border-4 border-cyan/40 flex items-center justify-center">
                <Lock className="w-10 h-10 text-cyan" />
              </div>
            </div>
          </div>
          
          {/* Floating particles */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ 
                y: [0, -20, 0],
                opacity: [0, 1, 0]
              }}
              transition={{ 
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2
              }}
              className="absolute w-1 h-1 bg-cyan rounded-full"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </motion.div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="glass p-4 rounded-2xl space-y-1">
          <p className="text-[10px] text-white/40 uppercase font-bold tracking-wider">Current APY</p>
          <p className="text-2xl font-mono font-bold text-cyan">5.25%</p>
        </div>
        <div className="glass p-4 rounded-2xl space-y-1">
          <p className="text-[10px] text-white/40 uppercase font-bold tracking-wider">Vault Balance</p>
          <p className="text-2xl font-mono font-bold text-white">$42,000</p>
        </div>
      </div>

      <div className="glass p-6 rounded-3xl space-y-4">
        <div className="flex items-center gap-3">
          <TrendingUp className="text-cyan w-5 h-5" />
          <h3 className="font-bold">Growth Projection</h3>
        </div>
        <p className="text-sm text-white/60">Your vault is projected to earn <span className="text-cyan font-mono">$2,205.00</span> in interest this year with zero risk.</p>
        <button className="w-full bg-white/10 hover:bg-white/20 text-white font-bold py-3 rounded-xl transition-colors">
          Deposit to Vault
        </button>
      </div>
    </div>
  );
};
