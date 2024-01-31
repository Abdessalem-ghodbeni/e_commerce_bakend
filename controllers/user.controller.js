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

export const logoutController = async (req, res) => {
  try {
    res
      .status(200)
      .cookie("token", "", {
        expires: new Date(Date.now()),
        secure: process.env.NODE_ENV === "development" ? true : false,
        httpOnly: process.env.NODE_ENV === "development" ? true : false,
        sameSite: process.env.NODE_ENV === "development" ? true : false,
      })
      .send({
        success: true,
        message: "Logout SUccessfully",
      });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In LOgout API",
      error,
    });
  }
};

export const updateInfoUserController = async (req, res) => {
  try {
    const user = await userModel.findById(req.user._id);
    const { name, email, adress, city, country, phone } = req.body;
    //user.name correspond au nom actuellement stocké dans la base de données pour cet utilisateur. Et name correspond au nom extrait du corps de la requête (req.body). Lorsque vous exécutez if (name) user.name = name;, cela vérifie si name est une valeur non nulle ou non définie. Si name a une valeur, cela signifie qu'un nouveau nom a été fourni dans la requête et vous souhaitez mettre à jour le nom de l'utilisateur. Si name existe dans le corps de la requête, la ligne de code user.name = name; affecte la valeur de name à la propriété name de l'objet user.
    if (name) user.name = name;
    if (email) user.email = email;
    if (adress) user.adress = adress;
    if (city) user.city = city;
    if (country) user.country = country;
    if (phone) user.phone = phone;

    await user.save();
    res.status(200).send({
      succes: true,
      message: "user updated successfully",
    });
  } catch (error) {
    res.status(500).send({
      succes: false,
      message: "somthing was warrning in update info",
    });
  }
};
