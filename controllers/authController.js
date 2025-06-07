import Utilizador from "../models/UtilizadorModel.js";
import Product from "../models/productModel.js";

export const authUtilizador = async (req, res) => {
  const { email, password } = req.body;
  console.log("email: " + email);
  console.log("Senha: " + password);

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "E-mail e senha são obrigatórios." });
  }

  try {
    const utilizador = await Utilizador.findOne({ email });
    console.log("Retorno: " + utilizador);

    if (!utilizador) {
      return res.status(404).json({ message: "Utilizador não encontrado." });
    }

    if (utilizador.password !== password) {
      return res.status(401).json({ message: "Senha incorreta." });
    }

    res.json({
      message: "Login bem-sucedido",
      user: {
        _id: utilizador._id,
        name: utilizador.name,
        email: utilizador.email,
        situation: utilizador.situation,
        function: utilizador.function,
      },
    });
  } catch (error) {
    console.error("Erro ao fazer login:", error);
    res.status(500).json({ message: "Erro interno no servidor." });
  }
};

export const wishlistUtilizador = async (req, res) => {
  const { productId } = req.params;
  const { userId } = req.body;

  if (!userId || !productId) {
    return res
      .status(400)
      .json({ message: "userId e productId são obrigatórios" });
  }

  try {
    const user = await Utilizador.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "Utilizador não encontrado" });
    }

    const index = user.wishlist.indexOf(productId);

    if (index === -1) {
      user.wishlist.push(productId);
    } else {
      user.wishlist.splice(index, 1);
    }

    await user.save();

    const updatedUser = await Utilizador.findById(userId).populate("wishlist");

    res.json({
      message: index === -1 ? "Adicionado à wishlist" : "Removido da wishlist",
      wishlist: updatedUser.wishlist,
    });
  } catch (error) {
    console.error("Erro ao atualizar wishlist:", error);
    res.status(500).json({ message: "Erro interno no servidor" });
  }
};

export const getWishlist = async (req, res) => {
  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({ message: "userId é obrigatório." });
  }

  try {
    const user = await Utilizador.findById(userId).select("wishlist");
    if (!user) {
      return res.status(404).json({ message: "Utilizador não encontrado." });
    }

    const products = await Product.find();

    const productsWithWishlist = products.map((p) => {
      const isInWishlist = user.wishlist.includes(p._id);
      return {
        ...p.toObject(),
        wishlist: isInWishlist,
      };
    });

    res.json(productsWithWishlist);
  } catch (error) {
    console.error("Erro ao listar produtos com wishlist:", error.message);
    res.status(500).json({ message: "Erro interno no servidor." });
  }
};
