import React from 'react';
import { Home, CreditCard, Zap, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

const navItems = [
  { icon: Home, label: 'Home', id: 'home' },
  { icon: CreditCard, label: 'Cards', id: 'cards' },
  { icon: Zap, label: 'FlashPay', id: 'flashpay' },
  { icon: ShieldCheck, label: 'Vaults', id: 'vaults' },
];

export const Navigation = ({ activeTab, onTabChange }: { activeTab: string, onTabChange: (id: string) => void }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 z-40">
      <div className="max-w-md mx-auto glass rounded-3xl p-2 flex justify-around items-center shadow-2xl">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className="relative flex flex-col items-center p-3 group"
          >
            {activeTab === item.id && (
              <motion.div
                layoutId="nav-active"
                className="absolute inset-0 bg-cobalt/20 rounded-2xl -z-10"
                transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
              />
            )}
            <item.icon className={`w-6 h-6 transition-colors ${activeTab === item.id ? 'text-cyan' : 'text-white/40 group-hover:text-white/60'}`} />
            <span className={`text-[9px] mt-1 font-bold uppercase tracking-tighter ${activeTab === item.id ? 'text-white' : 'text-white/20'}`}>
              {item.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
