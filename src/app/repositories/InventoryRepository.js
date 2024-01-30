// Importa o módulo de conexão com o banco de dados
const db = require('../../database');

// Define a classe InventoryRepository
class InventoryRepository {
  // Método assíncrono para buscar todos os inventários com opção de ordenação
  async findAll(orderBy = 'ASC') {
    const direction = orderBy.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
    const rows = await db.query(`
      SELECT *
      FROM inventories
      ORDER BY username ${direction}
    `);
    return rows;
  }

  // Método assíncrono para buscar um inventário pelo ID
  async findById(id) {
    const [row] = await db.query('SELECT * FROM inventories WHERE id = $1', [id]);
    return row;
  }

  // Método assíncrono para buscar um inventário pelo número do patrimônio (asset)
  async findByUser(asset) {
    const [row] = await db.query('SELECT * FROM inventories WHERE asset = $1', [asset]);
    return row;
  }

  // Método assíncrono para criar um novo inventário
  async create({
    username, sector, model, brand, asset, equipment, keyboard, mouse,
  }) {
    const [row] = await db.query(`
      INSERT INTO inventories (asset, model, brand, username, sector, equipment, keyboard, mouse)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *
    `, [asset, model, brand, username, sector, equipment, keyboard, mouse]);
    return row;
  }

  // Método assíncrono para atualizar um inventário existente pelo ID
  async update(id, {
    asset, model, brand, username, sector, equipment, keyboard, mouse,
  }) {
    const [row] = await db.query(`
      UPDATE inventories
      SET asset = $1, model = $2, brand = $3, username = $4, 
      sector = $5, equipment = $6, keyboard = $7, mouse = $8
      WHERE id = $9
      RETURNING *
    `, [asset, model, brand, username, sector, equipment, keyboard, mouse, id]);
    return row;
  }

  // Método assíncrono para excluir um inventário pelo ID
  async delete(id) {
    const deleteOp = await db.query('DELETE FROM inventories WHERE id = $1', [id]);
    return deleteOp;
  }
}

// Exporta uma instância da classe InventoryRepository
module.exports = new InventoryRepository();
