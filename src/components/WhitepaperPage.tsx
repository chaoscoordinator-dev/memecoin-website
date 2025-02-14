import React from 'react';

const WhitepaperPage: React.FC = () => {
  return (
    <div className="bg-black text-white min-h-screen p-12 font-sans">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-6xl font-extrabold mb-10 text-center animate-pulse">📄 Chaos Coin Whitepaper</h1>

        <section className="mb-8">
          <h2 className="text-4xl font-bold mb-4">🌪️ Introduction</h2>
          <p className="text-lg leading-relaxed">
            Chaos Coin is the memecoin of unpredictability, built for thrill-seekers who thrive on randomness. 
            No charts, no rules—just pure, chaotic fun in a decentralized community-driven ecosystem.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-4xl font-bold mb-4">🔍 Vision & Mission</h2>
          <p className="text-lg leading-relaxed">
            Our vision is to become the leading memecoin in the realm of unpredictability. 
            We aim to engage users through interactive predictions, token-gated utilities, and a vibrant community.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-4xl font-bold mb-4">📊 Tokenomics</h2>
          <ul className="list-disc list-inside text-lg">
            <li>💰 Total Supply: 1,000,000,000 CHAOS</li>
            <li>🔥 50% Burned at Launch</li>
            <li>🎯 30% Community Airdrop</li>
            <li>⚙️ 20% Liquidity Pool</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-4xl font-bold mb-4">🎯 Roadmap</h2>
          <ul className="list-decimal list-inside text-lg">
            <li>🚀 Q1: Token Launch & Community Building</li>
            <li>🐸 Q2: Partnerships with Meme Communities</li>
            <li>🪙 Q3: Launch Token-Gated Prediction System</li>
            <li>🌎 Q4: Expand Globally with New Utilities</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-4xl font-bold mb-4">🔮 Prediction System</h2>
          <p className="text-lg leading-relaxed">
            Our core utility revolves around a prediction game where users stake predictions on events across multiple categories.
            Accurate predictions reward participants with leaderboard recognition and potential community incentives.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-4xl font-bold mb-4">🤝 Community & Governance</h2>
          <p className="text-lg leading-relaxed">
            Chaos Coin is a community-first project. Token holders can propose and vote on major developments to steer the project’s future.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-4xl font-bold mb-4">📞 Join the Chaos</h2>
          <p className="text-lg leading-relaxed">
            Be part of the most unpredictable journey in crypto. Join our Discord, follow us on Twitter, and spread the chaos!
          </p>
        </section>
      </div>
    </div>
  );
};

export default WhitepaperPage;
