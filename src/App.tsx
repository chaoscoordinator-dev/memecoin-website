import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './components/HomePage';
import PredictionPage from './components/PredictionPage';
import WhitepaperPage from './components/WhitepaperPage';

const App: React.FC = () => {
  return (
    <Router>
      <nav className="bg-gradient-to-r from-purple-700 via-red-600 to-black text-white p-6 flex justify-center space-x-32 shadow-xl border-b-4 border-purple-500">
        <Link to="/" className="hover:text-yellow-400 text-2xl font-extrabold uppercase tracking-wide">🏠 Home</Link>
        <Link to="/predictions" className="hover:text-green-300 text-2xl font-extrabold uppercase tracking-wide">🔮 Predictions</Link>
        <Link to="/whitepaper" className="hover:text-blue-300 text-2xl font-extrabold uppercase tracking-wide">📄 Whitepaper</Link>
      </nav>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/predictions" element={<PredictionPage />} />
        <Route path="/whitepaper" element={<WhitepaperPage />} />
      </Routes>
    </Router>
  );
};

export default App;
