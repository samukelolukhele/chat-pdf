import { Pinecone } from "@pinecone-database/pinecone";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { downloadFromFirebase } from "../firebase/storage-server";

let pinecone: Pinecone | null = null;

export const getPineconeClient = async () => {
  if (!pinecone) {
    pinecone = new Pinecone({
      environment: process.env.NEXT_PUBLIC_PINECONEDB_ENVIRONMENT,
      apiKey: process.env.NEXT_PUBLIC_PINECONEDB_KEY,
    });
  }
  return pinecone;
};

export async function loadPdfIntoPinecone(file: string) {
  const file_name = await downloadFromFirebase(file);

  if (!file_name) throw new Error("Could not download from firebase");

  const loader = new PDFLoader(file_name);

  const pages = await loader.load();
  return pages;
}
