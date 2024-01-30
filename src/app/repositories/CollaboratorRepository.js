// Importa o módulo de conexão com o banco de dados
const db = require('../../database');

// Define a classe CollaboratorRepository
class CollaboratorRepository {
  // Método assíncrono para buscar todos os colaboradores com opção de ordenação
  async findAll(orderBy = 'ASC') {
    const direction = orderBy.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
    const rows = await db.query(`
      SELECT *
      FROM collaborators
      ORDER BY name ${direction}
    `);
    return rows;
  }

  // Método assíncrono para buscar um colaborador pelo ID
  async findById(id) {
    const [row] = await db.query('SELECT * FROM collaborators WHERE id = $1', [id]);
    return row;
  }

  // Método assíncrono para buscar um colaborador pelo email
  async findByEmail(email) {
    const [row] = await db.query('SELECT * FROM collaborators WHERE email = $1', [email]);
    return row;
  }

  // Método assíncrono para criar um novo colaborador
  async create({
    name, email, pass_email, skype, pass_skype, gmail,
    pass_gmail, env_user, env_pass_user,
  }) {
    const [row] = await db.query(`
      INSERT INTO collaborators (name, email, pass_email, skype, pass_skype, gmail, pass_gmail, env_user, env_pass_user)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING *
    `, [name, email, pass_email, skype, pass_skype, gmail, pass_gmail, env_user, env_pass_user]);
    return row;
  }

  // Método assíncrono para atualizar um colaborador existente pelo ID
  async update(id, {
    name, email, pass_email, skype, pass_skype, gmail, pass_gmail,
    env_user, env_pass_user,
  }) {
    const [row] = await db.query(`
      UPDATE collaborators
      SET name = $1, email = $2, pass_email = $3, skype = $4, pass_skype = $5, 
      gmail = $6, pass_gmail = $7, env_user = $8, env_pass_user = $9
      WHERE id = $10
      RETURNING *
    `, [name, email, pass_email, skype, pass_skype, gmail, pass_gmail, env_user, env_pass_user, id]);
    return row;
  }

  // Método assíncrono para excluir um colaborador pelo ID
  async delete(id) {
    const deleteOp = await db.query('DELETE FROM collaborators WHERE id = $1', [id]);
    return deleteOp;
  }
}

// Exporta uma instância da classe CollaboratorRepository
module.exports = new CollaboratorRepository();
