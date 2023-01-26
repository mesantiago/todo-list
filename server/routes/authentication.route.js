const { signupMiddleware, authenticationMiddleware } = require('../middlewares');
const controller = require('../controllers/authentication.controller');
const { Router } = require('express');
const router = new Router();

router.post(
  '/signup',
  [
    signupMiddleware.checkRequired,
    signupMiddleware.checkDuplicateUsernameOrEmail,
    signupMiddleware.checkRolesExisted
  ],
  controller.signup
);
router.post('/signin', controller.signin);
router.get('/me',
  [authenticationMiddleware.verifyToken],
  controller.me);

module.exports = router;
