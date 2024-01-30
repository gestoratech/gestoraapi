// Importe o módulo UserRepository para interagir com os dados do usuário.
const UserRepository = require('../repositories/UserRepository');

// Define a classe UserController
class UserController {
  // Método assíncrono para listar todos os usuários, com opção de ordenação.
  async index(request, response) {
    const { orderBy } = request.query;
    const users = await UserRepository.findAll(orderBy);

    response.json(users);
  }

  // Método assíncrono para obter um usuário por ID.
  async show(request, response) {
    // Obter o ID a partir dos parâmetros da requisição.
    const { id } = request.params;
    const user = await UserRepository.findById(id);

    if (!user) {
      return response.status(404).json({ error: 'Este usuário não existe!' });
    }

    response.json(user);
  }

  // Método assíncrono para criar um novo usuário.
  async store(request, response) {
    // Extrair informações do corpo da requisição.
    const {
      name, email, password, ramal, role, sector,
    } = request.body;

    // Verificar se o email já está em uso.
    const userExists = await UserRepository.findByEmail(email);

    if (userExists) {
      return response.status(400).json({ error: 'O e-mail informado já está sendo utilizado!' });
    }

    if (password === '' || password === null || password === undefined) {
      return response.status(400).json({ error: 'A senha informada não poderá ser vazia, nula ou indefinida!' });
    }

    // Criar um novo usuário e retorná-lo.
    const user = await UserRepository.create({
      name,
      email,
      password,
      ramal,
      role,
      sector,
    });

    response.json(user);
  }

  // Método assíncrono para atualizar um usuário existente.
  async update(request, response) {
    // Obter o ID a partir dos parâmetros da requisição.
    const { id } = request.params;
    const {
      name, email, password, ramal, role, sector,
    } = request.body;

    // Verificar se o usuário com o ID especificado existe.
    const userExists = await UserRepository.findById(id);

    if (!userExists) {
      return response.status(404).json({ error: 'Este usuário não existe!' });
    }

    if (password === '' || password === null || password === undefined) {
      return response.status(400).json({ error: 'A senha informada não poderá ser vazia, nula ou indefinida!' });
    }

    // Verificar se o email já está em uso por outro usuário.
    const userByEmail = await UserRepository.findByEmail(email);

    if (userByEmail && userByEmail.id !== id) {
      return response.status(400).json({ error: 'O e-mail informado já está sendo utilizado!' });
    }

    // Atualizar os dados do usuário e retorná-lo.
    const user = await UserRepository.update(id, {
      name,
      email,
      password,
      ramal,
      role,
      sector,
    });

    response.json(user);
  }

  // Método assíncrono para excluir um usuário existente.
  async delete(request, response) {
    // Obter o ID a partir dos parâmetros da requisição.
    const { id } = request.params;

    // Verificar se o usuário com o ID especificado existe.
    const user = await UserRepository.findById(id);

    if (!user) {
      return response.status(404).json({ error: 'Este usuário não existe!' });
    }

    // Excluir o usuário e retornar uma mensagem de sucesso.
    await UserRepository.delete(id);

    response.json({ sucesso: 'O usuário foi removido com sucesso!' });
  }
}

// Exportar uma instância do controlador UserController.
module.exports = new UserController();
