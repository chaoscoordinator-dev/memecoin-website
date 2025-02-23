// MemeLeaderboard.tsx (Explicit CSS Fix for Horizontal Layout & Pagination)
import React, { useState, useEffect } from 'react';
import MemeCard from './MemeCard';
import axios from 'axios';

interface Meme {
  id: string;
  imageUrl: string;
  title: string;
  votes: number;
  submittedBy: string;
}

interface MemeApiResponse {
  memes: Meme[];
  totalPages: number;
}

const MEMES_PER_PAGE = 10;
const API_URL = '/api/memes'; // Use proxy for CORS fix

const MemeLeaderboard: React.FC = () => {
  const [memes, setMemes] = useState<Meme[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMemes = async () => {
      try {
        const response = await axios.get<MemeApiResponse>(
          `${API_URL}?page=${currentPage}&limit=${MEMES_PER_PAGE}`
        );
        setMemes(response.data.memes);
        setTotalPages(response.data.totalPages);
      } catch (err) {
        if ((err as any)?.response) {
          console.error('❌ Axios Response Error:', (err as any).response.data);
          setError('Failed to load memes. Please try again later.');
        } else if ((err as any)?.request) {
          console.error('❌ Network Error: No response received from server.');
          setError('Network error. Please check your connection.');
        } else {
          console.error('❌ Error:', err);
          setError('An unexpected error occurred.');
        }
      }
    };
    fetchMemes();
  }, [currentPage]);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="bg-gray-800 text-white p-6 rounded">
      <h2 className="text-4xl font-bold mb-4">🏆 Meme Leaderboard</h2>
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="overflow-x-auto whitespace-nowrap flex gap-4 p-4 border-b border-gray-700">
          {memes.map((meme, index) => (
            <div key={`${meme.id}-${index}`} className="inline-block w-40">
              <MemeCard meme={meme} onVote={() => {}} />
            </div>
          ))}
        </div>
      )}
      <div className="flex justify-center items-center space-x-4 mt-4">
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className="bg-yellow-500 px-4 py-2 rounded shadow disabled:opacity-50"
        >◀️ Prev</button>
        <span className="text-lg font-bold">Page {currentPage} / {totalPages}</span>
        <button
          onClick={handleNext}
          disabled={currentPage >= totalPages}
          className="bg-yellow-500 px-4 py-2 rounded shadow disabled:opacity-50"
        >Next ▶️</button>
      </div>
    </div>
  );
};

export default MemeLeaderboard;