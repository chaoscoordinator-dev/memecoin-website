"use client";

import React, { useState, useEffect } from 'react';
import { Connection, PublicKey, clusterApiUrl } from '@solana/web3.js';
import Leaderboard from './Leaderboard';

const Home: React.FC = () => {
  const [prediction, setPrediction] = useState('');
  const [category, setCategory] = useState('MMA/UFC');
  const [userPredictions, setUserPredictions] = useState<Record<string, string[]>>({});
  const [newPrediction, setNewPrediction] = useState('');
  const [account, setAccount] = useState('');
  const [balance, setBalance] = useState(0);
  const [isEligible, setIsEligible] = useState(false);

  const categories = [
    "MMA/UFC",
    "Football",
    "Music",
    "Film",
    "Crypto/Finance",
    "Gaming",
    "Tech",
    "Space Exploration",
    "Pop Culture",
    "Food"
  ];

  const CHAOS_TOKEN_MINT = "YourSolanaTokenMintAddress";
  const MIN_REQUIRED_BALANCE = 100;

  const connectWallet = async () => {
    try {
      const solana = (window as any).solana;
      if (solana && solana.isPhantom) {
        const response = await solana.connect();
        setAccount(response.publicKey.toString());

        const connection = new Connection(clusterApiUrl('mainnet-beta'), 'confirmed');
        const balanceLamports = await connection.getBalance(new PublicKey(response.publicKey));
        const balanceSol = balanceLamports / 1_000_000_000;
        setBalance(balanceSol);

        setIsEligible(balanceSol >= MIN_REQUIRED_BALANCE);
      } else {
        alert('Phantom Wallet not found. Please install it.');
      }
    } catch (error) {
      console.error("Failed to connect wallet", error);
    }
  };

  const getPrediction = async () => {
    try {
      const response = await fetch('/predictions.json');
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const predictions = await response.json();
      const categoryPredictions = [
        ...(predictions[category] || []),
        ...(userPredictions[category] || [])
      ];
      const randomIndex = Math.floor(Math.random() * categoryPredictions.length);
      setPrediction(categoryPredictions[randomIndex]);
    } catch (error) {
      console.error('Failed to fetch predictions:', error);
      setPrediction('Failed to load predictions. Please try again later.');
    }
  };

  const handlePredictionSubmit = () => {
    if (!newPrediction || !isEligible) return;

    setUserPredictions((prev) => {
      const updated = { ...prev };
      if (!updated[category]) {
        updated[category] = [];
      }
      updated[category].push(newPrediction);
      return updated;
    });

    setNewPrediction('');
  };

  useEffect(() => {
    if (account && balance >= MIN_REQUIRED_BALANCE) {
      setIsEligible(true);
    }
  }, [account, balance]);

  return (
    <div className="bg-black text-white min-h-screen font-sans">
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-purple-700 via-red-600 to-black">
        <h1 className="text-7xl font-extrabold mb-6 animate-pulse">⚡ CHAOS COIN ⚡</h1>
        <p className="text-2xl mb-6">Embrace the Chaos. Get the Coin. 🚀</p>
        <button className="bg-yellow-500 hover:bg-yellow-300 text-black font-bold py-4 px-8 rounded-xl text-2xl shadow-2xl transform hover:scale-110 transition-all">
          🔥 Buy Now
        </button>
      </div>

      {/* Prediction Section */}
      <div className="p-12 text-center bg-purple-800">
        <h2 className="text-5xl font-bold mb-6">🔮 Chaos Predictor</h2>
        <p className="text-xl mb-6">Choose a category and predict the future of Chaos Coin!</p>
        <select
          className="mb-4 p-3 text-black"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        <button
          className="bg-green-500 hover:bg-green-400 text-black font-bold py-4 px-8 rounded-xl text-2xl shadow-2xl transform hover:scale-110 transition-all ml-4"
          onClick={getPrediction}
        >
          🔮 Predict Chaos
        </button>
        {prediction && <p className="mt-6 text-2xl">{prediction}</p>}
      </div>

      {/* Leaderboard Section */}
      <div className="p-12 text-center bg-gray-900">
        <h2 className="text-5xl font-bold mb-6">🏆 Top Chaos Predictors</h2>
        <Leaderboard />
      </div>

      {/* Wallet Connection Section */}
      <div className="p-12 text-center bg-gray-700">
        <h2 className="text-5xl font-bold mb-6">💳 Connect Wallet</h2>
        <button
          className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-4 px-6 rounded-xl"
          onClick={connectWallet}
        >
          🚀 Connect Wallet
        </button>
        {account && (
          <div className="mt-4">
            <p>Connected Wallet: {account}</p>
            <p>Balance: {balance} SOL</p>
            <p>{isEligible ? "✅ Eligible to submit predictions!" : "❌ Not enough SOL tokens"}</p>
          </div>
        )}
      </div>

      {/* User Prediction Submission Section */}
      <div className="p-12 text-center bg-gray-700">
        <h2 className="text-5xl font-bold mb-6">💡 Submit Your Prediction</h2>
        <select
          className="mb-4 p-3 text-black"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        <input
          className="p-3 ml-4 text-black w-80 rounded"
          type="text"
          placeholder="Enter your chaotic prediction"
          value={newPrediction}
          onChange={(e) => setNewPrediction(e.target.value)}
          disabled={!isEligible}
        />
        <button
          className={`ml-4 py-3 px-6 rounded-xl font-bold ${isEligible ? 'bg-blue-500 hover:bg-blue-400 text-white' : 'bg-gray-500 cursor-not-allowed'}`}
          onClick={handlePredictionSubmit}
          disabled={!isEligible}
        >
          ➕ Submit Prediction
        </button>
        {!isEligible && (
          <p className="mt-3 text-red-400">You need at least {MIN_REQUIRED_BALANCE} SOL to submit predictions.</p>
        )}
      </div>
    </div>
  );
};

export default Home;