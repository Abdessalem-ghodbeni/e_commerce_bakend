import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";

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
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },
  },
  { timestamps: true }
);

//cryptage de password lors d'ajout in data base
userShcema.pre("save", async function (next) {
  // pour dire si le password n'est pas modifier ne le hacher de nouveaux si non faire le hachage
  // methos isModified est fournie par mongoose
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
});

//comparer password plainPassword=clair password avec password haché
userShcema.methods.comparePassword = async function (plainPassword) {
  return await bcrypt.compare(plainPassword, this.password);
};

//genration d'un tocken
userShcema.methods.generateToken = function () {
  return JWT.sign({ _id: this._id }, process.env.JWT_SECRET, {
    //Le token généré sera valide pendant 7 jours.
    expiresIn: "7d",
  });
};

const userModel = mongoose.model("Users", userShcema);
export default userModel;
