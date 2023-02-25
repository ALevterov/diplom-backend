const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const ClassifiedWebsites = sequelize.define('classSites', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	url: { type: DataTypes.STRING, allowNull: false },
	lastUpdate: { type: DataTypes.STRING, allowNull: false },
	thematic: { type: DataTypes.STRING, allowNull: false },
})

const User = sequelize.define('user', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  email: { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING },
  roles: { type: DataTypes.ARRAY(DataTypes.STRING) },
})

const Thematic = sequelize.define('thematic', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true },
  keywords: { type: DataTypes.ARRAY(DataTypes.STRING) },
})
module.exports = {
  ClassifiedWebsites,
  User,
	Thematic
}