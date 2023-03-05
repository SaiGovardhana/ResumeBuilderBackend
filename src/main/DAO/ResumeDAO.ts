import { MongoClient, ObjectId } from "mongodb";
import { ResumeModel } from "../models/models.js";
declare const globalThis: any;

export async function addResume(email:string,name:string,resumeModel:ResumeModel):Promise<boolean>
{   
    try{
        


            
                let col=globalThis.mongoClient.db('resume_builder').collection('resumes');
                await col.insertOne({time:Date.now(),resumename:name,'email':email,'state':"success","resumeModel":resumeModel});
                return true;
            
        }
    
    catch(E)
        {   
            console.log("Error while adding user in DAO",E);
            throw new Error("Couldn't Add Resume");
        }



}


export async function myResumes(email:string)
{
    try{
        


            
        let col=globalThis.mongoClient.db('resume_builder').collection('resumes');
        let cursor=col.find({email:email},{projection:{_id:1,resumename:1,state:1}}).sort({time:-1})
        let arr:any=[]
        while(await  cursor.hasNext())
            arr.push(await cursor.next())
        return arr;
    }

catch(E)
{   
    console.log("Error while adding user in DAO",E);
    throw new Error("Couldn't Add Resume");
}


}

export async function getResume(resumeId:string)
{
    try
    {
        let col=globalThis.mongoClient.db('resume_builder').collection('resumes');
        let resume=await col.findOne({_id:new ObjectId(resumeId)});
        if(resume == null)
            throw new Error("Couldn't Find resume")
        return resume
    }
    catch(E)
    {
        console.log(E);
        throw new Error("Couldm't fetch resume");
    }

}