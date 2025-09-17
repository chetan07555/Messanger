import  mongoose  from "mongoose";

import { ENV } from '../config/env.js';

export const connectdb= async ()=>{
    try {
        await mongoose.connect(ENV.MONGO_URI);
        console.log("MONGODB CONNECTED SUCESSFULLY")
    
    } catch (error) {
        console.log("Error connecting mongodb",error)
        process.exit(1);
    }

} 