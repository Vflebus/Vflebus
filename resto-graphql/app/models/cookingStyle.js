const { DataTypes } = require('sequelize');

module.exports = (sequelize) => sequelize.define('CookingStyle', {
    label: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'cooking_style',
});
