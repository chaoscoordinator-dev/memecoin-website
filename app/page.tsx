import React from 'react';

const Home: React.FC = () => {
  return (
    <div className="bg-black text-white min-h-screen font-sans">
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-purple-700 via-red-600 to-black">
        <h1 className="text-6xl font-extrabold mb-4 animate-bounce">⚡ CHAOS COIN ⚡</h1>
        <p className="text-xl mb-6">Embrace the Chaos. Get the Coin.</p>
        <button className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-3 px-6 rounded-xl text-xl shadow-lg">
          🚀 Buy Now
        </button>
      </div>

      {/* About Section */}
      <div className="p-10 text-center bg-gray-900">
        <h2 className="text-4xl font-bold mb-4">🤯 What is Chaos Coin?</h2>
        <p className="text-lg max-w-xl mx-auto">
          Chaos Coin is the memecoin of unpredictability—designed for those who thrive on excitement. No charts, no rules—just chaos. 🌪️
        </p>
      </div>

      {/* Tokenomics Section */}
      <div className="p-10 text-center bg-gray-800">
        <h2 className="text-4xl font-bold mb-4">📊 Tokenomics</h2>
        <div className="max-w-xl mx-auto">
          <p className="mb-3">💰 Total Supply: 1,000,000,000 CHAOS</p>
          <p className="mb-3">🔥 50% Burned 🔥</p>
          <p className="mb-3">🎯 30% Community Airdrop</p>
          <p className="mb-3">⚙️ 20% Liquidity</p>
        </div>
      </div>

      {/* Roadmap Section */}
      <div className="p-10 text-center bg-gray-900">
        <h2 className="text-4xl font-bold mb-4">🛣️ Roadmap to Chaos</h2>
        <div className="max-w-xl mx-auto">
          <p className="mb-3">🚀 Q1: Launch the Chaos</p>
          <p className="mb-3">🐸 Q2: Partner with meme legends</p>
          <p className="mb-3">🪙 Q3: Staking & Rewards</p>
          <p className="mb-3">🌍 Q4: Global Chaos Community</p>
        </div>
      </div>

      {/* Call to Action */}
      <div className="p-10 text-center bg-gradient-to-r from-black via-red-600 to-purple-700">
        <h2 className="text-4xl font-bold mb-4">🎯 Join the Chaos</h2>
        <p className="mb-4">Follow us for more chaotic updates:</p>
        <div className="flex justify-center gap-6">
          <a href="#" className="text-blue-400 hover:text-blue-300 text-3xl">🐦 Twitter</a>
          <a href="#" className="text-pink-500 hover:text-pink-400 text-3xl">💬 Telegram</a>
          <a href="#" className="text-purple-400 hover:text-purple-300 text-3xl">📸 Instagram</a>
        </div>
      </div>
    </div>
  );
};

export default Home;