"use client";

import React, { useState, useEffect } from "react";
import { Connection, PublicKey, clusterApiUrl, Transaction, SystemProgram, Keypair } from '@solana/web3.js';
import CryptoJS from "crypto-js";
import confetti from 'canvas-confetti';

interface Prediction {
  id: string;
  text: string;
  category: string;
  votes: number;
  submittedBy: string;
  isWinner?: boolean;
  badges?: string[];
}

const categories = [
  "MMA/UFC", "Football", "Music", "Film", 
  "Crypto/Finance", "Gaming", "Tech", 
  "Space Exploration", "Pop Culture", "Food"
];

const REWARD_AMOUNT = 100;

// Environment variable guard
const getEnvVar = (key: string): string => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing environment variable: ${key}`);
  }
  return value;
};

const CommunityLeaderboard: React.FC = () => {
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("MMA/UFC");

  const decryptPrivateKey = () => {
    const encryptedKey = getEnvVar("ENCRYPTED_PRIVATE_KEY");
    const passphrase = getEnvVar("KEY_PASSPHRASE");
    const bytes = CryptoJS.AES.decrypt(encryptedKey, passphrase);
    const decryptedKey = bytes.toString(CryptoJS.enc.Utf8);
    return Uint8Array.from(JSON.parse(decryptedKey));
  };

  const sendTokenReward = async (winnerWallet: string) => {
    try {
      const connection = new Connection(getEnvVar("NEXT_PUBLIC_SOLANA_RPC_URL"), 'confirmed');
      const senderKeypair = Keypair.fromSecretKey(decryptPrivateKey());
      const recipientPublicKey = new PublicKey(winnerWallet);
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: senderKeypair.publicKey,
          toPubkey: recipientPublicKey,
          lamports: REWARD_AMOUNT * 1_000_000_000,
        })
      );
      const signature = await connection.sendTransaction(transaction, [senderKeypair]);
      alert(`🎯 ${REWARD_AMOUNT} CHAOS tokens sent to ${winnerWallet}!\nTransaction: ${signature}`);
    } catch (error) {
      console.error("Failed to send reward:", error);
      alert("⚠️ Failed to send reward. Check console for details.");
    }
  };

  const calculateBadges = (prediction: Prediction): string[] => {
    const badges: string[] = [];

    const maxVotes = Math.max(...predictions.map((p) => p.votes));
    if (prediction.votes === maxVotes) {
      badges.push('Chaos Prophet 🧙‍♂️');
    }

    if (prediction.votes >= 50) {
      badges.push('Memelord 🎭');
    }

    const predictionDate = new Date(prediction.id);
    const currentDate = new Date();
    const oneMonthMs = 30 * 24 * 60 * 60 * 1000;
    if ((currentDate.getTime() - predictionDate.getTime()) < oneMonthMs && prediction.votes >= 30) {
      badges.push('Rising Star 🌟');
    }

    if (prediction.text.toLowerCase().includes('whale') || prediction.text.toLowerCase().includes('crypto')) {
      badges.push('Whale Whisperer 🐳');
    }

    const userPredictions = predictions.filter(p => p.submittedBy === prediction.submittedBy);
    const hotStreak = userPredictions.filter(p => p.votes >= 40).length >= 3;
    if (hotStreak) {
      badges.push('Hot Streak 🔥');
    }

    return badges;
  };

  useEffect(() => {
    const currentMonth = new Date().getMonth();
    const lastReset = localStorage.getItem('lastResetMonth');

    if (lastReset !== String(currentMonth)) {
      const winner = predictions.reduce((max, p) => (p.votes > max.votes ? p : max), predictions[0]);

      if (winner) {
        setPredictions((prev) =>
          prev.map((p) => (p.id === winner.id ? { ...p, isWinner: true } : p))
        );

        confetti({
          particleCount: 200,
          spread: 70,
          origin: { y: 0.6 },
        });

        localStorage.setItem('winner', JSON.stringify(winner));
        sendTokenReward(winner.submittedBy);
        alert(`🎉 Prediction of the Month: "${winner.text}" by ${winner.submittedBy}!`);

        setPredictions((prev) => prev.map((p) => ({ ...p, votes: 0 })));
        localStorage.setItem('lastResetMonth', String(currentMonth));
      }
    }
  }, [predictions]);

  useEffect(() => {
    const badgeHistory = JSON.parse(localStorage.getItem('badgeHistory') || '{}');

    predictions.forEach((p) => {
      const badges = calculateBadges(p);
      if (badges.length > 0) {
        if (!badgeHistory[p.submittedBy]) {
          badgeHistory[p.submittedBy] = [];
        }

        badges.forEach((badge) => {
          if (!badgeHistory[p.submittedBy].includes(badge)) {
            badgeHistory[p.submittedBy].push(badge);
          }
        });
      }
    });

    localStorage.setItem('badgeHistory', JSON.stringify(badgeHistory));
  }, [predictions]);

  useEffect(() => {
    const initialPredictions: Prediction[] = [
      { id: "1", text: "Chaos Coin becomes the currency of Mars!", category: "Space Exploration", votes: 78, submittedBy: "7Gh1...3HqT" },
      { id: "2", text: "Elon Musk tweets about Chaos Coin!", category: "Tech", votes: 60, submittedBy: "4Tx2...4XyZ" },
      { id: "3", text: "McGregor partners with Chaos Coin!", category: "MMA/UFC", votes: 32, submittedBy: "5Fx7...6GfH" },
      { id: "4", text: "Taylor Swift releases ChaosCoin Anthem!", category: "Music", votes: 28, submittedBy: "6Zy5...3SdQ" }
    ];
    setPredictions(initialPredictions);
  }, []);

  const filteredPredictions = predictions
    .filter((p) => p.category === selectedCategory)
    .sort((a, b) => b.votes - a.votes);

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <h2 className="text-4xl font-bold mb-6 text-center animate-bounce">🏆 Community-Powered Leaderboard 🏆</h2>

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

      <div className="overflow-x-auto">
        <table className="w-full text-center border border-gray-700">
          <thead className="bg-purple-700">
            <tr>
              <th className="py-2 px-4">Rank</th>
              <th className="py-2 px-4">Prediction</th>
              <th className="py-2 px-4">Submitted By</th>
              <th className="py-2 px-4">Votes</th>
              <th className="py-2 px-4">Badges</th>
              <th className="py-2 px-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredPredictions.length > 0 ? (
              filteredPredictions.map((p, index) => {
                const badges = calculateBadges(p);
                return (
                  <tr key={p.id} className={`border-b border-gray-600 hover:bg-gray-800 ${p.isWinner ? 'bg-yellow-400 text-black animate-pulse' : ''}`}>
                    <td className="py-2 px-4">{index + 1}</td>
                    <td className="py-2 px-4">{p.text}</td>
                    <td className="py-2 px-4">{p.submittedBy}</td>
                    <td className="py-2 px-4">{p.votes}</td>
                    <td className="py-2 px-4">
                      {badges.length > 0 ? badges.map((badge, idx) => (
                        <span key={idx} className="inline-block bg-gradient-to-r from-green-400 to-blue-500 text-white px-3 py-1 m-1 rounded-lg animate-spin">
                          {badge}
                        </span>
                      )) : '—'}
                    </td>
                    <td className="py-2 px-4">{p.isWinner ? "🏆 Winner" : "🏃 Ongoing"}</td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={6} className="py-4 text-gray-400">No predictions yet for this category.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="text-center mt-6">
        <p className="text-xl">Vote for your favorite predictions and help decide the future of Chaos Coin! 🔮</p>
      </div>

      <div className="p-6 text-center bg-yellow-500 text-black font-bold mt-4 animate-pulse">
        <h3 className="text-3xl mb-4">🏆 Prediction of the Month 🏆</h3>
        {localStorage.getItem('winner') ? (
          <div>
            <p className="text-xl">🎯 {JSON.parse(localStorage.getItem('winner')!).text}</p>
            <p className="mt-2">👤 Winner: {JSON.parse(localStorage.getItem('winner')!).submittedBy}</p>
          </div>
        ) : (
          <p className="text-xl">🤔 No winner announced yet. Keep voting!</p>
        )}
      </div>
    </div>
  );
};

export default CommunityLeaderboard;
