const db = require('../../database');

class CollaboratorRepository {
  async findAll(orderBy = 'ASC') {
    const direction = orderBy.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
    const rows = await db.query(`SELECT *
                                 FROM collaborators
                                 ORDER BY name ${direction}`);
    return rows;
  }

  async findById(id) {
    const [row] = await db.query('SELECT * FROM collaborators WHERE id = $1', [id]);
    return row;
  }

  async findByEmail(email) {
    const [row] = await db.query('SELECT * FROM collaborators WHERE email = $1', [email]);
    return row;
  }

  async create({
    name, email, pass_email, skype, pass_skype, gmail,
    pass_gmail, env_user, env_pass_user,
  }) {
    const [row] = await db.query(`INSERT INTO collaborators (name, email, pass_email, skype, pass_skype, gmail, pass_gmail, env_user, env_pass_user) 
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *`, [name, email, pass_email, skype, pass_skype, gmail,
      pass_gmail, env_user, env_pass_user]);
    return row;
  }

  async update(id, {
    name, email, pass_email, skype, pass_skype, gmail, pass_gmail,
    env_user, env_pass_user,
  }) {
    const [row] = await db.query(`UPDATE collaborators SET name = $1, email = $2, pass_email = $3, skype = $4, pass_skype = $5, 
    gmail = $6, pass_gmail = $7, env_user = $8, env_pass_user = $9 WHERE id = $10 RETURNING *`, [name, email, pass_email, skype, pass_skype, gmail,
      pass_gmail, env_user, env_pass_user, id]);
    return row;
  }

  async delete(id) {
    const deleteOp = await db.query('DELETE FROM collaborators WHERE id = $1', [id]);
    return deleteOp;
  }
}
module.exports = new CollaboratorRepository();
