const {Sequelize, DataTypes, Model } = require('sequelize');
const db = require('../database');

class Company extends Model {}

Company.init({
    name: DataTypes.STRING,
    id: {type : DataTypes.UUID, defaultValue: Sequelize.UUIDV4, primaryKey: true} 
}, {
    sequelize : db,
    modelName: "Company"
})

module.exports = Company;