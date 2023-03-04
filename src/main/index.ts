import  Express  from "express";
import { MongoClient } from "mongodb";
import * as dotenv from 'dotenv'
dotenv.config()
declare const globalThis: any;
globalThis.mongoClient=new MongoClient(process.env.MONGO_URL as string);
let app:Express.Express=Express();


app.listen(4292)


