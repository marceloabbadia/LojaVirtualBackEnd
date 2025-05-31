import { Schema, model } from "mongoose";

const productSchema = new Schema(
  {
    name: { type: String, required: true },
    brand: { type: String, required: true },
    type: { type: String, required: true },
    color: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    mainPhoto: { type: String },
    secondaryPhoto: { type: String },
  },
  {
    timestamps: true,
  }
);

const Product = model("Product", productSchema);

export default Product;
