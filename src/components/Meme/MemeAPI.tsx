import axios from 'axios';

const IMGFLIP_API_URL = 'https://api.imgflip.com/get_memes';
const MEMEGEN_API_URL = 'https://api.memegen.link/templates';

interface ImgflipTemplate {
  id: string;
  name: string;
  url: string;
}

interface ImgflipResponse {
  success: boolean;
  data: { memes: ImgflipTemplate[] };
}

interface MemegenTemplate {
  id: string;
  name: string;
  blank: string;
}

// Fetch meme templates from Imgflip API
export const fetchImgflipTemplates = async (): Promise<ImgflipTemplate[]> => {
  try {
    const { data } = await axios.get<ImgflipResponse>(IMGFLIP_API_URL);
    return data.success ? data.data.memes : [];
  } catch (error) {
    console.error('❌ Error fetching Imgflip templates:', error);
    return [];
  }
};

// Fetch meme templates from Memegen.link API
export const fetchMemegenTemplates = async (): Promise<MemegenTemplate[]> => {
  try {
    const { data } = await axios.get<MemegenTemplate[]>(MEMEGEN_API_URL);
    return data;
  } catch (error) {
    console.error('❌ Error fetching Memegen.link templates:', error);
    return [];
  }
};

// Create meme using Imgflip API
export const createMemeFromImgflip = async (
  templateId: string,
  topText: string,
  bottomText: string,
  username: string,
  password: string
): Promise<string | null> => {
  const API_URL = 'https://api.imgflip.com/caption_image';

  try {
    const { data } = await axios.post<{ success: boolean; data?: { url: string } }>(
      API_URL,
      null,
      {
        params: {
          template_id: templateId,
          text0: topText,
          text1: bottomText,
          username,
          password,
        },
      }
    );

    if (!data.success || !data.data?.url) {
      console.error(`❌ Failed to create meme on Imgflip:`, data);
      return null;
    }

    return data.data.url;
  } catch (error) {
    console.error('❌ Error creating meme on Imgflip:', error);
    return null;
  }
};