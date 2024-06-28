# TopSpin Lille

TopSpin Lille est le site web officiel de l'Association de Tennis de Table de Lille. Ce site permet aux membres de rester informés des actualités, des événements et des activités de l'association.

## Table des matières

- [Introduction](#introduction)
- [Fonctionnalités](#fonctionnalités)
- [Technologies utilisées](#technologies-utilisées)
- [Prérequis](#prérequis)
- [Installation](#installation)
- [Utilisation](#utilisation)

## Introduction

Ce projet a été développé pour fournir une plateforme en ligne permettant aux membres de l'Association de Tennis de Table de Lille de rester connectés et informés. Les membres peuvent consulter les actualités, voir les galeries de photos, et en savoir plus sur les événements à venir.

## Fonctionnalités

- Gestion des membres
- Publication d'articles et d'actualités
- Galerie de photos
- Informations sur les événements à venir
- Liens vers les réseaux sociaux

## Technologies utilisées

- **Frontend:** React, TypeScript, CSS
- **Backend:** Node.js, Express, MongoDB, Mongoose
- **Authentification:** JWT (JSON Web Tokens)
- **Déploiement:** Docker

## Prérequis

Avant de commencer, assurez-vous d'avoir les éléments suivants installés sur votre machine:

- Node.js (version 14 ou supérieure)
- npm (version 6 ou supérieure)
- MongoDB compass
- Docker (optionnel, pour le déploiement)

## Installation

### Cloner le dépôt

```bash
git clone git@github.com:ThoRibeiro/TopSpin.git
cd TopSpin
```
### Installer les dépendances
**Backend**
```bash
cd BackEnd
npm install
```

**FrontEnd**
```bash
cd FrontEnd
npm install
```

### Configuration
**BackEnd**

Créez un fichier .env dans le dossier backend et ajoutez la variable d'environnement nécessaire:
```env
JWT_SECRET=
```

**FrontEnd**

Créez un fichier .env dans le dossier backend et ajoutez la variable d'environnement nécessaire:
```env
REACT_APP_API_URL=http://localhost:3500
```

### Lancer l'application
**BackEnd**
```bash
cd BackEnd
npm run dev
```

**FrontEnd**
```bash
cd FrontEnd
npm run dev
```

**BDD**
```bash
cd BackEnd
docker compose up
```
Pour la base de donnée, il faut bien sur avoir **Docker Desktop** d'ouvert !

## Utilisation
Ouvrez votre navigateur et accédez à http://localhost:5173 pour voir l'application en action.