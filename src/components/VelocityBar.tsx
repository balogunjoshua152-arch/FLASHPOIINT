import React from 'react';
import { Send, Download, CreditCard, QrCode } from 'lucide-react';
import { motion } from 'framer-motion';

const actions = [
  { icon: Send, label: 'Send', color: 'bg-cobalt' },
  { icon: Download, label: 'Request', color: 'bg-white/10' },
  { icon: CreditCard, label: 'Pay Bills', color: 'bg-white/10' },
  { icon: QrCode, label: 'Scan QR', color: 'bg-white/10' },
];

export const VelocityBar = ({ onAction }: { onAction: (label: string) => void }) => {
  return (
    <div className="flex justify-between items-center gap-4 px-4 py-6 overflow-x-auto no-scrollbar">
      {actions.map((action, idx) => (
        <motion.button
          key={action.label}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onAction(action.label)}
          className="flex flex-col items-center gap-2 min-w-[80px]"
        >
          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${action.color} border border-white/5 shadow-lg`}>
            <action.icon className="w-6 h-6 text-white" />
          </div>
          <span className="text-[10px] font-medium uppercase tracking-wider text-white/60">
            {action.label}
          </span>
        </motion.button>
      ))}
    </div>
  );
};
