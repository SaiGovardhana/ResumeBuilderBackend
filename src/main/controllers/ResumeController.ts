import { Request, Response } from "express";
import { addResume, getResume, myResumes } from "../DAO/ResumeDAO.js";
import { generateBasicResume } from "../resume/ResumeGenerator.js";
import { sampleData } from "../sampleData/SampleData.js";

export async function addResumeEndpoint(req:Request,res:Response)
{
    let result={success:false,data:{},message:""};
    try
    {
        let resumename=req.body.resumename;
        let email=req.body.email;
        let userName=req.body.name;
        let userEmail=res.locals.user.email;
        
        if(userEmail == null)
            throw new Error("Cant't Find User");
        
        sampleData["name"]=userName;
        sampleData["email"]=email
        let resumeModel=await generateBasicResume(sampleData)


        await addResume(userEmail,resumename,resumeModel)
        result.message="Succesfully Added Resume";
        result.success=true;

    }
    catch(E)
    {
        console.log(E);
        result.success=false;
        result.message="Couldn't Add Resume";
    }

    res.json(result)

}

export async function getMyResumesEndpoint(req:Request,res:Response)
{
    let result={success:false,data:[],message:""};
    try 
    {   if(res.locals.user == null)
            throw new Error("Cant Fin User");
        
        let userEmail=res.locals.user.email;
        let data=await myResumes(userEmail);
        result.success=true;
        result.data=data;
    }
    catch(E)
    {
        console.log(E);
        result.success=false;
        result.message="Couldn't Get ";
    }

    res.json(result)
}

export async function getResumeEndpoint(req:Request,res:Response)
{
    let result={success:false,data:{},message:""};
    try
    {
        let resume=req.params.resumeId as string;
        if(resume == null)
            throw new Error("Fields Missing");
        let data=await getResume(resume);
        result.success=true
        result.data=data;
    }   
    catch(E)
    {
        console.log(E);
        result.success=false;
        result.message="An Error Occured";
    }

    res.json(result);
}