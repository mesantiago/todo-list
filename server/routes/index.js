const { Router } = require('express');
const router = new Router();

router.use(function (req, res, next) {
  res.header(
    'Access-Control-Allow-Headers',
    'x-access-token, Origin, Content-Type, Accept'
  );
  next();
});

// Index router
router.get('/', (req, res) => {
  res.json({ message: 'Welcome to todolist application.' });
});

// List of routers
router.use('/auth', require('./authentication.route'));
router.use('/users', require('./user.route'));
router.use('/todo', require('./todo.route'));

// Error handler
router.use((error, req, res, next) => {
  console.log('Error: ', error.message);
  res.status(500).send({
    message: error.message
  });
});

module.exports = router;
