import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";



const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,    // "http://localhost:3000" is only allowed to make requests
    credentials: true,  // to allow the cookies to be sent from the server to the client
}));    

app.use(express.json({limit: "16kb"})); // for parsing application/json

app.use(express.urlencoded( { extended: true,limit: "16kb" } )); // for parsing application/x-www-form-urlencoded extended: true means that the server will accept the data in the form of arrays and strings in nested form

app.use(express.static("public"));
app.use(cookieParser());    // to parse the cookies from the incoming requests


export{ app };