const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('dog', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      foreignKey: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    height_min: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    height_max: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    weight_min: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    weight_max: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    life: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    likes: {
      type: DataTypes.INTEGER,

    },
    createdInDb: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false,
    }
  },
    {
      timestamps: false,
    });
};



// ID *
// Nombre *
// Altura *
// Peso *
// Años de vida