module.exports = (sequelize, Sequelize) => {
  const Todo = sequelize.define('todos', {
    content: {
      type: Sequelize.STRING
    },
    datetime: {
      type: Sequelize.DATE
    }
  });

  return Todo;
};
