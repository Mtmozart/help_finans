const { DataTypes } = require("sequelize");

const db = require("../db/conn");
const User = require('./User');

const Exit = db.define("Exit", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    require: true,
  },
  value: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    required: true,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
    require: true,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
    require: true,
  },
  month: {
    type: DataTypes.STRING,
        allowNull: false,
        require: true,
  },
});

Exit.belongsTo(User);
User.hasMany(Exit)
module.exports = Exit;