// Importa a função UUID da biblioteca 'uuid'.
const { v4: uuid } = require('uuid');
// Importa a biblioteca 'bcrypt' para criptografia de senhas.
const bcrypt = require('bcrypt');
// Importa o módulo de acesso ao banco de dados.
const db = require('../../database');

// Define a classe UserRepository
class UserRepository {
  // Método assíncrono para listar todos os usuários, com opção de ordenação.
  async findAll(orderBy = 'ASC') {
    // Verifica a direção da ordenação (ASC ou DESC).
    const direction = orderBy.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
    // Executa a consulta SQL no banco de dados.
    const rows = await db.query(`
      SELECT id, name, email, ramal, role, sector
      FROM users
      ORDER BY name ${direction}
    `);
    // Retorna os resultados.
    return rows;
  }

  // Método assíncrono para buscar um usuário pelo ID.
  async findById(id) {
    // Executa uma consulta para encontrar um usuário pelo ID.
    const [row] = await db.query('SELECT * FROM users WHERE id = $1', [id]);
    // Retorna o usuário encontrado ou undefined se não existir.
    return row;
  }

  // Método assíncrono para buscar um usuário pelo email.
  async findByEmail(email) {
    // Executa uma consulta para encontrar um usuário pelo email.
    const [row] = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    // Retorna o usuário encontrado ou undefined se não existir.
    return row;
  }

  // Método assíncrono para criar um novo usuário.
  async create({
    name, email, password, ramal = 0, role = 'Usuário', sector = 'Indeterminado',
  }) {
    // Criptografa a senha do usuário.
    const passwordProtected = await bcrypt.hash(password, 8);
    // Executa uma consulta SQL para inserir um novo usuário no banco de dados.
    const [row] = await db.query(`
      INSERT INTO users (name, email, password, ramal, role, sector)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
    `, [name, email, passwordProtected, ramal, role, sector]);
    // Retorna o novo usuário criado.
    return row;
  }

  // Método assíncrono para atualizar os dados de um usuário.
  async update(id, {
    name, email, password, ramal, role, sector,
  }) {
    // Criptografa a senha do usuário.
    const passwordProtected = await bcrypt.hash(password, 8);
    // Executa uma consulta SQL para atualizar os dados de um usuário.
    const [row] = await db.query(`
      UPDATE users
      SET name = $1, email = $2, password = $3, ramal = $4, role = $5, sector = $6
      WHERE id = $7
      RETURNING *
    `, [name, email, passwordProtected, ramal, role, sector, id]);
    // Retorna o usuário atualizado.
    return row;
  }

  // Método assíncrono para excluir um usuário pelo ID.
  async delete(id) {
    // Executa uma consulta SQL para excluir um usuário.
    const deleteOp = await db.query('DELETE FROM users WHERE id = $1', [id]);
    // Retorna o resultado da operação de exclusão.
    return deleteOp;
  }
}

// Exporta uma instância da classe UserRepository.
module.exports = new UserRepository();
