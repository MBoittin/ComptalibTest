const {Sequelize, DataTypes, Model } = require('sequelize');
const db = require('../database');

class User extends Model {}

User.init({
    name: DataTypes.STRING,
    id: {type : DataTypes.UUID, defaultValue: Sequelize.UUIDV4, primaryKey: true} 
}, {
    sequelize : db,
    modelName: "User"
})

module.exports = User;