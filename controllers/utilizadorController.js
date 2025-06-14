import Utilizador from "../models/UtilizadorModel.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await Utilizador.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar utilizadores" });
  }
};

export const getOneUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await Utilizador.findById(id);

    if (!user) {
      return res.status(404).json({ message: "Utilizador não encontrado" });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error("Erro ao buscar utilizador:", error.message);
    return res.status(500).json({ message: "Erro ao buscar utilizador" });
  }
};

export const createUser = async (req, res) => {
  const { name, email, password, address, cp4, cp3, cplocal, country } =
    req.body;

  try {
    const newUser = new Utilizador({
      name,
      email,
      password,
      address,
      cp4,
      cp3,
      cplocal,
      country,
      situation: "disabled",
      function: "client",
      wishlist: [],
      cart: [],
    });

    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    console.error("Erro ao cadastrar:", error);
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

export const updateUserStatusAndFunction = async (req, res) => {
  const { id } = req.params;
  const { situation, func } = req.body;

  if (!situation && !func) {
    return res.status(400).json({ message: "Nenhuma alteração fornecida." });
  }

  try {
    const updateFields = {};

    if (situation) {
      updateFields.situation = situation;
    }

    if (func) {
      updateFields.function = func;
    }

    const updatedUser = await Utilizador.findByIdAndUpdate(id, updateFields, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ message: "Utilizador não encontrado." });
    }

    res.json({
      message: "Dados atualizados com sucesso.",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Erro ao atualizar dados:", error.message);
    res.status(500).json({ message: "Erro interno no servidor." });
  }
};
