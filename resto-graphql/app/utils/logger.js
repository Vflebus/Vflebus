/*
Niveaux de journalisation:
- fatal : c'est un évenement qui interrompt complètement l'application. Si on a se type d'erreur il
  faut absolument que l'on soit tenu au courant le plus rapidement possible. Il faudra faire en
  sorte de recoivr une alerte su un device que l'on a toujours sur soit, exemple un téléphone.

- error : c'est une erreur qui n'est pas fatale, mais qui peut avoir des conséquences néfastes sur
  le fonctionnement de l'application. C'est une erreur qui peut potentiellement géner une
  fonctionnalité par les autres. Ce type d'erreur n'est pas forcément à prendre à la légère, car
  elle pourrait intervenir sur une fonctionnalité centrale, comme l'authentification par exemple.
  Donc à gérer au cas par cas. Peut-être que certaines mérite d'être considéré comme fatal., même si
  elle n'interompt pas l'application.

- warn (warning) : Ce n'est pas une erreur, c'est une information importante. On l'utilise souvent
  pour prévenir qu'une fonctionnalité va devenir obsolète, dans une prochaine version. Ou que la
  fonctionnalité peut être gourmande en ressource, et qu'il y a peut-être une autre fonctionnalité
  plus adaptée.

- info : C'est une information qui peut mérité d'être stockée à des fins de statistiques
  d'utilisation de l'application.

- debug : C'est une information qui peut être utile pour le développeur, et qui n'est pas nécessaire
  de stocker. Cette informations ne doit aparaitre nulle-part en production. Elle sera donc
  confitionnée par l'environnement

- trace : elle contient en général des informations de bibliothèques externes ou des détails sur
  certaines fonctionnalités plus préoccupantes de l'application. (détail de performance par exemple)
*/

const bunyan = require('bunyan');
const PrettyStream = require('bunyan-prettystream');

const prettyStdOut = new PrettyStream();
prettyStdOut.pipe(process.stdout);

const env = process.env.NODE_ENV || 'development';

const streams = [];

if (env === 'development') {
    streams.push(
        {
            level: 'info',
            stream: prettyStdOut, // log INFO and above to stdout
        },
    );
}

if (env === 'production') {
    streams.push(
        {
            type: 'rotating-file',
            level: 'error',
            // La racine du chemin a spécifié est la racine du serveur, pas celle du fichier
            path: './logs/resto-error.log',
            period: '10000ms', // 10 secondes
            count: 5, // on ne conserve que les 5 derniers fichiers
        },
    );
}

const logger = bunyan.createLogger({
    name: 'resto',
    streams,
});

module.exports = logger;
