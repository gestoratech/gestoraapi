// Importa a função 'compare' do módulo bcrypt para comparar senhas
const { compare } = require('bcrypt');
// Importa o módulo jsonwebtoken para gerar tokens de autenticação
const jwt = require('jsonwebtoken');
// Importa o módulo de conexão com o banco de dados
const db = require('../../database');
// Importa o UserRepository para interagir com os dados do usuário
const UserRepository = require('./UserRepository');

// Define a classe AuthRepository
class AuthRepository {
  // Método assíncrono para autenticar um usuário
  async execute({ email, password }) {
    // Busca o usuário pelo email
    const user = await UserRepository.findByEmail(email);

    // Verifica se o usuário existe
    if (!user) {
      throw new Error('As credenciais estão incorretas!');
    }

    // Compara a senha fornecida com a senha armazenada no banco de dados
    const passwordMatch = await compare(password, user.password);

    // Verifica se as senhas correspondem
    if (!passwordMatch) {
      throw new Error('As credenciais estão incorretas!');
    }

    // Gera um token de autenticação
    const token = jwt.sign(
      {
        name: user.name,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        subject: user.id,
        expiresIn: '1d',
      }
    );

    // Retorna um objeto com informações do usuário e o token
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      token,
    };
  }
}

// Exporta uma instância da classe AuthRepository
module.exports = new AuthRepository();
