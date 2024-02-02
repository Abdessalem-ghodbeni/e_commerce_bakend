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
