import { string } from "i/lib/util";
import mongoose from "mongoose";
import { type } from "os";

export const Userschema=new mongoose.Schema({
    email:{
        type:string,
        required:true,
        unique:true
    },
    name:{
        type:string,
        required:true
    },
    image:{
        type:string,
        required:true
    },
    clerkId:{
        type:string,
        required:true,
        unique:true
    }
},{timestamps:true})
export const User=mongoose.model("User",Userschema);