// Importa o módulo 'pg' que fornece funcionalidades de acesso ao banco de dados PostgreSQL.
const { Client } = require('pg');

// Cria uma instância do cliente PostgreSQL para conectar ao banco de dados.
const client = new Client({
  host: 'localhost', // Endereço do servidor PostgreSQL.
  port: 5432, // Porta padrão para conexão com o PostgreSQL.
  user: 'root', // Nome de usuário do banco de dados.
  password: 'root', // Senha do usuário do banco de dados.
  database: 'gestoratech', // Nome do banco de dados que será usado.
});

// Estabelece uma conexão com o banco de dados.
client.connect();

// Exporta uma função chamada 'query' para executar consultas SQL no banco de dados.
exports.query = async (query, values) => {
  // Executa a consulta SQL no banco de dados usando o cliente PostgreSQL.
  const { rows } = await client.query(query, values);

  // Retorna as linhas (registros) resultantes da consulta.
  return rows;
};
