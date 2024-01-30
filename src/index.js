// Importa o framework Express para construir aplicativos web.
const express = require('express');
// Importa o pacote 'express-async-errors' para tratamento de erros assíncronos.
require('express-async-errors');
// Importa o pacote CORS para permitir solicitações de origens diferentes.
const cors = require('cors');
// Importa o pacote 'dotenv' para carregar variáveis de ambiente a partir de um arquivo .env.
require('dotenv').config();
// Importa as rotas definidas no arquivo routes.js.
const routes = require('./routes');

// Cria uma instância do aplicativo Express.
const app = express();

// Configuração para utilizar JSON como formato de dados nas requisições e respostas.
app.use(express.json());
// Configuração para permitir solicitações de origens diferentes.
app.use(cors());
// Configuração para usar as rotas definidas no arquivo routes.js.
app.use(routes);

// Middleware para tratamento de erros.
app.use((err, req, res, next) => {
  // Verifica se o erro é uma instância da classe Error.
  if (err instanceof Error) {
    // Retorna uma resposta com status 400 e a mensagem de erro.
    return res.status(400).json({
      error: err.message,
    });
  }

  // Retorna uma resposta com status 500 e uma mensagem de erro genérica.
  return res.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

// Inicia o servidor na porta 3333 e exibe uma mensagem no console.
app.listen(3333, () => {
  console.log('API => Conectado na porta: 3333');
});
