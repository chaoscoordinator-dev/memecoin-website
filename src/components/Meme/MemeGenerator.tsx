import React, { useState, useEffect } from "react";
import axios from "axios";

interface Meme {
  id: string;
  name: string;
  url: string;
}

interface ApiResponse {
  memes: Meme[];
}

const MemeGenerator: React.FC = () => {
  const [memes, setMemes] = useState<Meme[]>([]);
  const [selectedMeme, setSelectedMeme] = useState<Meme | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [topText, setTopText] = useState<string>("");
  const [bottomText, setBottomText] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const memesPerPage = 8; // Show 5 memes per page

  useEffect(() => {
    const fetchMemes = async () => {
      try {
        const response = await axios.get<ApiResponse>("/api/memes");
        setMemes(response.data.memes);
      } catch (err) {
        console.error("Failed to fetch memes", err);
        setError("Failed to load memes.");
      } finally {
        setLoading(false);
      }
    };

    fetchMemes();
  }, []);

  const handleMemeSelect = (meme: Meme) => {
    setSelectedMeme(meme);
    setTopText(""); // Reset text inputs
    setBottomText("");
  };

  // Pagination Logic
  const totalPages = Math.ceil(memes.length / memesPerPage);
  const startIndex = (currentPage - 1) * memesPerPage;
  const currentMemes = memes.slice(startIndex, startIndex + memesPerPage);

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  if (loading) return <p>Loading memes...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Pick a Meme Template</h2>

      {/* Meme Templates Container - Horizontal Scrollable Row */}
      <div
        style={{
          display: "flex",
          overflowX: "auto",
          gap: "10px",
          whiteSpace: "nowrap",
          paddingBottom: "10px",
        }}
      >
        {currentMemes.map((meme) => (
          <img
            key={meme.id}
            src={meme.url}
            alt={meme.name}
            width="150"
            height="150"
            style={{
              cursor: "pointer",
              border: selectedMeme?.id === meme.id ? "3px solid blue" : "none",
              flexShrink: 0,
            }}
            onClick={() => handleMemeSelect(meme)}
          />
        ))}
      </div>

      {/* Pagination Controls */}
      <div style={{ marginTop: "10px", textAlign: "center" }}>
        <button
          onClick={goToPreviousPage}
          disabled={currentPage === 1}
          style={{
            marginRight: "10px",
            padding: "5px 10px",
            cursor: currentPage === 1 ? "not-allowed" : "pointer",
          }}
        >
          ◀ Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
          style={{
            marginLeft: "10px",
            padding: "5px 10px",
            cursor: currentPage === totalPages ? "not-allowed" : "pointer",
          }}
        >
          Next ▶
        </button>
      </div>

      {/* Meme Customization Section */}
      {selectedMeme && (
        <div style={{ marginTop: "20px", textAlign: "center" }}>
          <h3>Customize Your Meme</h3>
          <img src={selectedMeme.url} alt="Selected Meme" width="300" />
          <div>
            <input
              type="text"
              placeholder="Top Text"
              value={topText}
              onChange={(e) => setTopText(e.target.value)}
              style={{ margin: "10px", padding: "5px" }}
            />
            <input
              type="text"
              placeholder="Bottom Text"
              value={bottomText}
              onChange={(e) => setBottomText(e.target.value)}
              style={{ margin: "10px", padding: "5px" }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default MemeGenerator;
