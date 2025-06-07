import mongoose from "mongoose";
import { Schema, model } from "mongoose";

const utilizadorSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    cp4: {
      type: String,
      required: true,
    },
    cp3: {
      type: String,
      required: true,
    },
    cplocal: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    situation: {
      type: String,
      required: true,
    },
    function: {
      type: String,
      required: true,
    },
    wishlist: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Product",
      required: true,
    },
    cart: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Product",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Utilizador = model("Utilizador", utilizadorSchema);

export default Utilizador;
