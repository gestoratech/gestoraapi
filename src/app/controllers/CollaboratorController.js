const CollaboratorRepository = require('../repositories/CollaboratorRepository');

class CollaboratorController {
  async index(request, response) {
    const { orderBy } = request.query;
    const collaborators = await CollaboratorRepository.findAll(orderBy);

    response.json(collaborators);
  }

  async show(request, response) {
    const { id } = request.params;
    const collaborator = await CollaboratorRepository.findById(id);

    if (!collaborator) {
      return response.status(404).json({ error: 'Este colaborador não existe!' });
    }

    response.json(collaborator);
  }

  async store(request, response) {
    const {
      name, email, pass_email, skype, pass_skype, gmail,
      pass_gmail, env_user, env_pass_user,
    } = request.body;

    const collaboratorExists = await CollaboratorRepository.findByEmail(email);

    if (collaboratorExists) {
      return response.status(400).json({ error: 'O email do colaborador informado já está sendo utilizado!' });
    }

    const collaborator = await CollaboratorRepository.create({
      name,
      email,
      pass_email,
      skype,
      pass_skype,
      gmail,
      pass_gmail,
      env_user,
      env_pass_user,
    });

    response.json(collaborator);
  }

  async update(request, response) {
    const { id } = request.params;
    const {
      name, email, pass_email, skype, pass_skype, gmail,
      pass_gmail, env_user, env_pass_user,
    } = request.body;

    const collaboratorExists = await CollaboratorRepository.findById(id);

    if (!collaboratorExists) {
      return response.status(404).json({ error: 'Este colaborador não existe!' });
    }

    const findByCollaborator = await CollaboratorRepository.findByEmail(email);

    if (findByCollaborator && findByCollaborator.id !== id) {
      return response.status(400).json({ error: 'O patrimônio informado já está sendo utilizado!' });
    }

    const collaborator = await CollaboratorRepository.update(id, {
      name,
      email,
      pass_email,
      skype,
      pass_skype,
      gmail,
      pass_gmail,
      env_user,
      env_pass_user,
    });

    response.json(collaborator);
  }

  async delete(request, response) {
    const { id } = request.params;

    const collaborator = await CollaboratorRepository.findById(id);

    if (!collaborator) {
      return response.status(404).json({ error: 'Este colaborador não existe!' });
    }

    await CollaboratorRepository.delete(id);

    response.json({ sucesso: 'O colaborador foi removido com sucesso!' });
  }
}

module.exports = new CollaboratorController();
