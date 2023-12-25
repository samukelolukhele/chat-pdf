import { loadPdfIntoPinecone } from "@/lib/db/pinecone";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {
  try {
    const body = await req.json();
    const { file_url } = body;
    const pages = await loadPdfIntoPinecone(file_url);

    return NextResponse.json({ pages });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
