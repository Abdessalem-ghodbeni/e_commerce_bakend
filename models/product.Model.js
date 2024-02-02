import mongoose from "mongoose";

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "product name is required"],
    },
    description: {
      type: String,
      required: [true, "produvct description is required"],
    },
    price: {
      type: Number,
      required: [true, "product price is required"],
    },
    stock: {
      type: Number,
      required: [true, "product stock required"],
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    images: [
      {
        public_id: String,
        url: String,
      },
    ],
  },
  { timestamps: true }
);

const porductModel = mongoose.model("Products", productSchema);
export default porductModel;
