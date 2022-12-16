const { DataTypes } = require('sequelize');

module.exports = (sequelize) => sequelize.define('RestaurantCookingStyle', {
    restaurant_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    cooking_style_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    tableName: 'restaurant_has_cooking_style',
});
