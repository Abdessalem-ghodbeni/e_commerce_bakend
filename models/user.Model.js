import mongoose from "mongoose";

const userShcema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: [true, "email already existe"],
    },
    password: {
      type: String,
      required: [true, "password is required"],
      minLength: [6, "password lenght should be greadter then 6 caracter "],
    },
    adress: {
      type: String,
      required: [true, "adress is required"],
    },
    city: {
      type: String,
      required: [true, "city name is required "],
    },
    country: {
      type: String,
      required: [true, "country is required"],
    },
    phone: {
      type: String,
      required: [true, "phone number is required"],
    },
    profilePic: {
      type: String,
    },
  },
  { timestamps: true }
);

const userModel = mongoose.model("Users", userShcema);
export default userModel;
