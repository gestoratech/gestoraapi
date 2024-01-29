const { compare } = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../../database');
const UserRepository = require('./UserRepository');

class AuthRepository {
  async execute({ email, password }) {
    const user = await UserRepository.findByEmail(email);

    if (!user) {
      throw new Error('As credenciais estão incorretas!');
    }

    const passwordMath = await compare(password, user.password);

    if (!passwordMath) {
      throw new Error('As credenciais estão incorretas!');
    }

    // gerar token
    const token = jwt.sign({
      name: user.name,
      email: user.email,
    }, process.env.JWT_SECRET, {
      subject: user.id,
      expiresIn: '1d',
    });

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      token,
    };
  }
}

module.exports = new AuthRepository();
