import {default as puppeteer} from 'puppeteer'
import * as dotenv from 'dotenv';
import { sendMail } from '../mail/SendMail.js';
dotenv.config();
export async function sendPDFToEmail(resumeId:string,userEmail:string) {

  try{
  
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto(`http://${process.env.FRONT_END}/puppeter?resumeId=${resumeId}`, {waitUntil: 'networkidle2'});
      setTimeout(async()=>
      {
        try{
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