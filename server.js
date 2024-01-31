import  Express from "express";
import dotenv from "dotenv"
import colors from "colors"
import morgan from "morgan";
import cors from "cors"
import conncetDb from "./config/db.js"
const app=Express()
app.use(morgan("dev"))
app.use(cors())
app.use(Express.json())
 


dotenv.config()


//connection ave la base de donnée
conncetDb();





const port=process.env.PORT || 5000;








app.listen(port,()=>{
    console.log(`server runing in port ${process.env.PORT}`.bgMagenta.white)
})