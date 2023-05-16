const { DataTypes } = require("sequelize");

const db = require("../db/conn");
const User = require('./User');

const Balance = db.define("Balance", {
  
  value: {
    type: DataTypes.DOUBLE,
    allowNull: false,
    require: true,
  }, 

  month: {
    type: DataTypes.STRING,
        allowNull: false,
        require: true,
  },
});

Balance.belongsTo(User);
User.hasMany(Balance)
module.exports = Balance;