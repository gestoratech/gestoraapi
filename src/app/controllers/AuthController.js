// Importa o módulo AuthRepository
const AuthRepository = require('../repositories/AuthRepository');

// Define a classe AuthController
class AuthController {
  // Define o método assíncrono "store" para lidar com a criação de autenticação
  async store(req, res) {
    // Extrai o email e a senha do corpo da requisição
    const { email, password } = req.body;

    // Chama o método "execute" do AuthRepository para realizar a autenticação
    const auth = await AuthRepository.execute({
      email,
      password,
    });

    // Retorna a resposta em formato JSON
    return res.json(auth);
  }
}

// Exporta uma instância da classe AuthController
module.exports = new AuthController();
