import dotenv from "dotenv";
import connectDB from "./db/index.js";



dotenv.config(
    { 
        path: "./env"
    }
);
connectDB();



















/*
import express from "express";
const app = express();

//Iffie
; (async () => {
    try {
        await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`)
        app.on("error", (error) => { 
            console.log("Error connecting to the server", error) 

        })
        app.listen(process.env.PORT,(req,res)=> {console.log(`Server is running on port ${process.env.PORT}`)})
    } catch (error) {
        console.error("Error: ", error)
        throw new Error(error)
    }
})()
*/
