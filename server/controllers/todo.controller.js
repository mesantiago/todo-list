const db = require('../models');
const {
  todo: Todo
} = db;

exports.getAll = (req, res, next) => {
  Todo.findAll({
    where: {
      userId: req.userId
    }
  })
    .then(todo => {
      res.status(200).send({
        todo
      });
    })
    .catch(next);
};

exports.create = (req, res, next) => {
  if (!req.body) {
    res.status(400).send({ message: 'Missing body' });
  }
  if (!req.body.content) {
    res.status(400).send({ message: 'Content is required' });
  }
  if (!req.body.datetime) {
    // Default to current date time
    req.body.datetime = new Date();
  }
  Todo.create({
    userId: req.userId,
    datetime: req.body.datetime,
    content: req.body.content
  })
    .then(todo => {
      res.status(200).send(todo);
    })
    .catch(next);
};

exports.getById = (req, res, next) => {
  if (!req.params.id) {
    return res.status(400).send({
      message: 'Id is required'
    });
  }
  Todo.findOne({
    where: {
      id: req.params.id,
      userId: req.userId
    }
  })
    .then(todo => {
      if (!todo) {
        return res.status(404).send({
          message: 'Todo not found'
        });
      }
      res.status(200).send(todo);
    })
    .catch(next);
};

exports.updateById = (req, res, next) => {
  if (!req.params.id) {
    return res.status(400).send({
      message: 'Id is required'
    });
  }
  if (!req.body) {
    res.status(400).send({ message: 'Missing body' });
  }
  if (!req.body.content) {
    res.status(400).send({ message: 'Content is required' });
  }
  if (!req.body.datetime) {
    // Default to current date time
    req.body.datetime = new Date();
  }
  Todo.findOne({
    where: {
      id: req.params.id,
      userId: req.userId
    }
  })
    .then(todo => {
      if (!todo) {
        return res.status(404).send({
          message: 'Todo not found'
        });
      }
      todo.update({
        datetime: req.body.datetime,
        content: req.body.content
      })
        .then(updated => {
          res.status(200).send(updated);
        });
    })
    .catch(next);
};

exports.deleteById = (req, res, next) => {
  if (!req.params.id) {
    return res.status(400).send({
      message: 'Id is required'
    });
  }
  Todo.findOne({
    where: {
      id: req.params.id,
      userId: req.userId
    }
  })
    .then(todo => {
      if (!todo) {
        return res.status(404).send({
          message: 'Todo not found'
        });
      }
      todo.destroy().then(() => {
        res.status(204).send();
      });
    })
    .catch(next);
};
