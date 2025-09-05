import {Response} from "express";
import { AuthRequest } from "../types";
import { getEmbedding,model } from "../services/embeddings";
import {ContentModel} from "../models/contentModel";
import { getPineconeIndex } from "../config/pinecone";
import { searchSchema } from "../utils/validation";



export const search =async (req:AuthRequest,res:Response):Promise<void>=>{
    const validation =searchSchema.safeParse(req.query);
    if(!validation.success){
        res.status(400).json({message:"Invalid search parameter"});
        return;
    }
    const query=req.query.q?.toString() || "";;
    const userId=req.userId;
    try{
    const queryEmbedding= await getEmbedding(query);
    const index =getPineconeIndex();
     
    const searchResponse= await getPineconeIndex().query({
        vector:queryEmbedding,
        topK:5,
        includeMetadata:true,
        filter:{
            userId:userId?.toString()||""
        }
    })
    //in this searchResponse we have the ids of the content that are relevant to the query
    const contentIds=searchResponse.matches?.map(match=>match.id)
    //we are extracting the ids from the contentmodel
    const relevantContent=await ContentModel.find({
        _id:{$in:contentIds},
        userId:userId,
    })
      
    // Step 1: Take all the MongoDB documents we fetched earlier
const contentWithScores = relevantContent
  .map((content: any) => {
    // Step 2: For each document, find its matching Pinecone result
    // (based on ID, since Pinecone searchResponse also has IDs)
    const match = searchResponse.matches.find(
      (m: any) => m.id === content._id.toString()
    );

    // Step 3: Return a new object that includes:
    // - the full document data (...content.toObject())
    // - the similarity score from Pinecone (or 0 if not found)
    return {
      ...content.toObject(),
      similarityScore: match ? match.score : 0,
    };
  })
  // Step 4: Sort all documents in descending order of similarityScore
  .sort((a: any, b: any) => b.similarityScore - a.similarityScore)

  // Step 5: Keep only the top 2 most relevant documents
  .slice(0, 2);

    
if(contentWithScores.length===0){
    res.json({message:"No relevant content Found",results: [],});
    
    return;
}
//pehle model ke liye content prepare kar rahe hai 1.content 2 fir title 3. type 4. link 5.content 
let context =
      "Below is the relevant information from the user's second brain:\n\n";
    contentWithScores.forEach((item: any, index: number) => {
      context += `[Content ${index + 1}]\nTitle: ${item.title}\nType: ${
        item.type
      }\n`;
      if (item.link) context += `Link: ${item.link}\n`;
      context += `Content: ${item.content}\n\n `;
    });
const prompt = `${context}\n\nUser query: "${query}"\n\nBased on the information above from the user's second brain, please provide a helpful and concise response to their query. If the information doesn't contain a direct answer, try to extract relevant insights that might be helpful. if any is questions asked, try to answer it with your knowledege also and You are an AI assistant helping a user by providing information from their personal knowledge base. Use the following context to answer the question at the end. If the context does not contain relevant information, respond with "I'm sorry, I don't have that information.`;
const result = await model.generateContent({
    contents:[{role:"user",parts:[{text:prompt}]}],
})
const answer =
  result?.response?.candidates?.[0]?.content?.parts?.[0]?.text ||
  "No response generated.";

  res.json({
    message:"Search results found",
    results:contentWithScores,
    answer:answer,

  })
    }
    catch(error){
        console.error("Search error:",error);
        res.status(500).json({message:"Internal server error during search"});
        
    }
}