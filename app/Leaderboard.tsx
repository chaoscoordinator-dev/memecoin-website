"use client";

import React, { useState, useEffect } from "react";
import { Connection, PublicKey, clusterApiUrl } from '@solana/web3.js';

interface Prediction {
  id: string;
  text: string;
  category: string;
  votes: number;
  submittedBy: string;
}

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
  "Food",
];

const CHAOS_TOKEN_MINT = "YourChaosTokenMintAddress";
const MIN_REQUIRED_BALANCE = 100; // Minimum CHAOS balance to vote

const CommunityLeaderboard: React.FC = () => {
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("MMA/UFC");
  const [votedWallets, setVotedWallets] = useState<Record<string, Set<string>>>({});
  const [wallet, setWallet] = useState<string | null>(null);

  // Connect Phantom wallet
  const connectWallet = async () => {
    const solana = (window as any).solana;
    if (solana && solana.isPhantom) {
      try {
        const response = await solana.connect();
        setWallet(response.publicKey.toString());
        alert(`✅ Wallet connected: ${response.publicKey.toString()}`);
      } catch (error) {
        console.error("Wallet connection failed:", error);
      }
    } else {
      alert("⚠️ Phantom wallet not found. Please install it.");
    }
  };

  // Check CHAOS token balance
  const checkChaosBalance = async (walletAddress: string) => {
    const connection = new Connection(clusterApiUrl('mainnet-beta'), 'confirmed');
    const balance = await connection.getBalance(new PublicKey(walletAddress));
    const solBalance = balance / 1_000_000_000;
    return solBalance >= MIN_REQUIRED_BALANCE;
  };

  // Handle voting with checks
  const handleVote = async (id: string) => {
    if (!wallet) {
      alert("❌ Connect your wallet first!");
      return;
    }

    // Check token balance
    const eligible = await checkChaosBalance(wallet);
    if (!eligible) {
      alert('❌ You need at least 100 CHAOS tokens to vote!');
      return;
    }

    // Check if wallet has already voted
    if (votedWallets[id]?.has(wallet)) {
      alert('⚠️ You have already voted for this prediction!');
      return;
    }

    // Update votes
    setPredictions((prev) =>
      prev.map((p) => (p.id === id ? { ...p, votes: p.votes + 1 } : p))
    );

    // Track that this wallet voted
    setVotedWallets((prev) => {
      const updated = { ...prev };
      if (!updated[id]) updated[id] = new Set();
      updated[id].add(wallet);
      return updated;
    });

    alert(`🎉 Voted successfully for prediction ID: ${id}!`);
  };

  // Reset votes monthly
  useEffect(() => {
    const currentMonth = new Date().getMonth();
    const lastReset = localStorage.getItem('lastResetMonth');

    if (lastReset !== String(currentMonth)) {
      setPredictions((prev) => prev.map((p) => ({ ...p, votes: 0 })));
      localStorage.setItem('lastResetMonth', String(currentMonth));
      alert('🗓️ Leaderboard has been reset for the new month!');
    }
  }, []);

  // Simulate predictions
  useEffect(() => {
    const initialPredictions: Prediction[] = [
      { id: "1", text: "Chaos Coin becomes the currency of Mars!", category: "Space Exploration", votes: 35, submittedBy: "7Gh1...3HqT" },
      { id: "2", text: "Elon Musk tweets about Chaos Coin!", category: "Tech", votes: 42, submittedBy: "4Tx2...4XyZ" },
      { id: "3", text: "McGregor partners with Chaos Coin!", category: "MMA/UFC", votes: 50, submittedBy: "1Ab3...5CdE" },
      { id: "4", text: "Taylor Swift releases ChaosCoin Anthem!", category: "Music", votes: 28, submittedBy: "5Fx7...6GfH" }
    ];
    setPredictions(initialPredictions);
  }, []);

  const filteredPredictions = predictions
    .filter((p) => p.category === selectedCategory)
    .sort((a, b) => b.votes - a.votes);

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <h2 className="text-4xl font-bold mb-6 text-center">🏆 Community-Powered Leaderboard 🏆</h2>

      {/* Wallet Connect */}
      <div className="text-center mb-6">
        <button
          className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-3 px-6 rounded-xl"
          onClick={connectWallet}
        >
          🚀 Connect Wallet
        </button>
        {wallet && <p className="mt-3">Connected: {wallet}</p>}
      </div>

      {/* Category Selection */}
      <div className="mb-4 text-center">
        <label className="mr-4">Select Category:</label>
        <select
          className="p-2 text-black"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* Leaderboard Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-center border border-gray-700">
          <thead className="bg-purple-700">
            <tr>
              <th className="py-2 px-4">Rank</th>
              <th className="py-2 px-4">Prediction</th>
              <th className="py-2 px-4">Submitted By</th>
              <th className="py-2 px-4">Votes</th>
              <th className="py-2 px-4">Vote</th>
            </tr>
          </thead>
          <tbody>
            {filteredPredictions.length > 0 ? (
              filteredPredictions.map((p, index) => (
                <tr key={p.id} className="border-b border-gray-600 hover:bg-gray-800">
                  <td className="py-2 px-4">{index + 1}</td>
                  <td className="py-2 px-4">{p.text}</td>
                  <td className="py-2 px-4">{p.submittedBy}</td>
                  <td className="py-2 px-4">{p.votes}</td>
                  <td className="py-2 px-4">
                    <button
                      className="bg-green-500 hover:bg-green-400 text-black font-bold py-2 px-4 rounded-lg"
                      onClick={() => handleVote(p.id)}
                    >
                      👍 Vote
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="py-4 text-gray-400">No predictions yet for this category.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Call to Action */}
      <div className="text-center mt-6">
        <p className="text-xl">Vote for your favorite predictions and help decide the future of Chaos Coin! 🔮</p>
      </div>
    </div>
  );
};

export default CommunityLeaderboard;
