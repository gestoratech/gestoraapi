const jwt = require('jsonwebtoken');

function isAuthenticated(req, res, next) {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: 'O token de autenticação não foi informado' });
  }

  const [, token] = authorization.split(' ');
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { id } = decoded;

    req.user_id = id;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'O token de autenticação fornecido está inválido' });
  }
}

module.exports = isAuthenticated;
