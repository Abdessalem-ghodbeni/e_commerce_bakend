import userModel from "../models/user.Model.js";

export const RegisterController = async (req, res) => {
  try {
    const { name, email, password, adress, city, country, phone } = req.body;

    if (
      !name ||
      !email ||
      !password ||
      !adress ||
      !city ||
      !country ||
      !phone
    ) {
      return res.status(500).send({
        succes: false,
        message: "Invalid data ",
      });
    }
    ///verifier si user existe deja
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(500).send({
        succes: false,
        message: "mail is already exist",
      });
    }

    const user = await userModel.create({
      name,
      email,
      password,
      adress,
      city,
      country,
      phone,
    });
    res.status(201).send({
      succes: true,
      message: "user added successfuly",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: true,
      message: "somthing was warrning",
      error,
    });
  }
};

export const logginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    //tester si les champ sont vide
    if (!email || !password) {
      return res.status(500).send({
        succes: false,
        message: "please check a valid data ",
      });
    }

    //tster l'existance de user
    const existingUser = await userModel.findOne({ email });
    if (!existingUser) {
      return res.status(404).send({
        succes: false,
        message: `user is not found avec email ${email}`,
      });
    }
    //comparaison des password
    const estCompatible = await existingUser.comparePassword(password);

    if (!estCompatible) {
      return res.status(500).send({
        succes: false,
        message: "password is not true ",
      });
    }
    const token = existingUser.generateToken();
    res
      .status(200)
      .cookie("token", token, {
        expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
        secure: process.env.MODE_ENV === "developpement" ? true : false,
        httpOnly: process.env.MODE_ENV === "developpement" ? true : false,
        sameSite: process.env.MODE_ENV === "developpement" ? true : false,
      })
      .send({
        succes: true,
        message: "Loggin successfuly",
        token,
        existingUser,
      });
  } catch (error) {
    res.status(500).send({
      succes: false,
      message: `somthing was warrning in loggin ${error}`,
    });
  }
};

export const getUserProfileController = async (req, res) => {
  try {
    const user = await userModel.findById(req.user._id);
    user.password = undefined;
    res.status(200).send({
      success: true,
      message: "USer Prfolie Fetched Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In PRofile API",
      error,
    });
  }
};
