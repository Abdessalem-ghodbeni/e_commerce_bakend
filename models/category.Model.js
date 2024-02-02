import mongoose from "mongoose";

const categorySchema = mongoose.Schema(
  {
    category: {
      type: String,
      required: [true, "category is required"],
    },
  },
  { timestamps }
);

const categoryModel = mongoose.model("Categorys", categorySchema);
export default categoryModel;
