import express from "express"
import authRoutes from "./routes/authRoutes"

const app=express();
app.use(express.json());
app.get("/",(req,res)=>{
    res.send("health-checkup:everything fine ")
})

app.use("/api/v1/auth",authRoutes);

export  default app;