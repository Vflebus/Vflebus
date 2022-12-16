const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    define: {
        underscored: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    },
    // On pense à embarquer le contexte avec la function afin de pouvoir l'utiliser dans les logs
    // logging: logger.info.bind(logger),
    logging: false,
});

module.exports = sequelize;
