const db = require('../models');
const bcrypt = require('bcryptjs');
const {
  role: Role,
  user: User
} = db;
const Op = db.Sequelize.Op;

const initializeDb = recreateDb => {
  const syncOptions = {};
  if (recreateDb.toLowerCase() === 'true') {
    syncOptions.force = true;
  }
  // This wil drop and recreate db
  db.sequelize.sync(syncOptions).then(() => {
    if (syncOptions.force) {
      seed();
    }
  });
};

function seed () {
  // Seed Roles
  Role.create({
    id: 1,
    name: 'user'
  });
  Role.create({
    id: 2,
    name: 'admin'
  });

  // Seed default admin user
  User.create({
    username: 'admin',
    email: 'admin@email.com',
    password: bcrypt.hashSync('admin', 8)
  }).then(user => {
    Role.findAll({
      where: {
        name: {
          [Op.or]: ['admin']
        }
      }
    }).then(roles => {
      user.setRoles(roles);
    });
  });
}

module.exports = {
  initializeDb,
  seed
};
