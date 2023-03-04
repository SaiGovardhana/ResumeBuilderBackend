import { Request, Response } from "express";
import  jwt from "jsonwebtoken";

import { addUser, containsUser, getUser, validateUser } from "../DAO/UserDAO.js";
let maxSeconds=30*24*60*60*1000


export async function addUserEndpoint(req:Request,res:Response)
{   let result:{[key:string]:any}={'success':false};
    try{
        if(req.body.email==null||req.body.password == null || req.body.name == null )
            {
                result.message="Some Missing Fields!";
            }
        else
            {
                if(await containsUser(req.body.email))
                {
                    result.message="User Already Present"

                }
                else
                {
                    let verdict=await addUser(req.body.email,req.body.name,req.body.password);
                    if(verdict == false)
                    {
                        result.message="Couldn't Add User";
                    }
                    else
                    {   result.success=true;
                        result.message="Succesfully Added User";

                        result.data={email:req.body.email,name:req.body.name};
                        res.cookie('user',jwt.sign(result.data,process.env.JWT_SECRET_KEY as string),{maxAge:maxSeconds})
                    }

                }
        }
    }
    catch(E)
    {   result.success=false;
        result.message="A Fatal Error Occured";
        console.log("An Error Occured While Adding User",E);

    }

    res.json(result);
}

export async function loginUserEndpoint(req:Request,res:Response)
{   let result:{[key:string]:any}={'success':false};
    try{
        if(req.body.email==null||req.body.password == null )
            {
                result.message="Some Missing Fields!";
            }
        else
            {   let user=await getUser(req.body.email);
                if(user == null)
                {
                    result.message="User Is Not Registered!";

                }
                else
                {
                    let verdict=await validateUser(req.body.email,req.body.password);
                    if(verdict == false)
                    {
                        result.message="Invalid Password";
                    }
                    else
                    {   result.success=true;
                        result.message="Succesfully Logged In User";

                        result.data={email:req.body.email,name:user.name};
                        res.cookie('user',jwt.sign(result.data,process.env.JWT_SECRET_KEY as string),{maxAge:maxSeconds})
                    }

                }
        }
    }
    catch(E)
    {   result.success=false;
        result.message="A Fatal Error Occured";
        console.log("An Error Occured While Logging In User",E);

    }

    res.json(result);
}