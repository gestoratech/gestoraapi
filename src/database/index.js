// Importa o módulo 'pg' que fornece funcionalidades de acesso ao banco de dados PostgreSQL.
const { Client } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const connection = process.env.DATABASE_URL

// Cria uma instância do cliente PostgreSQL para conectar ao banco de dados.
const client = new Client({
  connectionString: connection,
});

// 

// Estabelece uma conexão com o banco de dados.
client.connect();

// Exporta uma função chamada 'query' para executar consultas SQL no banco de dados.
exports.query = async (query, values) => {
  // Executa a consulta SQL no banco de dados usando o cliente PostgreSQL.
  const { rows } = await client.query(query, values);

  // Retorna as linhas (registros) resultantes da consulta.
  return rows;
};
