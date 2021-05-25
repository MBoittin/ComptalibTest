const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('CzWVx0QARn', 'CzWVx0QARn', 'gWRg60u3aY', {
    host: 'remotemysql.com',
    dialect: 'mysql',
    logging: false
});

module.exports = sequelize