import productModel from "../models/product.Model.js";

export const gettAllProductController = async (req, res) => {
  try {
    const product = await productModel.find({});

    if (product.length == 0) {
      return res.status(200).send({
        succes: true,
        message: "liste des produit vide",
        product,
      });
    }
    res.status(200).send({
      succes: true,
      message: "all product fetchedd successfully",
      product,
    });
  } catch (error) {
    res.status(500).send({
      succes: false,
      message: "somthing was warrning with get api product",
      error,
    });
  }
};
export const getProductById = async (req, res) => {
  try {
    const produit = await productModel.findById(req.params.id);
    if (!produit) {
      return res.status(404).send({
        succes: false,
        message: "product not found",
      });
    }

    res.status(200).send({
      succes: true,
      message: "product getting successfully",
      produit,
    });
  } catch (error) {
    console.log(error);
    // cast error ||  OBJECT ID
    if (error.name === "CastError") {
      return res.status(500).send({
        success: false,
        message: "Invalid Id",
      });
    }
    res.status(500).send({
      succes: false,
      message: "error lors de recuperation de ce produit ",
      error,
    });
  }
};
