import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './components/HomePage';
import PredictionPage from './components/PredictionPage';

const App: React.FC = () => {
  return (
    <Router>
      <nav className="bg-black text-white p-4 flex justify-center space-x-6">
        <Link to="/" className="hover:text-yellow-500 text-xl">🏠 Home</Link>
        <Link to="/predictions" className="hover:text-green-500 text-xl">🔮 Predictions</Link>
      </nav>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/predictions" element={<PredictionPage />} />
      </Routes>
    </Router>
  );
};

export default App;