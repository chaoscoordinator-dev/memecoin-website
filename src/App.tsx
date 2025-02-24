import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import PredictionPage from './components/PredictionPage';
import WhitepaperPage from './components/WhitepaperPage';
import MemePage from './components/Meme/MemePage';

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex justify-center">
        <Header />
      </div>
      <nav className="text-center flex justify-center py-4"> {/* Centers the nav items and adds vertical padding */}
  <div className="flex gap-x-12"> {/* Adds spacing between links */}
    <Link to="/" className="hover:text-yellow-400 text-xl font-bold text-white">🏠 Home  </Link>
    <Link to="/predictions" className="hover:text-green-300 text-xl font-bold text-white">🔮 Predictions  </Link>
    <Link to="/memes" className="hover:text-pink-300 text-xl font-bold text-white">🤣 The Meme Pit  </Link>
    <Link to="/whitepaper" className="hover:text-blue-300 text-xl font-bold text-white">📄 Whitepaper  </Link>
  </div>
</nav>

      <main className="min-h-screen bg-gray-900 text-white">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/predictions" element={<PredictionPage />} />
          <Route path="/whitepaper" element={<WhitepaperPage />} />
          <Route path="/memes" element={<MemePage />} />
        </Routes>
      </main>

      <Footer />
    </Router>
  );
};

export default App;

// Required File Structure:
// 📂 src/
// ┣ 📂 components/
// ┃ ┣ 📂 Meme/
// ┃ ┃ ┣ 📜 MemePage.tsx       // Consolidated page for Meme Generator & Leaderboard
// ┃ ┃ ┣ 📜 MemeGenerator.tsx  // Meme creation with templates and uploads
// ┃ ┃ ┣ 📜 MemeLeaderboard.tsx // Meme leaderboard with voting
// ┃ ┃ ┣ 📜 MemeAPI.ts         // Meme template API integration
// ┃ ┃ ┗ 📜 MemeCard.tsx       // Reusable component for displaying memes
// ┃ ┣ 📜 Header.tsx            // Website header with navigation
// ┃ ┣ 📜 Footer.tsx            // Website footer
// ┃ ┣ 📜 HomePage.tsx          // Homepage
// ┃ ┣ 📜 PredictionPage.tsx    // Predictions page
// ┃ ┗ 📜 WhitepaperPage.tsx    // Whitepaper page
// 📜 App.tsx                   // Main routing and layout

// This structure maintains a multi-page site with a single unified Meme section on '/memes'.
