const { authenticationMiddleware } = require('../middlewares');
const controller = require('../controllers/todo.controller');
const { Router } = require('express');
const router = new Router();

router.get('/',
  [authenticationMiddleware.verifyToken],
  controller.getAll);
router.post('/',
  [authenticationMiddleware.verifyToken],
  controller.create);
router.get(
  '/:id',
  [authenticationMiddleware.verifyToken],
  controller.getById
);
router.put(
  '/:id',
  [authenticationMiddleware.verifyToken],
  controller.updateById
);
router.delete(
  '/:id',
  [authenticationMiddleware.verifyToken],
  controller.deleteById
);

module.exports = router;
