'use strict';
module.exports = (sequelize, DataTypes) => {
  const laptop = sequelize.define('laptop', {
    sku: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    description: DataTypes.TEXT,
    price: DataTypes.STRING,
    stock: DataTypes.INTEGER
  }, {});
  laptop.associate = function(models) {
    // associations can be defined here
  };
  return laptop;
};