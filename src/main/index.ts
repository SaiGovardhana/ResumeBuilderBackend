import  Express  from "express";
import { MongoClient } from "mongodb";
import * as dotenv from 'dotenv'
import { userRouter } from "./routers/UserRouter.js";
dotenv.config()
declare const globalThis: any;
globalThis.mongoClient=new MongoClient(process.env.MONGO_URL as string);
let app:Express.Express=Express();
app.use(Express.json())
app.use('/api/user',userRouter);

app.listen(4292,()=>
{
    console.log("Listening At Port 4292")
})


