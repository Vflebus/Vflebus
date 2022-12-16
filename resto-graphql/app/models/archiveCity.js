const { DataTypes } = require('sequelize');

module.exports = (sequelize) => sequelize.define('ArchiveCity', {
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
    tableName: 'archive_city',
});
