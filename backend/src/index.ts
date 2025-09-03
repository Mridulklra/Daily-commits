import dotenv from "dotenv"
import express from "express";
import { dbconnection } from "./config/db";
import app from "./app";

dotenv.config();

const port =process.env.PORT||3000;


const startServer= async ()=>{
    try{
         await dbconnection();
         
     app.listen(port,()=>{
          console.log(`server is running on port :${port}`);
    
         })
    }
    catch(e){
   console.error("failed to start server",e);
   process.exit(1);
    }
}

startServer();