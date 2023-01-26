const db = require('../models');
const ROLES = db.ROLES;
const User = db.user;

const checkRequired = (req, res, next) => {
  let error;
  if (!req.body) {
    error = new Error('body is required');
  }
  if (!req.body.username) {
    error = new Error('username is required');
  }
  if (!req.body.email) {
    error = new Error('email is required');
  }
  if (!req.body.password) {
    error = new Error('password is required');
  }
  if (error) {
    res.status(400).send({
      message: error.message
    });
  } else {
    next();
  }
};

const checkDuplicateUsernameOrEmail = (req, res, next) => {
  // Username
  User.findOne({
    where: {
      username: req.body.username
    }
  }).then(user => {
    if (user) {
      res.status(400).send({
        message: 'Failed! Username is already in use!'
      });
      return;
    }

    // Email
    User.findOne({
      where: {
        email: req.body.email
      }
    }).then(user => {
      if (user) {
        res.status(400).send({
          message: 'Failed! Email is already in use!'
        });
        return;
      }
      next();
    });
  });
};

const checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        res.status(400).send({
          message: 'Failed! Role does not exist = ' + req.body.roles[i]
        });
        return;
      }
    }
  }
  next();
};

module.exports = {
  checkRequired,
  checkDuplicateUsernameOrEmail,
  checkRolesExisted
};
