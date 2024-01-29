const db = require('../../database');

class InventoryRepository {
  async findAll(orderBy = 'ASC') {
    const direction = orderBy.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
    const rows = await db.query(`SELECT *
                                 FROM inventories
                                 ORDER BY username ${direction}`);
    return rows;
  }

  async findById(id) {
    const [row] = await db.query('SELECT * FROM inventories WHERE id = $1', [id]);
    return row;
  }

  async findByUser(asset) {
    const [row] = await db.query('SELECT * FROM inventories WHERE asset = $1', [asset]);
    return row;
  }

  async create({
    username, sector, model, brand, asset, equipment, keyboard, mouse,
  }) {
    const [row] = await db.query(`INSERT INTO inventories (asset, model, brand, username, sector, equipment, keyboard, mouse) 
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *`, [asset, model, brand, username, sector, equipment, keyboard, mouse]);
    return row;
  }

  async update(id, {
    asset, model, brand, username, sector, equipment, keyboard, mouse,
  }) {
    const [row] = await db.query(`UPDATE inventories SET asset = $1, model = $2, brand = $3, username = $4, 
    sector = $5, equipment = $6, keyboard = $7, mouse = $8 WHERE id = $9 RETURNING *`, [asset, model, brand, username, sector,
      equipment, keyboard, mouse, id]);
    return row;
  }

  async delete(id) {
    const deleteOp = await db.query('DELETE FROM inventories WHERE id = $1', [id]);
    return deleteOp;
  }
}
module.exports = new InventoryRepository();
