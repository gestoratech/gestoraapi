// Importa o módulo InventoryRepository
const InventoryRepository = require('../repositories/InventoryRepository');

// Define a classe InventoryController
class InventoryController {
  // Método assíncrono para listar todos os inventários
  async index(request, response) {
    const { orderBy } = request.query;
    const inventories = await InventoryRepository.findAll(orderBy);

    response.json(inventories);
  }

  // Método assíncrono para mostrar informações de um inventário específico
  async show(request, response) {
    const { id } = request.params;
    const inventory = await InventoryRepository.findById(id);

    if (!inventory) {
      return response.status(404).json({ error: 'Este inventário não existe!' });
    }

    response.json(inventory);
  }

  // Método assíncrono para cadastrar um novo inventário
  async store(request, response) {
    const {
      asset, model, brand, username, sector, equipment, keyboard, mouse,
    } = request.body;

    const inventoryExists = await InventoryRepository.findByUser(asset);

    if (inventoryExists) {
      return response.status(400).json({ error: 'O patrimônio informado já está sendo utilizado!' });
    }

    const inventory = await InventoryRepository.create({
      asset, model, brand, username, sector, equipment, keyboard, mouse,
    });

    response.json(inventory);
  }

  // Método assíncrono para atualizar informações de um inventário
  async update(request, response) {
    const { id } = request.params;
    const {
      asset, model, brand, username, sector, equipment, keyboard, mouse,
    } = request.body;

    const inventoryExists = await InventoryRepository.findById(id);

    if (!inventoryExists) {
      return response.status(404).json({ error: 'Este inventário não existe!' });
    }

    const findByUser = await InventoryRepository.findByUser(asset);

    if (findByUser && findByUser.id !== id) {
      return response.status(400).json({ error: 'O patrimônio informado já está sendo utilizado!' });
    }

    const inventory = await InventoryRepository.update(id, {
      asset, model, brand, username, sector, equipment, keyboard, mouse,
    });

    response.json(inventory);
  }

  // Método assíncrono para deletar um inventário
  async delete(request, response) {
    const { id } = request.params;

    const inventory = await InventoryRepository.findById(id);

    if (!inventory) {
      return response.status(404).json({ error: 'Este inventário não existe!' });
    }

    await InventoryRepository.delete(id);

    response.json({ sucesso: 'O inventário foi removido com sucesso!' });
  }
}

// Exporta uma instância da classe InventoryController
module.exports = new InventoryController();
