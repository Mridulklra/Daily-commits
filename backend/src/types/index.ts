import mongoose from "mongoose";
import {Request} from "express";

export interface Link{
    _id:mongoose.Types.ObjectId;
    user:mongoose.Types.ObjectId;
    hash:string;
}
export interface AuthRequest extends Request{
    userId?:string;
}