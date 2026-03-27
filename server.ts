import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import path from "path";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const httpServer = createServer(app);
  const io = new Server(httpServer);
  const PORT = 3000;

  app.use(express.json());

  // Mock Database State
  let balance = 12450.85;
  const transactions = [
    { id: 1, type: 'receive', amount: 450.00, from: 'Alice Chen', date: new Date().toISOString(), status: 'completed' },
    { id: 2, type: 'send', amount: 120.50, to: 'Starbucks', date: new Date(Date.now() - 86400000).toISOString(), status: 'completed' },
    { id: 3, type: 'send', amount: 1200.00, to: 'Rent Corp', date: new Date(Date.now() - 172800000).toISOString(), status: 'completed' },
  ];

  // API Endpoints
  app.get("/api/balance", (req, res) => {
    res.json({ balance });
  });

  app.get("/api/transactions", (req, res) => {
    res.json(transactions);
  });

  app.post("/api/transaction", (req, res) => {
    const { amount, to, type } = req.body;
    
    // Simulate processing
    setTimeout(() => {
      const newTx = {
        id: transactions.length + 1,
        type: type || 'send',
        amount: parseFloat(amount),
        to: to || 'Unknown',
        date: new Date().toISOString(),
        status: 'completed'
      };
      
      if (type === 'receive') {
        balance += newTx.amount;
      } else {
        balance -= newTx.amount;
      }
      
      transactions.unshift(newTx);
      
      // Notify all clients via WebSocket
      io.emit("balanceUpdate", { balance });
      io.emit("newTransaction", newTx);
      
      res.json({ success: true, transaction: newTx });
    }, 500); // Fast processing simulation
  });

  // SQL Schema Documentation (as requested)
  /*
  -- SQL Schema for FLASHPOINT
  
  CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    kyc_status VARCHAR(50) DEFAULT 'pending', -- pending, verified, rejected
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE accounts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    account_type VARCHAR(50) NOT NULL, -- checking, savings, vault
    balance DECIMAL(20, 2) DEFAULT 0.00,
    currency VARCHAR(3) DEFAULT 'USD',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    sender_account_id UUID REFERENCES accounts(id),
    receiver_account_id UUID REFERENCES accounts(id),
    amount DECIMAL(20, 2) NOT NULL,
    type VARCHAR(50) NOT NULL, -- transfer, bill_pay, deposit
    status VARCHAR(50) DEFAULT 'pending', -- pending, completed, failed
    reference_id TEXT UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE ledger (
    id BIGSERIAL PRIMARY KEY,
    account_id UUID REFERENCES accounts(id),
    transaction_id UUID REFERENCES transactions(id),
    amount_delta DECIMAL(20, 2) NOT NULL,
    balance_after DECIMAL(20, 2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
  );

  -- Indexing for performance
  CREATE INDEX idx_transactions_sender ON transactions(sender_account_id);
  CREATE INDEX idx_transactions_receiver ON transactions(receiver_account_id);
  CREATE INDEX idx_ledger_account ON ledger(account_id);
  */

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  io.on("connection", (socket) => {
    console.log("Client connected");
    socket.emit("balanceUpdate", { balance });
  });

  httpServer.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
