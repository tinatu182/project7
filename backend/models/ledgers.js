const { Model, DataTypes } = require('sequelize');

// User Schema
// const userSchema = mongoose.Schema({
//   firstName: { type: String, required: true },
//   lastName: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
// });
module.exports = (sequelize, DataTypes) => {

  class Ledger extends Model { 
    static associate(models) {
      Ledger.belongsTo(models.Message,{
        foreignKey: 'ledgerId',
        onDelete: 'CASCADE',
        allowNull: false,
      })
    }
  }


  Ledger.init({
    // Model attributes are defined here
    ledgerId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
    read: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
      },

  },
    {
      // Other model options go here
      sequelize, // We need to pass the connection instance
      modelName: 'Ledger' // We need to choose the model name
    });

  return Ledger;
}

