

Cette application a été générée avec  [Create React App](https://github.com/facebook/create-react-app).

# Projet de Session Automne 2023 - Klemn

***

## Projet

Cette application web est un réseau social pour développeurs qui a été développée dans le cadre du cours PROJET DE DÉVELOPPEMENT DE LOGICIEL (420-5GD-BB). 

Inspiré entre autre par GitHub, Reddit, Twitter (maintenant 𝕏), LinkedIn, StackOverflow ainsi que de Mastodon. 

## Fonctionnalitées

***

## Scripts Disponibles

Dans ce répertoire de projet, vous pouvez exécuter ces commandes:

Pour installer toutes les dépendances du projet:
```
npm install
```

Pour démarrer le serveur d'API:
```
node ./server/serveur.js
```

Pour démarrer l'application React en mode développement:
```
npm start
```

Il est important de noter que vous devrez aussi créer une base de données MySQL avec l'outil DrizzleKit qui va se charger de créer les tables ainsi que les relations SQL:
```
npx drizzle-kit push:mysql
```

***

### .env

Pour exécuter ce projet, vous aurez besoin d'un fichier .env localisé à la racine du projet qui contiendra les informations de votre base de données MySQL. Voici la structure que vous devez utiliser:

### configuration basique. Devrait suffir pour la majorité des configurations

***

# Configuration de la connexion à la base de données MySQL

```
MYSQL_HOSTNAME=localhost
MYSQL_PORT=3306
MYSQL_USERNAME=mysql-username
MYSQL_PASSWORD=mysql-password
MYSQL_DATABASE=mysql-database
```

# Configuration du serveur d'API

```
SERVER_HOSTNAME=localhost
SERVER_PORT=1111
```

# URL de l'API que le client front-end va utiliser pour faire les requêtes.

```
REACT_APP_API_URL="http://localhost:1111"
```

*** 

## Stack

| Technologie | Contribution |
| - | - |
| Firebase | Authentification |
| MySQL, Docker | Base de données |
| Node, Express | Backend |
| React, Typescript | Frontend |

## Features

| Nom | Description |
| - | - |
| Création de compte | Nous utilisons le service Firebase de Google qui nous permet d'authentifier nos utilisateurs sans s'exposer à des risques de sécurité |
| Rédaction et publication | En tant qu'utilisateur connecté, vous pouvez rédiger et publier des publications |
| Système de vote | En tant qu'utilisateur connecté, vous pouvez voter sur les publications. Chaque publication possède un score déterminé par ces votes |
| Partage | En tant qu'utilisateur, vous pouvez partager les publications aux personnes qui vous suivent ou via un lien qui mène vers celle-ci |
| Commentaire | En tant qu'utilisateur vous pouvez rédiger des commentaires en dessous d'une publication |
| Documentation Dynamique | Cette page est en fait générée en utilisant notre README.md qui est aussi affiché et utilisé officiellement par GitHub. Cette page sera donc automatiquement mise à jour lorsque nous ajouterons de la documentation |
| Markdown | Markdown est maintenant supporté lors de la rédaction de publication. |

et plus encore!!

## Tutoriel: Éditeur de publication 3000 Klemn

Utilisez 
```

~~~[language] 

{code ici} 

~~~
``` 

pour déclencher le surlignement de syntaxe. Mais n'oubliez pas d'activer le mode Markdown avant l'envoi de votre publication! Si le symbole d'identification du language n'est pas reconnu, nous utiliserons notre propre formatage de bloc de code.

[Documentation CommonMark](https://commonmark.org/help/)

[Languages Supportés](https://github.com/react-syntax-highlighter/react-syntax-highlighter/blob/master/AVAILABLE_LANGUAGES_PRISM.MD)

Notre super éditeur supporte aussi 3 différent type de publications décrites dans les tableaus sur cette page.

***

## À Venir!

| Nom | Description |
| - | - |
| Système de collaboration | En tant qu'utilisateur connecté, vous pourrez créer, éditer, et collaborer sur des projets directement lié à un repo git |
| Système de forum et d'aide | En tant qu'utilisateur connecté, vous pourrez rédiger et publier des publications de type Question et déterminer une meilleure réponse identifiée en commentaire |
| Modification de profil | En tant qu'utilisateur connecté, vous pourrez modifier votre profil et modifier votre image de profil ou de bannière |
| Système de badges | Les utilisateurs pourront posséder et afficher des badges sur leur profil. |
| Publications rédigées en Markdown | Les utilisateurs pourront rédiger leurs publications en utilisant le formattage Markdown. |
| Gestion d'une publication | Les utilisateurs pourront modifier et supprimer les publications qui leur appartiennent. |

## Contributeurs (A-Z)

- Alfrieh, Elie
- Cournoyer, Nathan
- Miranda Carrillo
- Terehov, Lada
- Vincent-Charland, Maxime 
