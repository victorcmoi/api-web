'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {}
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};