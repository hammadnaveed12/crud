import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bodyparser from "body-parser";
 import homeRoute from "./routes/adminroute.js"
 import multer from "multer";
 import path from "path";

const app = express();

dotenv.config();

const connect = async () => {
    try {
        await mongoose.connect(process.env.mongo);
        console.log("connected to mongodb!")
      } catch (error) {
        throw error;
      }
    };
    var upload = multer({storage: multer.diskStorage({

      destination: function (req, file, callback) 
      { callback(null, './uploads');},
      filename: function (req, file, callback) 
      { 
        callback(null, (file.originalname));
      }
    
    }),
    fileFilter: function(req, file, callback) {
      var ext = path.extname(file.originalname)
      if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
        return callback(/*res.end('Only images are allowed')*/ null, false)
      }
      callback(null, true)
    }
    });



    app.set("view engine","ejs");
app.use(express.static("public"))
app.use(bodyparser.urlencoded({extended:false}))

app.use(bodyparser.json())
app.use(express.json());

 app.use("/",homeRoute);

app.listen(8800,()=>{
     connect()
    console.log("Connected to backend! ");
})