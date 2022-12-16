const { readFileSync } = require('fs');
const { EOL } = require('os');

// Afin d'organiser notre application, nous allons séparer nos types et nos query au sein de
// fichiers gql différents

// Pour cela on créer un tableau contenant les noms de nos fichiers gql
const schemas = [
    'city',
    'manager',
    'cookingStyle',
    'restaurant',
    'query',
    'mutation',
];

// Puis on remplace ces nom de fichiers par leur contenu
const schemasContent = schemas.map((schema) => readFileSync(`${__dirname}/schemas/${schema}.gql`, 'utf-8'));

// et enfin on concatène tout ça dans une seule chaine de caractère qui servira de schema graphQL au
// serveur apollo

// Pour cela on va séparé chaque petit bout de schema par un retour ligne, sinon on aurait un souci
// de syntaxe d'interpretation par Apollo

// Les retours sont différentes d'un système d'exploitation a un autre. Sous linux et Mac c'est \n
// sous windows c'est \r\n

// Node.js poeut nous fournir le caractère spécifique de l'environnement du processus à travers le
// module 'os' inclus nativement dans Node. Celui-ci contien une constante dans un propriété EOL qui
// représente le caractère de fin de ligne (End Of Line)
const typeDefs = `#graphql
    ${schemasContent.join(EOL)}
`;

module.exports = typeDefs;
