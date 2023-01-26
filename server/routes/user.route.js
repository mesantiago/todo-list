const { authenticationMiddleware } = require('../middlewares');
const controller = require('../controllers/user.controller');
const { Router } = require('express');
const router = new Router();

router.get('/',
  [authenticationMiddleware.verifyToken, authenticationMiddleware.isAdmin],
  controller.getAll);

router.get(
  '/:id',
  [authenticationMiddleware.verifyToken, authenticationMiddleware.isAdmin],
  controller.getById
);

module.exports = router;
