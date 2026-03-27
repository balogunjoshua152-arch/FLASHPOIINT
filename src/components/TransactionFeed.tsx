import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDownLeft } from 'lucide-react';

export interface Transaction {
  id: number;
  type: 'send' | 'receive';
  amount: number;
  to?: string;
  from?: string;
  date: string;
  status: string;
}

export const TransactionFeed = ({ transactions }: { transactions: Transaction[] }) => {
  return (
    <div className="px-4 pb-24">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-sm font-bold uppercase tracking-widest text-white/40">Recent Velocity</h3>
        <button className="text-xs text-cyan font-medium">View All</button>
      </div>
      
      <div className="space-y-3">
        {transactions.map((tx, idx) => (
          <motion.div
            key={tx.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="glass p-4 rounded-2xl flex items-center justify-between group hover:bg-white/10 transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${tx.type === 'receive' ? 'bg-cyan/20 text-cyan' : 'bg-white/5 text-white/60'}`}>
                {tx.type === 'receive' ? <ArrowDownLeft className="w-5 h-5" /> : <ArrowUpRight className="w-5 h-5" />}
              </div>
              <div>
                <p className="font-bold text-sm text-white">
                  {tx.type === 'receive' ? tx.from : tx.to}
                </p>
                <p className="text-[10px] text-white/40 font-mono uppercase">
                  {new Date(tx.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
            
            <div className="text-right">
              <p className={`font-mono font-bold ${tx.type === 'receive' ? 'text-cyan' : 'text-white'}`}>
                {tx.type === 'receive' ? '+' : '-'}${tx.amount.toFixed(2)}
              </p>
              <p className="text-[9px] text-white/30 uppercase tracking-tighter">
                {tx.status}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
