import React, { useState, useEffect, useCallback } from 'react';
import { io, Socket } from 'socket.io-client';
import { AnimatePresence, motion } from 'framer-motion';
import { LogoText } from './components/Logo';
import { FlashBalance } from './components/FlashBalance';
import { VelocityBar } from './components/VelocityBar';
import { TransactionFeed, Transaction } from './components/TransactionFeed';
import { Navigation } from './components/Navigation';
import { KYCProcess } from './components/KYC';
import { Vault } from './components/Vault';
import { Bell, User, Search, X } from 'lucide-react';

export default function App() {
  const [isKYCComplete, setIsKYCComplete] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [showFlash, setShowFlash] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [showSendModal, setShowSendModal] = useState(false);
  const [sendAmount, setSendAmount] = useState('');
  const [sendTo, setSendTo] = useState('');

  useEffect(() => {
    const newSocket = io();
    setSocket(newSocket);

    newSocket.on('balanceUpdate', (data: { balance: number }) => {
      setBalance(data.balance);
      setIsUpdating(true);
      setTimeout(() => setIsUpdating(false), 2000);
    });

    newSocket.on('newTransaction', (tx: Transaction) => {
      setTransactions(prev => [tx, ...prev]);
    });

    // Initial fetch
    fetch('/api/balance').then(res => res.json()).then(data => setBalance(data.balance));
    fetch('/api/transactions').then(res => res.json()).then(data => setTransactions(data));

    return () => {
      newSocket.close();
    };
  }, []);

  const handleTransaction = async () => {
    if (!sendAmount || !sendTo) return;
    
    setShowSendModal(false);
    setShowFlash(true); // Trigger the "Flash" animation
    
    const response = await fetch('/api/transaction', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: sendAmount, to: sendTo, type: 'send' })
    });
    
    if (response.ok) {
      setSendAmount('');
      setSendTo('');
      setTimeout(() => setShowFlash(false), 1000);
    }
  };

  const handleAction = (label: string) => {
    if (label === 'Send') setShowSendModal(true);
  };

  if (!isKYCComplete) {
    return <KYCProcess onComplete={() => setIsKYCComplete(true)} />;
  }

  return (
    <div className="min-h-screen bg-obsidian text-white max-w-md mx-auto relative overflow-hidden">
      {/* Header */}
      <header className="flex justify-between items-center p-6">
        <LogoText />
        <div className="flex gap-4">
          <button className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors">
            <Search className="w-5 h-5 text-white/60" />
          </button>
          <button className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors relative">
            <Bell className="w-5 h-5 text-white/60" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-cyan rounded-full" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="pb-24">
        <AnimatePresence mode="wait">
          {activeTab === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <FlashBalance balance={balance} isUpdating={isUpdating} />
              <VelocityBar onAction={handleAction} />
              <TransactionFeed transactions={transactions} />
            </motion.div>
          )}

          {activeTab === 'vaults' && (
            <motion.div
              key="vaults"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Vault />
            </motion.div>
          )}

          {activeTab === 'cards' && (
            <motion.div
              key="cards"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="p-6 space-y-6"
            >
              <h2 className="text-2xl font-bold tracking-tighter">My <span className="text-cyan">Cards</span></h2>
              <div className="aspect-[1.58/1] w-full bg-gradient-to-br from-cobalt to-cyan/40 rounded-3xl p-6 relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 p-6">
                  <LogoText />
                </div>
                <div className="mt-12">
                  <p className="text-xs text-white/60 uppercase tracking-widest">Flash Platinum</p>
                  <p className="text-xl font-mono mt-1 tracking-widest">•••• •••• •••• 8842</p>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 flex justify-between items-end">
                  <div>
                    <p className="text-[10px] text-white/40 uppercase">Card Holder</p>
                    <p className="text-sm font-bold uppercase tracking-wider">Joshua Flourish</p>
                  </div>
                  <div className="flex gap-1">
                    <div className="w-8 h-8 rounded-full bg-white/20" />
                    <div className="w-8 h-8 rounded-full bg-white/20 -ml-4" />
                  </div>
                </div>
              </div>
              
              <div className="glass p-6 rounded-3xl space-y-4">
                <h3 className="font-bold text-sm uppercase tracking-widest text-white/40">Card Controls</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Freeze Card</span>
                    <div className="w-12 h-6 bg-white/10 rounded-full relative">
                      <div className="absolute left-1 top-1 w-4 h-4 bg-white/40 rounded-full" />
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Online Payments</span>
                    <div className="w-12 h-6 bg-cyan/20 rounded-full relative">
                      <div className="absolute right-1 top-1 w-4 h-4 bg-cyan rounded-full" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Navigation */}
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Flash Animation Overlay */}
      <AnimatePresence>
        {showFlash && (
          <div className="streak" />
        )}
      </AnimatePresence>

      {/* Send Modal */}
      <AnimatePresence>
        {showSendModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-obsidian/90 backdrop-blur-md flex items-end"
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              className="w-full bg-obsidian border-t border-white/10 rounded-t-[40px] p-8 space-y-6"
            >
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold tracking-tighter">Flash <span className="text-cyan">Transfer</span></h2>
                <button onClick={() => setShowSendModal(false)} className="p-2 bg-white/5 rounded-full">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-white/40 ml-1">Recipient</label>
                  <input 
                    value={sendTo}
                    onChange={(e) => setSendTo(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white focus:border-cyan outline-none" 
                    placeholder="Username or Account #" 
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-white/40 ml-1">Amount</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan font-mono text-xl">$</span>
                    <input 
                      type="number"
                      value={sendAmount}
                      onChange={(e) => setSendAmount(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 pl-10 text-white font-mono text-xl focus:border-cyan outline-none" 
                      placeholder="0.00" 
                    />
                  </div>
                </div>
              </div>

              <button
                onClick={handleTransaction}
                className="w-full bg-cobalt hover:bg-cobalt/80 text-white font-bold py-4 rounded-2xl shadow-[0_0_20px_rgba(46,91,255,0.3)] transition-all"
              >
                Execute Flash Transfer
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
