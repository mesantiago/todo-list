const db = require('../models');
const {
  user: User
} = db;

exports.getAll = (req, res, next) => {
  User.findAll()
    .then(users => {
      res.status(200).send({
        users
      });
    })
    .catch(next);
};

exports.getById = (req, res, next) => {
  if (!req.params.id) {
    return res.status(400).send({
      message: 'Id is required'
    });
  }
  User.findByPk(req.params.id)
    .then(user => {
      if (!user) {
        return res.status(404).send({
          message: 'User not found'
        });
      }
      res.status(200).send(user);
    })
    .catch(next);
};
