import React from 'react';

const WhitepaperPage: React.FC = () => {
  return (
    <div className="bg-black text-white min-h-screen p-12 font-sans">
      <div className="max-w-4xl mx-auto">

        {/* Title */}
        <section className="mb-12 text-center">
          <h1 className="text-6xl font-extrabold mb-10 animate-pulse">📄 The Meme Pit Whitepaper</h1>
        </section>

        {/* Introduction */}
        <section className="mb-24">
          <h2 className="text-5xl font-bold mb-6">🔥 Introduction</h2>
          <p className="text-lg leading-relaxed mb-8">
            Memes are the heartbeat of degeneracy, and in the world of <span className="text-purple-400">$SendIt</span>, we don’t just share memes—we live and breathe them. Welcome to The Meme Pit, a chaotic, gamified meme ecosystem where degeneracy, creativity, and competition collide. This isn’t just a feature—it’s the next evolution of meme culture, built for true degens who understand that memes aren’t just jokes—they’re currency.
          </p>
        </section>

        {/* Core Features */}
        <section className="mb-24">
          <h2 className="text-5xl font-bold mb-6">🚀 Core Features</h2>
          <div className="ml-6">
            <h3 className="text-3xl font-semibold mb-4">🎨 Meme Generator</h3>
            <p className="text-lg leading-relaxed mb-8">
              Users can create custom <span className="text-purple-400">$SendIt</span> memes using a database of raw meme assets—templates, iconic reaction images, and more. A drag-and-drop editor allows for easy customization, making meme creation effortless for both experienced degenerates and first-time meme warriors.
            </p>
            <h3 className="text-3xl font-semibold mb-4">🤖 Auto-Generated Meme Scenarios</h3>
            <p className="text-lg leading-relaxed mb-8">
              A text generator will produce multiple meme-worthy “Send It” scenarios for users to insert into their memes. This ensures that even the most brain-dead degens can participate in meme warfare without breaking a sweat.
            </p>
            <h3 className="text-3xl font-semibold mb-4">🎲 Random Meme Generator</h3>
            <p className="text-lg leading-relaxed mb-8">
              Users can click a button to generate a random meme combo using text & images already present in the database. The more chaotic and unhinged, the better. Some will be meme gold, others will be absolute abominations—that’s the risk of pure degeneracy.
            </p>
          </div>
        </section>

        {/* On-Chain Meme Identity */}
        <section className="mb-24">
          <h2 className="text-5xl font-bold mb-6">🔗 On-Chain Meme Identity</h2>
          <div className="ml-6">
            <h3 className="text-3xl font-semibold mb-4">👤 Personal Meme Profile</h3>
            <p className="text-lg leading-relaxed mb-8">
              Every user gets an on-chain profile tracking their meme contributions, interactions, and overall degeneracy. Your profile is your meme identity—a proof of degeneracy that follows you across the ecosystem.
            </p>
            <h3 className="text-3xl font-semibold mb-4">🏅 Meme Pit Badges</h3>
            <p className="text-lg leading-relaxed mb-4">
              A badge system ranks users based on their activity, unlocking higher levels of degeneracy. Users earn Chaos Points by:
            </p>
            <ul className="list-disc list-inside text-lg mb-8">
              <li>Creating memes</li>
              <li>Getting likes/interactions</li>
              <li>Winning meme battles</li>
              <li>Participating in raids</li>
            </ul>
            <p className="text-lg leading-relaxed mb-8">
              The more chaos you cause, the higher your status.
            </p>
            <table className="w-full border-collapse border border-gray-700 text-lg mb-8">
              <thead>
                <tr className="bg-purple-700">
                  <th className="border border-gray-600 p-2">Badge</th>
                  <th className="border border-gray-600 p-2">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr><td className="border border-gray-600 p-2">🏆 Meme Overlord</td><td className="border border-gray-600 p-2">The undisputed king of degeneracy</td></tr>
                <tr><td className="border border-gray-600 p-2">🚀 Full Send Commander</td><td className="border border-gray-600 p-2">No hesitation, max send energy</td></tr>
                <tr><td className="border border-gray-600 p-2">👑 Degen God</td><td className="border border-gray-600 p-2">Only the most chaotic reach this level</td></tr>
                <tr><td className="border border-gray-600 p-2">⚔️ The Raiding Menace</td><td className="border border-gray-600 p-2">Unstoppable in meme raids</td></tr>
                <tr><td className="border border-gray-600 p-2">🎯 Shill Assassin</td><td className="border border-gray-600 p-2">Deadly with shill tactics</td></tr>
                <tr><td className="border border-gray-600 p-2">🦍 Ape Supreme</td><td className="border border-gray-600 p-2">No thoughts, just send it</td></tr>
                <tr><td className="border border-gray-600 p-2">🎨 Meme Sniper</td><td className="border border-gray-600 p-2">Always drops the perfect meme at the right time</td></tr>
                <tr><td className="border border-gray-600 p-2">🔮 Chaos Prophet</td><td className="border border-gray-600 p-2">Predicts the next viral meme trend</td></tr>
                <tr><td className="border border-gray-600 p-2">⚡ Send Master</td><td className="border border-gray-600 p-2">Leads the charge in degeneracy</td></tr>
                <tr><td className="border border-gray-600 p-2">🔥 Degen Cultist</td><td className="border border-gray-600 p-2">Spreads the <span className="text-purple-400">$SendIt</span> gospel</td></tr>
                <tr><td className="border border-gray-600 p-2">📈 Pump Chaser</td><td className="border border-gray-600 p-2">Lives for the green candles</td></tr>
                <tr><td className="border border-gray-600 p-2">🧙‍♂️ Meme Sorcerer</td><td className="border border-gray-600 p-2">Crafts memes so powerful they shake the internet</td></tr>
                <tr><td className="border border-gray-600 p-2">🤖 The Algorithm Breaker</td><td className="border border-gray-600 p-2">Gets banned for posting too hard</td></tr>
                <tr><td className="border border-gray-600 p-2">🌀 Meta Shifter</td><td className="border border-gray-600 p-2">Changes the meme game with innovation</td></tr>
                <tr><td className="border border-gray-600 p-2">🏴‍☠️ Rug Survivor</td><td className="border border-gray-600 p-2">Too battle-tested to ever get shaken</td></tr>
                <tr><td className="border border-gray-600 p-2">🌕 Moon Prophet</td><td className="border border-gray-600 p-2">Calls the send before anyone else</td></tr>
                <tr><td className="border border-gray-600 p-2">💀 Top Degen</td><td className="border border-gray-600 p-2">Pure, reckless, and fearless</td></tr>
                <tr><td className="border border-gray-600 p-2">🎖️ Meme General</td><td className="border border-gray-600 p-2">Leads the meme army to battle</td></tr>
                <tr><td className="border border-gray-600 p-2">🛠️ Chaos Engineer</td><td className="border border-gray-600 p-2">Builds unhinged meme strategies</td></tr>
                <tr><td className="border border-gray-600 p-2">🌟 Degen Icon</td><td className="border border-gray-600 p-2">A living legend in The Meme Pit</td></tr>
              </tbody>
            </table>
            <h3 className="text-3xl font-semibold mb-4">📊 Leaderboards</h3>
            <ul className="list-disc list-inside text-lg mb-8">
              <li>True Degen Leaderboard: Who is the most unhinged, most active memelord of The Meme Pit?</li>
              <li>Degen Memes Leaderboard: Which memes are currently dominating The Pit?</li>
              <li>Competition Leaderboard: Track the best performers in meme battles & challenges.</li>
            </ul>
          </div>
        </section>

        {/* Recognition & Rewards */}
        <section className="mb-24">
          <h2 className="text-5xl font-bold mb-6">🏅 Recognition & Rewards</h2>
          <div className="ml-6">
            <h3 className="text-3xl font-semibold mb-4">🖼️ Meme of the Month</h3>
            <p className="text-lg leading-relaxed mb-8">
              The best meme of the month is immortalized in <span className="text-purple-400">$SendIt</span> history and possibly turned into an NFT. Winners get clout, bragging rights, and rewards (TBD based on community input).
            </p>
            <h3 className="text-3xl font-semibold mb-4">🏅 Degen of the Month</h3>
            <p className="text-lg leading-relaxed mb-8">
              The most active and chaotic meme creator gets honored, shilled, and rewarded. Only the truest of degens can claim this title.
            </p>
          </div>
        </section>

        {/* Community & Governance */}
        <section className="mb-24">
          <h2 className="text-5xl font-bold mb-6">🗳️ Community & Governance: Degens Rule Here</h2>
          <p className="text-lg leading-relaxed mb-8">
            <span className="text-purple-400">$SendIt</span> is nothing without its degens, and The Meme Pit is built for the community, by the community. We believe in full degen governance, which means <span className="text-purple-400">YOU</span> get to influence how the meme battleground evolves.
          </p>
          <h3 className="text-3xl font-semibold mb-4">🔥 How Community Governance Works:</h3>
          <ul className="list-disc list-inside text-lg mb-8">
            <li>Proposal System: Any user with a chaos badge can propose new features, meme challenges, or upgrades.</li>
            <li>Voting Mechanism: The top meme raiders, leaderboard champions, and badge holders get voting power on major developments.</li>
            <li>Degen-Led Events: Community-driven competitions, new meme formats, and chaos-fueled decisions.</li>
          </ul>
          <h3 className="text-3xl font-semibold mb-4">💀 Who Decides?</h3>
          <ul className="list-disc list-inside text-lg mb-8">
            <li>Meme Lords & Badge Holders – The most engaged and legendary users get the loudest voice.</li>
            <li>Top Raiders & Shillers – Those who contribute to <span className="text-purple-400">$SendIt’s</span> reach get a say in shaping its future.</li>
            <li>The Unhinged Majority – Because in a true degen ecosystem, chaos is democracy.</li>
          </ul>
          <p className="text-lg leading-relaxed mb-8">
            This isn’t just a meme platform—it’s a movement. A decentralized, unfiltered, fully degenerate meme empire where the loudest, most active, and most chaotic voices <span className="text-purple-400">WIN</span>.
          </p>
        </section>

        {/* Future Expansion */}
        <section className="mb-24">
          <h2 className="text-5xl font-bold mb-6">🔮 Future Expansion</h2>
          <p className="text-lg leading-relaxed mb-8">
            In the near future, all activities within The Meme Pit will require Send It tokens, creating intrinsic utility and driving demand. This integration will ensure that every interaction, competition, and reward system contributes to the growth and sustainability of the token, reinforcing its value within the ecosystem.
          </p>
          <h3 className="text-3xl font-semibold mb-4">🖼️ NFT Integrations</h3>
          <p className="text-lg leading-relaxed mb-8">
            Memes deserve to be immortalized. Eventually, top-tier memes may be minted into NFTs, giving creators true ownership over their degeneracy. A potential meme marketplace could allow users to trade legendary memes.
          </p>
          <h3 className="text-3xl font-semibold mb-4">📱 Social Hub for Degens</h3>
          <p className="text-lg leading-relaxed mb-8">
            A dedicated space for Senders to build their meme-following and connect with fellow degenerate minds. Users can follow, like, comment, and interact beyond just memes.
          </p>
        </section>

        {/* Why This Matters */}
        <section className="mb-24">
          <h2 className="text-5xl font-bold mb-6">🤔 Why This Matters</h2>
          <p className="text-lg leading-relaxed mb-8">
            Memes aren’t just jokes—they are fuel for viral movements. The most successful memecoins have communities driven by meme culture. The Meme Pit gamifies this process, turning engagement into rewards, and memes into a battleground.
          </p>
        </section>

        {/* Conclusion */}
        <section className="mb-24">
          <h2 className="text-5xl font-bold mb-6">🏁 Conclusion: Welcome to The Meme Pit</h2>
          <p className="text-lg leading-relaxed mb-8">
            If you’ve made it this far, you’re either a true degen or you’ve accidentally stumbled into something you don’t understand—but now can’t ignore. Either way, The Meme Pit is here, and it’s about to change everything. Degens, prepare for battle. Now go send it. 🚀🔥
          </p>
        </section>

        {/* Join The Meme Revolution */}
        <section className="text-center">
          <h2 className="text-5xl font-bold mb-6">📢 Join The Meme Revolution</h2>
          <p className="text-lg leading-relaxed mb-8">
            Be part of the internet’s greatest meme movement. Follow us, vote, create, and own the meme economy.
          </p>
          <div className="flex justify-center gap-6">
            <a href="#" className="text-blue-400 hover:text-blue-300 text-4xl">🐦 Twitter</a>
            <a href="#" className="text-pink-500 hover:text-pink-400 text-4xl">💬 Telegram</a>
            <a href="#" className="text-purple-400 hover:text-purple-300 text-4xl">📸 Instagram</a>
            <a href="#" className="text-green-400 hover:text-green-300 text-4xl">🌐 Discord</a>
          </div>
        </section>

      </div>
    </div>
  );
};

export default WhitepaperPage;
