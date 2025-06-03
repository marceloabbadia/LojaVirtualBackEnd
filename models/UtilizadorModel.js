import { Schema, model } from "mongoose";

const utilizadorSchema = new Schema(
  {
    nome: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    senha: {
      type: String,
      required: true,
    },
    morada: {
      type: String,
      required: true,
    },
    codigoPostal: {
      type: String,
      required: true,
    },
    pais: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Utilizador = model("Utilizador", utilizadorSchema);

export default Utilizador;
