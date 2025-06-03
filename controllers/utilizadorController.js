import express from "express";
import Utilizador from "../models/UtilizadorModel.js";

const router = express.Router();

export const getAllUsers = async (req, res) => {
  try {
    const users = await Utilizador.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar utilizadores" });
  }
};

export const getOneUser = async (req, res) => {
  try {
    const user = await Utilizador.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "Utilizador não encontrado" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar utilizador" });
  }
};

export const createUser = async (req, res) => {
  const { nome, email, senha, morada, codigoPostal, pais } = req.body;

  try {
    const newUser = new Utilizador({
      nome,
      email,
      senha,
      morada,
      codigoPostal,
      pais,
    });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: "E-mail já cadastrado" });
    }
    res.status(500).json({ message: "Erro ao cadastrar utilizador" });
  }
};

export const updateUser = async (req, res) => {
  const updates = req.body;

  try {
    const updatedUser = await Utilizador.findByIdAndUpdate(
      req.params.id,
      updates,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "Utilizador não encontrado" });
    }

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Erro ao atualizar utilizador" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const deletedUser = await Utilizador.findByIdAndDelete(req.params.id);

    if (!deletedUser) {
      return res.status(404).json({ message: "Utilizador não encontrado" });
    }

    res.json({ message: "Utilizador excluído com sucesso" });
  } catch (error) {
    res.status(500).json({ message: "Erro ao excluir utilizador" });
  }
};
