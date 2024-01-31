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
