import mongoose from "mongoose";

const utilizadorSchema = new mongoose.Schema(
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

export default mongoose.model("Utilizador", utilizadorSchema);
