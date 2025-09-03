
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
export const dbconnection = async ()=>{
 try{
  await mongoose.connect(process.env.MONGO_URL||"");
  console.log("connection ban gaya ");
  
 }
 catch(e){
 console.log("not connected to database");
 
 }
}
