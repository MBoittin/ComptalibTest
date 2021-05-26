const {Sequelize, DataTypes, Model } = require('sequelize');
const db = require('../database');

class CompanyToUser extends Model {}

CompanyToUser.init({
    companyId: {type : DataTypes.UUID, primaryKey: true, allowNull: false},
    userId: {type : DataTypes.UUID, primaryKey: true, allowNull: false}
}, {
    sequelize : db,
    modelName: "CompanyToUser"
})

CompanyToUser.sync({})

module.exports = CompanyToUser;