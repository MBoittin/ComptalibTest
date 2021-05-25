const {Sequelize, DataTypes, Model } = require('sequelize');
const db = require('../database');

class CompanyToUser extends Model {}

CompanyToUser.init({
    companyId: {type : DataTypes.UUID, primaryKey: true},
    userId: {type : DataTypes.UUID, primaryKey: true}
}, {
    sequelize : db,
    modelName: "CompanyToUser"
})

module.exports = CompanyToUser;