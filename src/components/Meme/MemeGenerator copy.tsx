import React, { useState, useEffect } from 'react';
import { fetchImgflipTemplates, fetchMemegenTemplates, createMemeFromImgflip } from './MemeAPI';

interface ImgflipTemplate {
  id: string;
  name: string;
  url: string;
}

interface MemegenTemplate {
  id: string;
  name: string;
  blank: string;
}

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
  const [currentPage, setCurrentPage] = useState(1);
  const templatesPerPage = 10;

  useEffect(() => {
    const loadTemplates = async () => {
      try {
        const imgflipTemplates: ImgflipTemplate[] = await fetchImgflipTemplates();
        const memegenTemplates: MemegenTemplate[] = await fetchMemegenTemplates();

        const combinedTemplates: MemeTemplate[] = [
          ...imgflipTemplates.map((template) => ({
            id: `imgflip_${template.id}`, // ✅ Unique ID with prefix
            name: template.name,
            url: template.url
          })),
          ...memegenTemplates.map((template) => ({
            id: `memegen_${template.id}`, // ✅ Unique ID with prefix
            name: template.name,
            url: template.blank
          }))
        ];

        setTemplates(combinedTemplates);
      } catch (error) {
        console.error("Error loading meme templates:", error);
      }
    };

    loadTemplates();
  }, []);

  const generateMeme = async () => {
    if (selectedTemplate) {
      const memeUrl = await createMemeFromImgflip(
        selectedTemplate.id.replace("imgflip_", ""), // ✅ Remove prefix before sending request
        topText,
        bottomText,
        process.env.REACT_APP_IMGFLIP_USERNAME!,
        process.env.REACT_APP_IMGFLIP_PASSWORD!
      );
      setGeneratedMeme(memeUrl);
    }
  };

  const totalPages = Math.ceil(templates.length / templatesPerPage);

  const handlePageChange = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const getTemplatesForPage = () => {
    const startIndex = (currentPage - 1) * templatesPerPage;
    const endIndex = Math.min(startIndex + templatesPerPage, templates.length);
    return templates.slice(startIndex, endIndex);
  };

  const currentTemplates = getTemplatesForPage();

  const templateImageStyle = {
    width: '150px',
    height: '150px',
    marginRight: '8px',
    border: '2px solid transparent',
    borderRadius: '4px',
    cursor: 'pointer',
  };

  return (
    <div className="p-6 bg-gray-800 text-white">
      <h2 className="text-4xl font-bold mb-4">🎨 Meme Generator</h2>
      <div className="flex overflow-x-auto h-40 border p-2 mb-4">
        {currentTemplates.map((template) => (
          <div key={template.id} style={templateImageStyle} className="shrink-0 relative">
            <img
              src={template.url}
              alt={template.name}
              className="hover:border-yellow-400 rounded absolute inset-0 w-full h-full object-cover"
              onClick={() => setSelectedTemplate(template)}
            />
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mb-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-l"
        >
          Previous
        </button>

        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => handlePageChange(i + 1)}
            className={`py-2 px-4 border ${
              currentPage === i + 1 ? 'bg-yellow-500 text-white' : 'text-gray-300 hover:bg-gray-700'
            }`}
          >
            {i + 1}
          </button>
        ))}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-r"
        >
          Next
        </button>
      </div>

      {selectedTemplate && (
        <div className="mb-4">
          <p className="font-semibold">Selected Template: {selectedTemplate.name}</p>
          <img src={selectedTemplate.url} alt="Selected Meme" className="max-w-md mb-2" />
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
          <img src={generatedMeme} alt="Generated Meme" className="max-w-md border-2 border-yellow-300 rounded" />
        </div>
      )}
    </div>
  );
};

export default MemeGenerator;


// Next: Implement MemeLeaderboard.tsx and integrate them together into MemePage.tsx.
