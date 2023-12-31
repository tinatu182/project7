const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {

  class User extends Model { 
      static associate(models){
        User.hasMany(models.Message, {
          foreignKey: 'userId'
        })
      }
  }


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
    },
    imageUrl: {
      type: DataTypes.STRING,
      default: " https://i2.wp.com/www.cycat.io/wp-content/uploads/2018/10/Default-user-picture.jpg",
    },

  },
    {
      // Other model options go here
      sequelize, // We need to pass the connection instance
      modelName: 'User' // We need to choose the model name
    });

  return User;
}

