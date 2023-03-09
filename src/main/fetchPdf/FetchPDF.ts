import {default as puppeteer} from 'puppeteer'
import * as dotenv from 'dotenv';
import { sendMail } from '../mail/SendMail.js';
import { getResume } from '../DAO/ResumeDAO.js';
import { ResumeModel } from '../models/models.js';
dotenv.config();

//FIX FOR MOBILE HOTSPOT
import { setDefaultResultOrder } from "dns";
setDefaultResultOrder("ipv4first");
export async function sendPDFToEmail(resumeId:string,userEmail:string) {

  try{
  
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto(`http://${process.env.FRONT_END}/puppeter?resumeId=${resumeId}`, {waitUntil: 'networkidle2'});
      setTimeout(async()=>
      {
        try{
          let response= await getResume(resumeId);
          let resumeModel=null;
          if(response!=null)
            resumeModel=response.resumeModel as ResumeModel;

          if(resumeModel!=null && resumeModel.resumeOptions!=null)
          {   
            console.log("Here In Text "+resumeModel.resumeOptions.bodyBackgroundColor)
            await page.addStyleTag({content:`body,html{background:${resumeModel.resumeOptions.bodyBackgroundColor} !important;}`});
          }
        await page.pdf({path: `generated/${resumeId}.pdf`, format: 'A4',printBackground:true});
        await browser.close();
        sendMail(userEmail,resumeId);
        }
        catch(E)
        {
          console.log("Couldn't Save PDF")
        }

      },5000);
      }
      catch(E)
      {
        console.log(E);
      }


}