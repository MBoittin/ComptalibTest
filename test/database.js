const { Sequelize } = require('sequelize');
const assert = require('assert');

const sequelize = new Sequelize('CzWVx0QARn', 'CzWVx0QARn', 'gWRg60u3aY', {
    host: 'remotemysql.com',
    dialect: 'mysql'
});

describe('Database', function() {
  describe('Connection', function() {
    it('should connect and authenticate with the database', function() {
        return sequelize.authenticate()
        .then((err) => {assert.ok(true);}, 
        (err) => {assert.ok(false, err)})
    });
  });
});