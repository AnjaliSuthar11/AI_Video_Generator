import { verifyWebhook } from "@clerk/express/webhooks"
import {Request,Response} from "express"
import { prisma } from "../configs/prisma.js";
import * as Sentry from "@sentry/node";

const clerkWebhooks = async( req:Request,res:Response )=>{
 console.log("WEBHOOK HIT");
    try{
    const evt = await verifyWebhook(req)
 console.log("EVENT TYPE:", evt.type);
    // getting data from request

    const {data,type} = evt;
    // switch cases for different events

    switch(type){
        case "user.created":{
            await prisma.user.create({
                data:{
                    id:data.id,
                    email:data?.email_addresses[0]?.email_address,
                    name:data?.first_name + " " + data?.last_name,
                    image:data?.image_url,
                }
            })
            break;

        }
        case "user.updated":{
            await prisma.user.update({
                where:{
                  id:data.id
                },
                data:{
                    email:data?.email_addresses[0]?.email_address,
                    name:data?.first_name+ " "+ data?.last_name,
                    image:data?.image_url,
                }
            })
            break;

        }
        case "user.deleted":{
            await prisma.user.delete({
                where:{
                  id:data.id
                },
                
            })
            break;

        }
        case "paymentAttempt.updated":{
              console.log("PAYMENT WEBHOOK RECEIVED");
  console.log(data);
            if((data.charge_type === "recurring" ||data.charge_type === "checkout" ) && data.status === "paid"){
                const credits = {pro:80,premium:240}

                const clerkUserId = data?.payer?.user_id;

                // const planId: keyof typeof credits = data?.subscription_items?.[0]?.plan?.slug;

                const planId = data?.subscription_items?.[0]?.plan?.slug;

                if(planId !== "pro" && planId !== "premium"){
                    return res.status(400).json({message:"invalid plan"})
                }
               console.log("Plan ID:", planId);
console.log("Clerk User ID:", clerkUserId);

   const updatedUser=   await prisma.user.update({
                    where:{
                    id:clerkUserId, },
                    data:{ credits:{increment:credits[planId]}}                   
                })
                console.log("Updated user:", updatedUser);
            }
            break;

        }
        default:break;
    }

    res.json({message:"webhook Recieved :" + type})

    }catch(error:any){
        Sentry.captureException(error)
        res.status(500).json({message:error.message})
    }

}


export default clerkWebhooks
