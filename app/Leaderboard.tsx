"use client";

import React, { useState, useEffect } from "react";

interface Predictor {
  wallet: string;
  predictions: number;
  correct: number;
  accuracy: number;
  category: string;
  lastPrediction: string;
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

const Leaderboard: React.FC = () => {
  const [leaderboard, setLeaderboard] = useState<Predictor[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("MMA/UFC");
  const [sortBy, setSortBy] = useState<"accuracy" | "predictions">("accuracy");

  useEffect(() => {
    // Simulate fetching leaderboard data
    const sampleData: Predictor[] = [
      { wallet: "7Gh1...3HqT", predictions: 30, correct: 20, accuracy: 66.7, category: "Football", lastPrediction: "2025-02-14" },
      { wallet: "4Tx2...4XyZ", predictions: 50, correct: 35, accuracy: 70.0, category: "MMA/UFC", lastPrediction: "2025-02-13" },
      { wallet: "1Ab3...5CdE", predictions: 40, correct: 28, accuracy: 70.0, category: "Music", lastPrediction: "2025-02-12" },
      { wallet: "5Fx7...6GfH", predictions: 25, correct: 18, accuracy: 72.0, category: "Film", lastPrediction: "2025-02-11" }
    ];
    setLeaderboard(sampleData);
  }, []);

  const filteredLeaderboard = leaderboard
    .filter((p) => p.category === selectedCategory)
    .sort((a, b) => (sortBy === "accuracy" ? b.accuracy - a.accuracy : b.predictions - a.predictions));

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <h2 className="text-4xl font-bold mb-6 text-center">🏆 Chaos Predictor Leaderboard 🏆</h2>

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

      {/* Sort Selection */}
      <div className="mb-6 text-center">
        <label className="mr-4">Sort by:</label>
        <select
          className="p-2 text-black"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as "accuracy" | "predictions")}
        >
          <option value="accuracy">Accuracy (%)</option>
          <option value="predictions">Total Predictions</option>
        </select>
      </div>

      {/* Leaderboard Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-center border border-gray-700">
          <thead className="bg-purple-700">
            <tr>
              <th className="py-2 px-4">Rank</th>
              <th className="py-2 px-4">Wallet</th>
              <th className="py-2 px-4">Total Predictions</th>
              <th className="py-2 px-4">Correct Predictions</th>
              <th className="py-2 px-4">Accuracy (%)</th>
              <th className="py-2 px-4">Last Prediction</th>
            </tr>
          </thead>
          <tbody>
            {filteredLeaderboard.length > 0 ? (
              filteredLeaderboard.map((user, index) => (
                <tr key={user.wallet} className="border-b border-gray-600 hover:bg-gray-800">
                  <td className="py-2 px-4">{index + 1}</td>
                  <td className="py-2 px-4">{user.wallet}</td>
                  <td className="py-2 px-4">{user.predictions}</td>
                  <td className="py-2 px-4">{user.correct}</td>
                  <td className="py-2 px-4">{user.accuracy.toFixed(2)}</td>
                  <td className="py-2 px-4">{user.lastPrediction}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="py-4 text-gray-400">No predictions yet for this category.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Call to Action */}
      <div className="text-center mt-6">
        <p className="text-xl">Think you can predict better? Submit your prediction today! 🔮</p>
      </div>
    </div>
  );
};

export default Leaderboard;