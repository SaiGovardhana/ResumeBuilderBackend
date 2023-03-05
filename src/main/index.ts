import  Express  from "express";
import { MongoClient } from "mongodb";
import * as dotenv from 'dotenv'
import { userRouter } from "./routers/UserRouter.js";
import { resumeRouter } from "./routers/ResumeRouter.js";
import { InjectUser } from "./middleware/InjectUser.js";
import cookieparser from 'cookie-parser'
dotenv.config()
declare const globalThis: any;

globalThis.mongoClient=new MongoClient(process.env.MONGO_URL as string);

let app:Express.Express=Express();
app.use(cookieparser())

app.use(Express.json())
app.use('/',InjectUser);
app.use('/api/user',userRouter);
app.use('/api/resume/',resumeRouter);



app.listen(4292,()=>
{
    console.log("Listening At Port 4292")
})


