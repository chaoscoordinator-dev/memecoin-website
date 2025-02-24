import React from "react";

const Header: React.FC = () => (
  <header className="relative w-full bg-gray-900 text-white py-6 px-6 text-center flex flex-col items-center shadow-lg">
    
    {/* Title with Animated Effect */}
    <h1 className="text-5xl md:text-6xl font-extrabold tracking-wide mb-4 animate-pulse">
      💀 SEND IT OR FADE 💀
    </h1>

    {/* Subtitle */}
    <p className="text-lg md:text-2xl max-w-3xl font-medium mb-6">
      The ultimate <strong>meme battleground</strong> where only the **most unhinged degens** survive.
    </p>

  </header>
);

export default Header; // ✅ Ensure this line exists