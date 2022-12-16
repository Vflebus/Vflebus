const { DataTypes } = require('sequelize');

module.exports = (sequelize) => sequelize.define(
    'ArchiveRestaurant',
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        terrace: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
    },
    {
        tableName: 'archive_restaurant',
    },
);
