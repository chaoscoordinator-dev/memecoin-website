// MemePage.tsx (Unified Meme Generator & Leaderboard Page)
import React from 'react';
import MemeGenerator from './MemeGenerator';
import MemeLeaderboard from './MemeLeaderboard';

const MemePage: React.FC = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen p-6">
      <h1 className="text-5xl font-bold text-center mb-6">🤣 Meme Zone</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Meme Generator on Left, Leaderboard on Right */}
        <MemeGenerator />
        <MemeLeaderboard />
      </div>
    </div>
  );
};

export default MemePage;

// This completes the full Meme section!
// - MemeGenerator: Fetches templates, allows customization, user uploads.
// - MemeLeaderboard: Displays user-created memes and supports voting.
// - MemeCard: Reusable component for meme display.
// - MemeAPI: Handles external meme template APIs.
// Next: Final integration checks in App.tsx and styling improvements.
