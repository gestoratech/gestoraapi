const express = require('express');
require('express-async-errors');
const cors = require('cors');
require('dotenv').config();
const routes = require('./routes');

const app = express();

app.use(express.json());
app.use(cors());
app.use(routes);
app.use((err, req, res, next) => {
  if (err instanceof Error) {
    return res.status(400).json({
      error: err.message,
    });
  }

  return res.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

app.listen(3333, () => {
  console.log('API => Conectado na porta: 3333');
});
