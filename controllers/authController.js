
export const authUtilizador = async (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res
      .status(400)
      .json({ message: "E-mail e senha são obrigatórios." });
  }

  try {
    const utilizador = await Utilizador.findOne({ email });

    if (!utilizador) {
      return res.status(404).json({ message: "Utilizador não encontrado." });
    }

    if (utilizador.senha !== senha) {
      return res.status(401).json({ message: "Senha incorreta." });
    }

    res.json({
      message: "Login bem-sucedido",
      user: {
        id: utilizador._id,
        nome: utilizador.nome,
        email: utilizador.email,
        funcao: "cliente",
      },
    });
  } catch (error) {
    console.error("Erro ao fazer login:", error);
    res.status(500).json({ message: "Erro interno no servidor." });
  }
};
