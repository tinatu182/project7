const { Model, DataTypes } = require('sequelize');

// User Schema
// const userSchema = mongoose.Schema({
//   firstName: { type: String, required: true },
//   lastName: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
// });
module.exports = (sequelize, DataTypes) => {

  class Message extends Model { 
    static associate(models) {
      Message.belongsTo(models.User, {
          foreignKey: 'userId',
          onDelete: 'CASCADE',
          allowNull: false,
      });
      Message.hasMany(models.Ledger, {
        foreignKey: 'ledgerId'
      });
    }
  }

  Message.init({
    // Model attributes are defined here
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false
    },
    mediaUrl: {
      type: DataTypes.STRING,
      allowNull: true
    },
  },
    {
      // Other model options go here
      sequelize, // We need to pass the connection instance
      modelName: 'Message' // We need to choose the model name
    });

  return Message;
}

