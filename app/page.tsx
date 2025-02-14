import React from 'react';

const Home: React.FC = () => {
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

      {/* About Section */}
      <div className="p-12 text-center bg-gray-900">
        <h2 className="text-5xl font-bold mb-6">🤯 What is Chaos Coin?</h2>
        <p className="text-xl max-w-2xl mx-auto">
          Chaos Coin is the memecoin of unpredictability—crafted for thrill-seekers who live on the edge. No charts, no logic—just chaos and community-driven fun! 🌪️
        </p>
      </div>

      {/* Tokenomics Section */}
      <div className="p-12 text-center bg-gray-800">
        <h2 className="text-5xl font-bold mb-6">📊 Tokenomics</h2>
        <div className="max-w-2xl mx-auto grid grid-cols-2 gap-6 text-lg">
          <p className="mb-3">💰 Total Supply: 1,000,000,000 CHAOS</p>
          <p className="mb-3">🔥 50% Burned at Launch</p>
          <p className="mb-3">🎯 30% Community Airdrop</p>
          <p className="mb-3">⚙️ 20% Liquidity Pool</p>
        </div>
      </div>

      {/* Roadmap Section */}
      <div className="p-12 text-center bg-gray-900">
        <h2 className="text-5xl font-bold mb-6">🛣️ Roadmap to Chaos</h2>
        <div className="max-w-2xl mx-auto text-lg">
          <p className="mb-4">🚀 Q1: Launch and Airdrop</p>
          <p className="mb-4">🐸 Q2: Partner with Meme Communities</p>
          <p className="mb-4">🪙 Q3: Introduce Staking & Rewards</p>
          <p className="mb-4">🌍 Q4: Global Memecoin Domination</p>
        </div>
      </div>

      {/* Join the Chaos Section */}
      <div className="p-12 text-center bg-gradient-to-r from-black via-red-600 to-purple-700">
        <h2 className="text-5xl font-bold mb-6">🎯 Join the Chaos</h2>
        <p className="mb-6 text-xl">Follow us for the latest chaotic updates:</p>
        <div className="flex justify-center gap-6">
          <a href="#" className="text-blue-400 hover:text-blue-300 text-4xl">🐦 Twitter</a>
          <a href="#" className="text-pink-500 hover:text-pink-400 text-4xl">💬 Telegram</a>
          <a href="#" className="text-purple-400 hover:text-purple-300 text-4xl">📸 Instagram</a>
          <a href="#" className="text-green-400 hover:text-green-300 text-4xl">🌐 Discord</a>
        </div>
      </div>
    </div>
  );
};

export default Home;
