// Importa o módulo jsonwebtoken
const jwt = require('jsonwebtoken');

// Função middleware para verificar se o usuário está autenticado
function isAuthenticated(req, res, next) {
  // Obtém o token de autenticação do cabeçalho da requisição
  const { authorization } = req.headers;

  // Verifica se o token foi fornecido
  if (!authorization) {
    return res.status(401).json({ error: 'O token de autenticação não foi informado' });
  }

  // Divide o token do cabeçalho
  const [, token] = authorization.split(' ');

  try {
    // Verifica se o token é válido usando a chave secreta configurada no ambiente
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Obtém o ID do usuário a partir do token decodificado
    const { id } = decoded;

    // Adiciona o ID do usuário à requisição para uso posterior
    req.user_id = id;

    // Chama o próximo middleware na cadeia de execução
    next();
  } catch (error) {
    // Trata erros de validação do token
    return res.status(401).json({ error: 'O token de autenticação fornecido está inválido' });
  }
}

// Exporta a função middleware isAuthenticated
module.exports = isAuthenticated;
