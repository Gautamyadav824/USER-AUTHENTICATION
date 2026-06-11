import express from "express";
import cors from "cors";
import 'dotenv/config';
import cookieParser from "cookie-parser";
// import connectDB from "./config/mongodb.js";
import mongoose from "mongoose";
import dns from "dns";
import authRouter from './routes/authRoutes.js';
import userRouter from "./routes/userRoutes.js";

dns.setServers(["1.1.1.1", "8.8.8.8"]);

const app = express();
const port = process.env.PORT || 4000;

// CORS configuration - allow localhost on any port for development
app.use(cors({ 
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    // Allow localhost and 127.0.0.1 on any port
    if (origin.startsWith('http://localhost:') || origin.startsWith('http://127.0.0.1:')) {
      return callback(null, true);
    }
    
    callback(new Error('Not allowed by CORS'));
  },
  credentials: true 
}));

app.use(express.json());
app.use(cookieParser());

app.get("/",(req,res) => {
    res.send("Api Working fine");
});

app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);

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