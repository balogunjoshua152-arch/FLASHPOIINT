import React from 'react';
import { motion } from 'framer-motion';

interface FlashBalanceProps {
  balance: number;
  isUpdating?: boolean;
}

export const FlashBalance: React.FC<FlashBalanceProps> = ({ balance, isUpdating }) => {
  const formattedBalance = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(balance);

  const [integer, decimal] = formattedBalance.split('.');

  return (
    <div className="flex flex-col items-center justify-center py-12">
      <motion.p 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-cyan/60 text-xs font-mono uppercase tracking-[0.2em] mb-2"
      >
        Available Flash Balance
      </motion.p>
      
      <div className="relative">
        <motion.div
          key={balance}
          initial={{ scale: 0.95, opacity: 0.8 }}
          animate={{ scale: 1, opacity: 1 }}
          className={`text-6xl md:text-8xl font-mono font-bold tracking-tighter flex items-baseline ${isUpdating ? 'flash-pulse' : ''}`}
        >
          <span className="text-white">{integer}</span>
          <span className="text-cyan text-4xl md:text-5xl">.{decimal}</span>
        </motion.div>
        
        {/* Subtle glow effect */}
        <div className="absolute inset-0 bg-cyan/10 blur-3xl -z-10 rounded-full" />
      </div>
    </div>
  );
};
