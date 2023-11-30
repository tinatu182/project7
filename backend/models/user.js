const { Model, DataTypes } = require('sequelize');

// User Schema
// const userSchema = mongoose.Schema({
//   firstName: { type: String, required: true },
//   lastName: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
// });
module.exports = (sequelize, DataTypes) => {

  class User extends Model { }

  User.init({
    // Model attributes are defined here
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING
      // allowNull defaults to true
    },
    email: {
      type: DataTypes.STRING,
      unique: true
      // allowNull defaults to true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
      // allowNull defaults to true
    }

  }, {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: 'User' // We need to choose the model name
  });

  return User;
}

