import mongoose from "mongoose";
import Color from "colors";

const conncetDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log(`Mongodb connected ${mongoose.connection.host}`.bgYellow.white);
  } catch (error) {
    console.log(`mongodb error ${error}`.bgRed.white);
  }
};

export default conncetDb;
