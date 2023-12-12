const { Model, DataTypes } = require('sequelize');

// User Schema
// const userSchema = mongoose.Schema({
//   firstName: { type: String, required: true },
//   lastName: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
// });
module.exports = (sequelize, DataTypes) => {

  class Comment extends Model { }

  Comment.init({
    // Model attributes are defined here
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    comment: {
      type: DataTypes.STRING,
      allowNull: false
    },
    postID: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    active: {
      type: DataTypes.BOOLEAN,
      default: true
    }

  },
    {
      // Other model options go here
      sequelize, // We need to pass the connection instance
      modelName: 'Comment' // We need to choose the model name
    });

  return Comment;
}

