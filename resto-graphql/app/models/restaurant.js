const { DataTypes } = require('sequelize');

const { STRING, BOOLEAN } = DataTypes;

module.exports = (sequelize) => sequelize.define(
    // 1er argument pour la déclaration d'un model, c'est le nom du model
    'Restaurant',
    {
    // 2eme argument pour la déclaration d'un model, c'est un objet qui contient les colonnes

        // On ne précise que les colonnes particulières. On ne précise pas la colonne id qui est
        // standard, les champs created_at et updated_at qui le sont également, ainsi que les clé
        // étrangères qui seront gérer au moment de la déficitions des jointures.
        name: {
            type: STRING,
            allowNull: false,
            unique: true,
        },
        description: {
            type: STRING,
            allowNull: false,
        },
        terrace: {
            type: BOOLEAN,
            allowNull: false,
        },
        city_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        manager_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    // 3eme argument pour la déclaration d'un model, c'est un objet qui contient des options dont le
    // nom de la table
    {
        tableName: 'restaurant',
    },
);
