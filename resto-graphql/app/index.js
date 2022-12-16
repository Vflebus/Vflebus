const express = require('express');
const logger = require('./utils/logger');
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');

process.on('unhandledRejection', (err) => {
    // On renvoi la balle à l'écouteur uncaughtException
    throw err;
});

// .on() === addEventListener() pour Node.js
process.on('uncaughtException', (err) => {
    logger.fatal(err);

    // On pourrait s'envoyer une alerte par mail par exemple, ou stocker l'erreur dans un fichier,
    // ou même dans une base de données.

    // Dans tout les cas, on veut arrêter le processus Node.js car c'est une erreur fatal.
    process.exit(1);
});
const app = express();

app.set('view engine', 'pug');
app.set('views', './app/views');

app.use(express.static('public'));

module.exports = { app, typeDefs, resolvers };
