import React, { useState, useEffect, useRef } from "react";
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
  const [topText, setTopText] = useState<string>("");
  const [bottomText, setBottomText] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const memesPerPage = 5;
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const fetchMemes = async () => {
      try {
        const response = await axios.get<ApiResponse>("/api/memes");
        setMemes(response.data.memes);
      } catch (err) {
        console.error("Failed to fetch memes", err);
      }
    };

    fetchMemes();
  }, []);

  const handleMemeSelect = (meme: Meme) => {
    setSelectedMeme(meme);
    setTopText("");
    setBottomText("");
    setTimeout(() => drawMeme(meme, "", ""), 100); // Initial blank meme
  };

  const drawMeme = (meme: Meme, topText: string, bottomText: string) => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = meme.url;

    img.onload = () => {
      canvas.width = img.width / 2;
      canvas.height = img.height / 2;

      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      ctx.font = "bold 24px Arial";
      ctx.fillStyle = "white";
      ctx.strokeStyle = "black";
      ctx.lineWidth = 3;
      ctx.textAlign = "center";

      // Top Text
      ctx.strokeText(topText.toUpperCase(), canvas.width / 2, 30);
      ctx.fillText(topText.toUpperCase(), canvas.width / 2, 30);

      // Bottom Text
      ctx.strokeText(bottomText.toUpperCase(), canvas.width / 2, canvas.height - 20);
      ctx.fillText(bottomText.toUpperCase(), canvas.width / 2, canvas.height - 20);
    };
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>, position: "top" | "bottom") => {
    const newText = e.target.value;
    if (position === "top") {
      setTopText(newText);
    } else {
      setBottomText(newText);
    }

    if (selectedMeme) {
      drawMeme(selectedMeme, position === "top" ? newText : topText, position === "bottom" ? newText : bottomText);
    }
  };

  const downloadMeme = () => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = "custom-meme.png";
    link.click();
  };

  const copyMeme = async () => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    canvas.toBlob((blob) => {
      if (blob) {
        navigator.clipboard.write([
          new ClipboardItem({ "image/png": blob })
        ]);
        alert("Meme copied to clipboard!");
      }
    });
  };

  const totalPages = Math.ceil(memes.length / memesPerPage);
  const startIndex = (currentPage - 1) * memesPerPage;
  const currentMemes = memes.slice(startIndex, startIndex + memesPerPage);

  return (
    <div>
      <h2>Pick a Meme Template</h2>

      {/* Meme Templates - Horizontal Scroll */}
      <div style={{ display: "flex", overflowX: "auto", gap: "10px", whiteSpace: "nowrap", paddingBottom: "10px" }}>
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
        <button onClick={() => setCurrentPage((p) => Math.max(1, p - 1))} disabled={currentPage === 1}>
          ◀ Previous
        </button>
        <span> Page {currentPage} of {totalPages} </span>
        <button onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}>
          Next ▶
        </button>
      </div>

      {/* Meme Customization */}
      {selectedMeme && (
        <div style={{ marginTop: "20px", textAlign: "center" }}>
          <h3>Customize Your Meme</h3>
          <canvas ref={canvasRef} style={{ border: "1px solid black" }}></canvas>
          
          {/* Text Input Fields - Ensure Users See What They Type */}
          <div style={{ marginTop: "10px" }}>
            <input
              type="text"
              placeholder="Top Text"
              value={topText}
              onChange={(e) => handleTextChange(e, "top")}
              style={{
                width: "250px",
                padding: "8px",
                textAlign: "center",
                fontSize: "16px",
                border: "1px solid gray",
                backgroundColor: "#fff",
                color: "#000",
                marginBottom: "10px",
              }}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Bottom Text"
              value={bottomText}
              onChange={(e) => handleTextChange(e, "bottom")}
              style={{
                width: "250px",
                padding: "8px",
                textAlign: "center",
                fontSize: "16px",
                border: "1px solid gray",
                backgroundColor: "#fff",
                color: "#000",
                marginBottom: "10px",
              }}
            />
          </div>

          {/* Buttons to Download and Copy Meme */}
          <div>
            <button onClick={downloadMeme} style={{ margin: "10px", padding: "10px", cursor: "pointer" }}>
              ⬇ Download Meme
            </button>
            <button onClick={copyMeme} style={{ margin: "10px", padding: "10px", cursor: "pointer" }}>
              📋 Copy Meme
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MemeGenerator;
