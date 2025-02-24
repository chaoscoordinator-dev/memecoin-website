import React, { useState, useEffect, useRef } from "react";
import { fetchImgflipTemplates, fetchMemegenTemplates } from "./MemeAPI";

interface MemeTemplate {
  id: string;
  name: string;
  url: string;
}

const MemeGenerator: React.FC = () => {
  const [templates, setTemplates] = useState<MemeTemplate[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<MemeTemplate | null>(null);
  const [topText, setTopText] = useState("");
  const [bottomText, setBottomText] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const loadTemplates = async () => {
      try {
        const imgflipTemplates = await fetchImgflipTemplates();
        const memegenTemplates = await fetchMemegenTemplates();
  
        const combinedTemplates = [
          ...imgflipTemplates.map((template: any) => ({
            id: `imgflip_${template.id}`,
            name: template.name,
            url: template.url,
          })),
          ...memegenTemplates.map((template: any) => ({
            id: `memegen_${template.id}`,
            name: template.name,
            url: template.blank,
          })),
        ];
  
        // Remove duplicate templates based on ID
        const uniqueTemplates = Array.from(
          new Map(combinedTemplates.map((m) => [m.id, m])).values()
        );
  
        setTemplates(uniqueTemplates);
      } catch (error) {
        console.error("Error loading meme templates:", error);
      }
    };
  
    loadTemplates();
  }, []);

  // Function to generate meme on canvas
  const generateMeme = async () => {
    if (!selectedTemplate) return;
    
    setIsGenerating(true);
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.crossOrigin = "anonymous"; // Allow cross-origin images
    img.src = selectedTemplate.url;

    img.onload = () => {
      // Set canvas size to match image
      canvas.width = img.width;
      canvas.height = img.height;

      // Draw image on canvas
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      // Meme Text Styling
      ctx.font = "bold 40px Impact, sans-serif";
      ctx.fillStyle = "white";
      ctx.strokeStyle = "black";
      ctx.textAlign = "center";
      ctx.lineWidth = 3;

      // Draw top text
      ctx.fillText(topText.toUpperCase(), canvas.width / 2, 50);
      ctx.strokeText(topText.toUpperCase(), canvas.width / 2, 50);

      // Draw bottom text
      ctx.fillText(bottomText.toUpperCase(), canvas.width / 2, canvas.height - 20);
      ctx.strokeText(bottomText.toUpperCase(), canvas.width / 2, canvas.height - 20);

      setIsGenerating(false);
    };
  };

  // Function to download meme
  const downloadMeme = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = "meme.png";
    link.click();
  };

  return (
    <div className="p-6 bg-gray-800 text-white">
      <h2 className="text-4xl font-bold mb-4">🎨 Meme Generator</h2>

      {/* Meme Template Selection */}
      <div className="flex overflow-x-auto h-40 border p-2 mb-4">
        {templates.map((template) => (
          <img
            key={template.id}
            src={template.url}
            alt={template.name}
            className={`w-40 h-40 cursor-pointer border-2 ${
              selectedTemplate?.id === template.id ? "border-yellow-400" : "border-transparent"
            }`}
            onClick={() => setSelectedTemplate(template)}
          />
        ))}
      </div>

      {/* Meme Text Input */}
      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Top Text"
          value={topText}
          onChange={(e) => setTopText(e.target.value)}
          className="p-2 rounded text-black"
        />
        <input
          type="text"
          placeholder="Bottom Text"
          value={bottomText}
          onChange={(e) => setBottomText(e.target.value)}
          className="p-2 rounded text-black"
        />
      </div>

      {/* Generate Meme Button */}
      <button
        className="bg-green-500 px-4 py-2 rounded-lg hover:bg-green-400"
        onClick={generateMeme}
        disabled={!selectedTemplate || isGenerating}
      >
        {isGenerating ? "⏳ Generating..." : "🖼️ Generate Meme"}
      </button>

      {/* Meme Preview (Canvas) */}
      {selectedTemplate && (
        <div className="mt-4">
          <canvas ref={canvasRef} className="border-2 border-yellow-300 rounded w-full max-w-md" />
        </div>
      )}

      {/* Download Meme Button */}
      {selectedTemplate && (
        <button
          className="bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-400 mt-4"
          onClick={downloadMeme}
        >
          ⬇️ Download Meme
        </button>
      )}
    </div>
  );
};

export default MemeGenerator;
