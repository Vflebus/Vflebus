const { DataTypes } = require('sequelize');

module.exports = (sequelize) => sequelize.define('City', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    postal_code: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    geopos: {
        type: DataTypes.ARRAY(DataTypes.FLOAT),
        allowNull: false,
    },
}, {
    tableName: 'city',
});
