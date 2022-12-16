const { DataTypes } = require('sequelize');

module.exports = (sequelize) => sequelize.define('ArchiveCookingStyle', {
    label: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'archive_cooking_style',
});
