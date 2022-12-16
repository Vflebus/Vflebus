require('dotenv').config();
const { createServer } = require('http');
const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { ApolloServerPluginDrainHttpServer } = require('@apollo/server/plugin/drainHttpServer');
const cors = require('cors');
const { expressMiddleware } = require('@apollo/server/express4');
const debug = require('debug')('server');

const { app: expressApp, typeDefs, resolvers } = require('./app');

const httpServer = createServer(expressApp);

const apolloServer = new ApolloServer({
    // Définition des types (schema) c'est le centre névralgique de notre application graphQL
    typeDefs,
    // On pourrait le comparer a un controller, et il va donc avoir pratiquement les meême rôles. Le
    // seul rôle qu'il ne va pas tenir en comparaison avec le controller, c'est que ce n'est pas lui
    // qui est chargé de répondre à l'utilisateur (à la demande)
    // Ce qui veut dire que le processus de réponse à un utilisateur est centralisé
    // Le resolver ce contente de renvoyer la données traité au server Apollo
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

(async () => {
    await apolloServer.start();

    // Série de middleware a exécuté lors d'une requête uniquement pour la route /graphql
    expressApp.use(
        '/graphql',
        cors(),
        express.json(),
        expressMiddleware(apolloServer),
    );

    const port = process.env.PORT || 3000;

    httpServer.listen(port, () => {
        debug(`listening on http://localhost:${port} (${process.env.NODE_ENV})`);
    });
})();
