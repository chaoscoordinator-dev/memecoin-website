import React, { useState } from 'react';
import { Connection, PublicKey, clusterApiUrl } from '@solana/web3.js';
import Leaderboard from './Leaderboard';

const PredictionPage: React.FC = () => {
  const [prediction, setPrediction] = useState('');
  const [category, setCategory] = useState('MMA/UFC');
  const [account, setAccount] = useState('');
  const [balance, setBalance] = useState(0);
  const [userPredictions, setUserPredictions] = useState<Record<string, string[]>>({});
  const [newPrediction, setNewPrediction] = useState('');
  const [isEligible, setIsEligible] = useState(false);

  const categories = [
    "MMA/UFC", "Football", "Music", "Film", "Crypto/Finance", "Gaming", "Tech", "Space Exploration", "Pop Culture", "Food", "F1"
  ];

  const CHAOS_TOKEN_MINT = "YourSolanaTokenMintAddress";
  const MIN_REQUIRED_BALANCE = 0;

  const connectWallet = async () => {
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
  };

  const getPrediction = async () => {
    try {
      const response = await fetch('/predictions.json');
      const predictions = await response.json();
      //const categoryPredictions = predictions[category] || [];
      const categoryPredictions = [
        ...(predictions[category] || []),
        ...(userPredictions[category] || [])
      ];
      const randomIndex = Math.floor(Math.random() * categoryPredictions.length);
      setPrediction(categoryPredictions[randomIndex] || 'No predictions available.');
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

  return (
    <>
      <div className="bg-purple-800 text-white min-h-screen p-12 text-center">
        <h2 className="text-5xl font-bold mb-6">🔮 Chaos Predictor</h2>
        <select className="mb-4 p-3 text-black" value={category} onChange={(e) => setCategory(e.target.value)}>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        <button className="bg-green-500 hover:bg-green-400 text-black font-bold py-4 px-8 rounded-xl text-2xl ml-4" onClick={getPrediction}>
          🔮 Predict Chaos
        </button>
        {prediction && <p className="mt-6 text-2xl">{prediction}</p>}
  
        <h2 className="text-5xl font-bold mt-12 mb-6">🏆 Top Chaos Predictors</h2>
        <Leaderboard />
  
        <h2 className="text-5xl font-bold mt-12 mb-6">💳 Connect Wallet</h2>
        <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-4 px-6 rounded-xl" onClick={connectWallet}>
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
    </>
  );
};

export default PredictionPage;