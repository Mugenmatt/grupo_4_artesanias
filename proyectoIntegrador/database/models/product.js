'use strict';
module.exports = (sequelize, DataTypes) => {

  const Product = sequelize.define('Product', {
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    price: DataTypes.DECIMAL,
    size: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
    status: DataTypes.BOOLEAN, //Facu: es tinyint(4), ver si funciona con boolean
    idUser: DataTypes.INTEGER
  }, {tablename: "products"});

  Product.associate = function(models) {

    Product.belongsTo(models.User,{
      as:"user",
      foreignKey: "idUser"
      
    })

    Product.hasMany(models.Productimage, {
      as:"productImages",
      foreignKey:"idProduct",
    })

    Product.belongsToMany(models.Keyword,{
      as:"keywords",
      through: "Productkey",
      foreignKey: "idProduct",
      otherKey: "idKeyword",
    })

  };

  return Product;
};