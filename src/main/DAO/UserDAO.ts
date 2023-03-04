
import { MongoClient } from "mongodb";
import { UserModel } from "../models/models.js";
declare const globalThis: any;

export async function addUser(email:string,name:string,password:string):Promise<boolean>
{   
    try{
        

        if(await containsUser(email))
            {
                return false;
            }
        else
            {
            
                let col=globalThis.mongoClient.db('resume_builder').collection('users');
                await col.insertOne({'name':name,'email':email,password:password});
                return true;
            }
        }
    
    catch(E)
        {   
            console.log("Error while adding user in DAO",E);
            throw new Error("Couldn't add User");
        }



}


export async function containsUser(email:string) :Promise<boolean>
{ 
    try{
        
        let db=globalThis.mongoClient.db('resume_builder');
        let col=db.collection('users');
        let count=await col.countDocuments({email:email});
        if(count>0)
            {
                return true;
            }
        else
            {
            
            return false;
            }
        }
    
    catch(E)
        {   
            console.log("Error while checking contains user in DAO",E);
            throw new Error("Couldn't check contains User");
        }


}

export async function getUser(email:string):Promise<UserModel|null>
{   
    try
    {
        if(await containsUser(email))
        {   
            let data= (await globalThis.mongoClient.db('resume_builder').collection('users').findOne({email:email})) ;
            if(data == null)
                return null;
            let user:UserModel={email:email,name:data.name,password:data.password}
            return user;
        }
        else
            return null;


    }

    catch(E)
    {
        console.log("Error while getting user");
        throw new Error("Couln't Fetch user getUser DAO");
    }


}

export async function validateUser(email:string,password:string):Promise<boolean>
{
    try
    {
        let user=await getUser(email);
        if(user == null )
            return false;
        if(user.password == password)
            return true;
        else
            return false;
    }
    catch(E)
    {
        console.log("Error While Validating User");
        throw new Error("Error While validating user in UserDao");
    }

}
