import { NextResponse } from "next/server";
import axios from "axios";

// Define the expected API response structure
interface Meme {
  id: string;
  name: string;
  url: string;
}

interface ImgflipResponse {
  success: boolean;
  data: {
    memes: Meme[];
  };
}

export async function GET() {
  try {
    const response = await axios.get<ImgflipResponse>("https://api.imgflip.com/get_memes");

    if (!response.data.success) {
      throw new Error("Failed to fetch memes");
    }

    const memes = response.data.data.memes.map((meme) => ({
      id: meme.id,
      name: meme.name,
      url: meme.url,
    }));

    return NextResponse.json({ memes });
  } catch (error) {
    console.error("Error fetching memes:", error);
    return NextResponse.json({ error: "Failed to fetch memes" }, { status: 500 });
  }
}