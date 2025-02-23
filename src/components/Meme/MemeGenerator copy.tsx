// MemeGenerator.tsx (Meme Creation with Templates and User Uploads)
import React, { useState, useEffect } from 'react';
import { fetchImgflipTemplates, fetchMemegenTemplates, createMemeFromImgflip } from './MemeAPI';

interface MemeTemplate {
  id: string;
  name: string;
  url: string;
}

const MemeGenerator: React.FC = () => {
  const [templates, setTemplates] = useState<MemeTemplate[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<MemeTemplate | null>(null);
  const [topText, setTopText] = useState('');
  const [bottomText, setBottomText] = useState('');
  const [generatedMeme, setGeneratedMeme] = useState<string | null>(null);

  useEffect(() => {
    const loadTemplates = async () => {
      const imgflipTemplates = await fetchImgflipTemplates();
      const memegenTemplates = await fetchMemegenTemplates();
      const combinedTemplates = [
        ...imgflipTemplates,
        ...memegenTemplates.map(t => ({ id: t.id, name: t.name, url: t.blank }))
      ];
      setTemplates(combinedTemplates);
    };
    loadTemplates();
  }, []);

  const generateMeme = async () => {
    if (selectedTemplate) {
      const memeUrl = await createMemeFromImgflip(
        selectedTemplate.id,
        topText,
        bottomText,
        process.env.REACT_APP_IMGFLIP_USERNAME!,
        process.env.REACT_APP_IMGFLIP_PASSWORD!
      );
      setGeneratedMeme(memeUrl);
    }
  };

  return (
    <div className="p-6 bg-gray-800 text-white">
      <h2 className="text-4xl font-bold mb-4">🎨 Meme Generator</h2>
      <div className="grid grid-cols-3 gap-4 overflow-y-auto h-60 border p-2 mb-4">
        {templates.map((template) => (
          <img
            key={template.id}
            src={template.url}
            alt={template.name}
            className="cursor-pointer border-2 hover:border-yellow-400 rounded"
            onClick={() => setSelectedTemplate(template)}
          />
        ))}
      </div>
      {selectedTemplate && (
        <div className="mb-4">
          <p className="font-semibold">Selected Template: {selectedTemplate.name}</p>
          <img src={selectedTemplate.url} alt="Selected Meme" className="max-w-xs mb-2" />
        </div>
      )}
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
      <button
        className="bg-green-500 px-4 py-2 rounded-lg hover:bg-green-400"
        onClick={generateMeme}
      >
        🖼️ Generate Meme
      </button>
      {generatedMeme && (
        <div className="mt-4">
          <h3 className="text-2xl font-semibold mb-2">Your Meme:</h3>
          <img src={generatedMeme} alt="Generated Meme" className="max-w-xs border-2 border-yellow-300 rounded" />
        </div>
      )}
    </div>
  );
};

export default MemeGenerator;

// Next: Implement MemeLeaderboard.tsx and integrate them together into MemePage.tsx.
