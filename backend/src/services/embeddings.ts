import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
export const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
export async function getEmbedding(text:string):Promise<number[]>{
    const MAX_EMBEDDING_SIZE=3000;
    if(text.length>MAX_EMBEDDING_SIZE){
         const embeddingModel = genAI.getGenerativeModel({ model: "embedding-001" });
         const result = await embeddingModel.embedContent(text);
        if(result.embedding && typeof result.embedding==="object"){
            return result.embedding.values;
        }
        else   if(Array.isArray(result.embedding)){
            return result.embedding;

        }
          console.error("Unexpected embedding format:", result.embedding);
    throw new Error("Failed to get valid embedding");
  }
   


}

