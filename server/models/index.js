const Sequelize = require('sequelize');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();
const DBNAME = process.env.dbname;
const DBHOST = process.env.dbhost;
const DBUSER = process.env.dbuser;
const DBPASSWORD = process.env.dbpassword;

const sequelize = new Sequelize(
  DBNAME,
  DBUSER,
  DBPASSWORD,
  {
    host: DBHOST,
    dialect: 'mysql',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

const db = {
  Sequelize,
  sequelize
};

// User Model
db.user = require('./user.model')(sequelize, Sequelize);
// Role Model
db.role = require('./role.model')(sequelize, Sequelize);
db.role.belongsToMany(db.user, {
  through: 'user_roles',
  foreignKey: 'roleId',
  otherKey: 'userId'
});
db.user.belongsToMany(db.role, {
  through: 'user_roles',
  foreignKey: 'userId',
  otherKey: 'roleId'
});
db.ROLES = ['user', 'admin'];
// Todo Model
db.todo = require('./todo.model')(sequelize, Sequelize);
db.todo.belongsTo(db.user, {
  foreignKey: 'userId',
  as: 'user'
});
db.user.hasMany(db.todo, {
  as: 'todo'
});

module.exports = db;
