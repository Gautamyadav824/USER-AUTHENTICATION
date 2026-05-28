import express from "express";
import cors from "cors";
import 'dotenv/config';
import cookieParser from "cookie-parser";
// import connectDB from "./config/mongodb.js";
import mongoose from "mongoose";
import dns from "dns";

dns.setServers(["1.1.1.1", "8.8.8.8"]);

const app = express();
const port = process.env.PORT || 4000;


app.use(express.json());
app.use(cookieParser());
app.use(cors({credentials:true}));

app.get("/",(req,res) => {
    res.send("Api Working fine");
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("DB Connected");
    app.listen(port, () => {
      console.log(`server started on port ${port}`);
    });
  })
  .catch((err) =>{

 console.error("DB Connection Error:", err.message);
});