
const chai = require('chai');
const sinon = require('sinon');
const dbHelper = require('./dbHelper');
const db = require('../models');

const expect = chai.expect;

const {
  role: Role,
  user: User
} = db;

describe('dbHelper', function () {
  afterEach(function () {
    sinon.restore();
  });

  describe('initializeDb', function () {
    it('should sync db tables', async function () {
      const syncStub = sinon.stub(db.sequelize, 'sync').resolves();
      dbHelper.initializeDb('false');
      expect(syncStub.calledWithExactly({})).to.equal(true);
    });
    it('should be able to recreate db when passed with "true"', async function () {
      const syncStub = sinon.stub(db.sequelize, 'sync').resolves();
      sinon.stub(Role, 'create').resolves();
      sinon.stub(Role, 'findAll').resolves([]);
      sinon.stub(User, 'create').resolves({ setRoles: () => {} });
      dbHelper.initializeDb('true');
      expect(syncStub.calledWithExactly({ force: true })).to.equal(true);
    });
  });
  describe('seed', function () {
    it('should populate default roles and user', async function () {
      const roleStub = sinon.stub(Role, 'create').resolves();
      const userStub = sinon.stub(User, 'create').resolves({ setRoles: () => {} });
      sinon.stub(Role, 'findAll').resolves([]);
      dbHelper.seed();
      expect(roleStub.callCount).to.equal(2);
      expect(userStub.callCount).to.equal(1);
    });
  });
});
