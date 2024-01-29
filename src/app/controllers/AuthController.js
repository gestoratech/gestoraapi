const AuthRepository = require('../repositories/AuthRepository');

class AuthController {
  async store(req, res) {
    const { email, password } = req.body;

    const auth = await AuthRepository.execute({
      email,
      password,
    });

    return res.json(auth);
  }
}

module.exports = new AuthController();
