// const express = require('express')
// const userRouter = require('./routes/users.js')
// const mongoose = require('mongoose')

import  express  from 'express';
import userRouter from './routes/users.js'
import taskRouter from './routes/task.js'
import cookieParser from 'cookie-parser';
import { ErrorHandler } from './middlewares/error.js';
import cors from "cors";
import { config } from "dotenv";

export const app = express();

config({
    path: "./data/config.env",
  });


app.use(cors({
  origin: [process.env.FRONTEND_URI],
  methods: ["GET","POST","PUT","DELETE"],
  credentials:true
}))

// Using Middlewares
app.use(express.json())
app.use(cookieParser())
// Using Routes
app.use("/api/v1/users",userRouter)
app.use("/api/v1/tasks",taskRouter)


// app.listen(5000, ()=>{
//     console.log("Server Running...")
// })

app.get('/', (req,res)=>{
    res.send("working")
})

app.use(ErrorHandler)