const { v4: uuid } = require('uuid'); // Importa a função UUID da biblioteca 'uuid'.
const bcrypt = require('bcrypt'); // Importa a biblioteca 'bcrypt' para criptografia de senhas.

const db = require('../../database'); // Importa o módulo de acesso ao banco de dados.

class UserRepository {
  async findAll(orderBy = 'ASC') {
    // Lista todos os registros de usuários, com opção de ordenação.
    const direction = orderBy.toUpperCase() === 'DESC' ? 'DESC' : 'ASC'; // Verifica a direção da ordenação (ASC ou DESC).
    const rows = await db.query(`SELECT id, name, email, ramal, role, sector FROM users ORDER BY name ${direction}`); // Executa a consulta SQL no banco de dados.
    return rows; // Retorna os resultados.
  }

  async findById(id) {
    // Busca um usuário pelo ID.
    const [row] = await db.query('SELECT * FROM users WHERE id = $1', [id]); // Executa uma consulta para encontrar um usuário pelo ID.
    return row; // Retorna o usuário encontrado ou undefined se não existir.
  }

  async findByEmail(email) {
    // Busca um usuário pelo email.
    const [row] = await db.query('SELECT * FROM users WHERE email = $1', [email]); // Executa uma consulta para encontrar um usuário pelo email.
    return row; // Retorna o usuário encontrado ou undefined se não existir.
  }

  async create({
    name, email, password, ramal = 0, role = 'Usuário', sector = 'Indeterminado',
  }) {
    // Cria um novo usuário.
    const passwordProtected = await bcrypt.hash(password, 8); // Criptografa a senha do usuário.
    const [row] = await db.query('INSERT INTO users (name, email, password, ramal, role, sector) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', [name, email, passwordProtected, ramal, role, sector]);
    // Executa uma consulta SQL para inserir um novo usuário no banco de dados.
    return row; // Retorna o novo usuário criado.
  }

  async update(id, {
    name, email, password, ramal, role, sector,
  }) {
    // Atualiza os dados de um usuário.
    const passwordProtected = await bcrypt.hash(password, 8); // Criptografa a senha do usuário.
    const [row] = await db.query('UPDATE users SET name = $1, email = $2, password = $3, ramal = $4, role = $5, sector = $6 WHERE id = $7 RETURNING *', [name, email, passwordProtected, ramal, role, sector, id]);
    // Executa uma consulta SQL para atualizar os dados de um usuário.
    return row; // Retorna o usuário atualizado.
  }

  async delete(id) {
    // Exclui um usuário pelo ID.
    const deleteOp = await db.query('DELETE FROM users WHERE id = $1', [id]); // Executa uma consulta SQL para excluir um usuário.
    return deleteOp; // Retorna o resultado da operação de exclusão.
  }
}

module.exports = new UserRepository(); // Exporta uma instância da classe UserRepository.
