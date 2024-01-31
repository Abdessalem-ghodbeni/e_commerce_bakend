import mongoose from "mongoose";
import bcrypt from "bcryptjs";

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

//cryptage de password lors d'ajout in data base
userShcema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 10);
});

//comparer password plainPassword=clair password avec password haché
userShcema.methods.comparePassword = async function (plainPassword) {
  return await bcrypt.compare(plainPassword, this.password);
};

const userModel = mongoose.model("Users", userShcema);
export default userModel;
