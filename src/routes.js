// Importa o módulo Router do framework Express para definir rotas.
const { Router } = require('express');

// Importa os controladores (controllers) para lidar com as requisições nas rotas.
const UserController = require('./app/controllers/UserController');
const InventoryController = require('./app/controllers/InventoryController');
const CollaboratorController = require('./app/controllers/CollaboratorController');
const AuthController = require('./app/controllers/AuthController');

// Importa o middleware de autenticação.
const isAuthenticated = require('./app/middlewares/isAuthenticated');

// Cria uma instância do Router.
const router = Router();

// Rotas Usuários
router.get('/usuarios', UserController.index);
router.get('/usuarios/:id', UserController.show);
router.delete('/usuarios/:id', UserController.delete);
router.post('/usuarios', UserController.store);
router.put('/usuarios/:id', UserController.update);

// Rotas Inventários
router.get('/inventarios', InventoryController.index);
router.get('/inventarios/:id', InventoryController.show);
router.delete('/inventarios/:id', InventoryController.delete);
router.post('/inventarios', InventoryController.store);
router.put('/inventarios/:id', InventoryController.update);

// Rotas Colaboradores
router.get('/colaboradores', CollaboratorController.index);
router.get('/colaboradores/:id', CollaboratorController.show);
router.delete('/colaboradores/:id', CollaboratorController.delete);
router.post('/colaboradores', CollaboratorController.store);
router.put('/colaboradores/:id', CollaboratorController.update);

// Rota Autenticação
router.post('/auth', AuthController.store);

// Exporta as rotas definidas.
module.exports = router;
