import express from 'express';
import dotenv from "dotenv";
import { connectdb } from './config/db.js';
import { ENV } from './config/env.js';
import {clerkMiddleware} from '@clerk/express'
import { functions,inngest } from './config/inngest.js';
import {serve} from 'inngest/express';
dotenv.config();

const app=express();
app.use(express.json())
app.use(clerkMiddleware()) // req.auth will be avaible

app.use("/api/inngest", serve({ client: inngest, functions }));

app.get("/",(req,res)=>{
    res.send("welcome to server!");
})
const startserver=async ()=>{
    try {
        if(ENV.NODE_ENV!=="production"){
            app.listen(ENV.PORT, ()=>{
        console.log("server is running at http://localhost:"+ENV.PORT);
        connectdb();
            })
        }
    } catch (error) {
        console.error("error starting serven",error)
        process.exit(1);
    }
}
startserver();
export default app;
//Lk5YxOe53TKulKxe