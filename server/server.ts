import './configs/instrument.mjs'

import express ,{Request ,Response} from "express"
import cors from "cors"
import 'dotenv/config'
import dotenv from "dotenv";
dotenv.config();
import { clerkMiddleware } from '@clerk/express'
import clerkWebhooks from "./controllers/clerk.js";

import * as Sentry from "@sentry/node"
import userRouter from './routes/userRoutes.js'
import projectRouter from "./routes/projectRoutes.js"
import cloudinary from './configs/cloudinary.js';



const app = express();

const PORT = process.env.PORT || 5000;

//middleware
app.use(cors())


app.post('/api/clerk', express.raw({type:"application/json"}) ,clerkWebhooks)


app.use(express.json())
app.use(clerkMiddleware())



app.get('/',(req:Request,res:Response)=>{
    res.send("Server is Live")
});

app.get("/debug-sentry", function mainHandler(req,res){
    throw new Error("My first Sentry error")
})

app.use('/api/user',userRouter)
app.use('/api/project',projectRouter)

//this error handler must be registered before any other error middleware and after all controllers
Sentry.setupExpressErrorHandler(app)

app.get("/test-cloudinary", async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(
      "https://res.cloudinary.com/demo/image/upload/sample.jpg",
      {
        resource_type: "image",
      }
    );

    console.log(result);

    res.json(result);
  } catch (err: any) {
    console.log("UPLOAD ERROR");
    console.dir(err, { depth: null });

    res.status(500).json({
      message: err?.message,
      http_code: err?.http_code,
    });
  }
});

app.get("/test-local-upload", async (req,res) => {
  try {

    const result =
      await cloudinary.uploader.upload(
        "./public/test.png",
        {
          resource_type:"image"
        }
      );

    res.json(result);

  } catch(err:any){

    console.dir(err,{depth:null});

    res.json({
      message: err.message,
      http_code: err.http_code
    });

  }
});


app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`)
})
