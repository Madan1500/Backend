// require("dotenv").config({path: "./env"});
import dotenv from "dotenv";
import connectDB from "./db/index.js";
import {app} from './app.js'


dotenv.config({ path: "./env" }); //This is the path to the .env file
connectDB()
    .then(() => {
        console.log("Mongo DB connected")
        app.on("error", (error) => { //This is an event listener that listens for any error that occurs in the app
            console.log("Data Base is connected but something went wrong", error)
            throw new Error(error)
        })
        app.listen(process.env.PORT || 8000, (req, res) => {
            console.log(`Server is running on port ${process.env.PORT}`)
        })
    })
    .catch((error) => {
        console.error("Error connecting to the database", error)
    })





/*
import express from "express";
const app = express();

Iffie
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
