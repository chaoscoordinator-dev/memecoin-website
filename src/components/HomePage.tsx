import React from 'react';

const HomePage: React.FC = () => {
  return (
    <div className="bg-black text-white min-h-screen font-sans">
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-purple-700 via-red-600 to-black">
        <h1 className="text-7xl font-extrabold mb-6 animate-pulse">⚡ CHAOS ⚡</h1>
        <p className="text-2xl mb-6">Embrace the Chaos. Get the Coin. SEND IT! 🚀</p>
        <button className="bg-yellow-500 hover:bg-yellow-300 text-black font-bold py-4 px-8 rounded-xl text-2xl shadow-2xl transform hover:scale-110 transition-all">
          🔥 Buy Now
        </button>
      </div>


      {/* About Section */}
      <div className="p-12 text-center bg-gray-900 text-white">
        <h2 className="text-5xl font-bold mb-6">🤯 What is $SENDIT?</h2>
        <p className="text-xl max-w-2xl mx-auto">
        $SendIt isn’t just another token—it’s a <strong>movement</strong>. A <strong>decentralized, community-driven experiment</strong> in chaos, culture, and virality. Built on the belief that <strong>memes</strong> are the true universal language of the internet, $SendIt is more than just a coin; it’s a <strong>gamified ecosystem</strong> where humor, speculation, and <strong>degenerate energy</strong> fuel the fire.
        </p>
        <p className="text-xl max-w-2xl mx-auto mt-4">
        At its core, $SendIt is designed for those who <strong>live for the rush</strong>—whether it’s <strong>sending it</strong> in the markets, <strong>sending it</strong> in the meme wars, or <strong>sending it</strong> in the culture of internet <strong>degeneracy</strong>. With a <strong>token economy</strong> that rewards <strong>participation, engagement, and creativity</strong>, $SendIt is the <strong>intersection of meme culture and crypto</strong>, where the only rule is: <strong>send it or fade into irrelevance.</strong> 🌪️
        </p>
      </div>


      {/* Roadmap Section */}
      <div className="p-12 text-center bg-gray-900 text-white">
        <h2 className="text-5xl font-bold mb-6">🛣️ How to Dominate The Meme Pit</h2>
        <div className="max-w-2xl mx-auto text-lg">
          
          <p className="text-xl font-bold mb-2"> 1️⃣ Create & Send It</p>
          <p className="mb-4">
          🔥 Use the <strong>Meme Generator</strong> to craft legendary $SendIt memes or embrace the chaos with the <strong>Random Meme Generator</strong>.
          </p>

          <p className="text-xl font-bold mb-2">2️⃣ Battle for Clout</p>
          <p className="mb-4">
          ⚔️  Enter <strong>Meme Battles</strong>, take on other degenerates, and let the community decide who reigns supreme.
          </p>

          <p className="text-xl font-bold mb-2"> 3️⃣ Climb the Leaderboards</p>
          <p className="mb-4">
          📈 Earn <strong>Chaos Points</strong> by creating memes, winning battles, and racking up upvotes. <strong>Top degens</strong> rise, weak memes fall.
          </p>

          <p className="text-xl font-bold mb-2"> 4️⃣ Earn Rewards & Badges</p>
          <p className="mb-4">
          🏆 Unlock <strong>Chaos Badges</strong> and claim <strong>Send It Tokens</strong> for proving your meme mastery.
          </p>

          <p className="text-xl font-bold mb-2"> 5️⃣ Shape the Future</p>
          <p className="mb-4">
          🗳️ <strong>Meme Lords & Badge Holders</strong> decide what happens next. Vote on new features, challenges, and events—<strong>chaos is democracy</strong>.
          </p>

        </div>
      </div>

      {/* Call to Action */}
      <div className="p-12 text-center bg-gradient-to-r from-black via-red-600 to-purple-700">
        <h2 className="text-5xl font-bold mb-6">🎯 Join the Chaos</h2>
        <p className="mb-6 text-xl">Follow us for the latest chaotic updates:</p>
        <div className="flex justify-center gap-6">
          <a href="#" className="text-blue-400 hover:text-blue-300 text-4xl">🐦 Twitter</a>
          <a href="#" className="text-pink-500 hover:text-pink-400 text-4xl">💬 Telegram</a>
          <a href="#" className="text-purple-400 hover:text-purple-300 text-4xl">📸 Instagram</a>
          <a href="#" className="text-green-400 hover:text-green-300 text-4xl">🌐 TikTok</a>
        </div>
      </div>
    </div>
  );
};

export default HomePage;