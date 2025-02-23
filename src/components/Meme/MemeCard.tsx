// MemeCard.tsx (Reusable Card Component for Memes)
import React from 'react';

interface MemeCardProps {
  meme: {
    id: string;
    imageUrl: string;
    title: string;
    votes: number;
    submittedBy: string;
  };
  onVote: () => void;
}

const MemeCard: React.FC<MemeCardProps> = ({ meme, onVote }) => (
  <div className="border rounded-lg p-4 bg-gray-700 text-white shadow-lg">
    <img src={meme.imageUrl} alt={meme.title} className="w-full rounded mb-2" />
    <h3 className="text-lg font-bold mb-1">{meme.title}</h3>
    <p className="text-sm">Submitted by: {meme.submittedBy}</p>
    <p className="text-lg font-semibold">❤️ {meme.votes} votes</p>
    <button
      onClick={onVote}
      className="bg-yellow-500 text-black px-4 py-2 mt-2 rounded hover:bg-yellow-400"
    >
      👍 Vote
    </button>
  </div>
);

export default MemeCard;