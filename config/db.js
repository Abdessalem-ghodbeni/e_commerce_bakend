import mongoose from "mongoose";
import  Color from "colors";

const conncetDb=async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log(`Mongodb connected ${mongoose.connection.host}`)
    }
    catch(error){
        console.log(`mongodb error ${error}`.bgRed.white);
    }
}

export default conncetDb;

