# API WEB - Conception et implémentation d'un service de gestion

Création d'une API restfull, implémentant un système de réservation de terrains de badminton. Utilisation d'un ORM, spécification Openai et Swagger

## Lancement du projet

- Créer votre fichier d'environnement local

```Bash
cp .env.dist .env
```

- Installer les dépendances

```Bash
npm install
```

- Générer la clé de secret pour les tokens JWT

```Bash
node .\gensecretkey.js
```

- Lancer le Serveur Postgresql

```Bash
docker compose up -d
```

- Créer la base de donnée

```Bash
cd .\src\
npx sequelize-cli db:migrate
```

- Peupler la base de données

```Bash
npx sequelize-cli db:seed:all
```

- Lancer l'API

```Bash
npm run dev
```

## Utiliser le service

>Pour avoir une vision globale de l'API et la documentation Swagger se connecter sur l'adresse :

```Bash
localhhost:3000/api-docs
```

>Vous pouvez tester les différentes routes directement depuis la documentation.
>N’oubliez pas de créer un compte dès le début de votre utilisation.

## Démarer le serveur GraphQLje les

- Lancer le serveur

```Bash
node src/graphql/server.js
```

- Tester via Postamn

  Méthode : POST \
  URL : http://localhost:4000/

    - Body

      ```Json
      {
          "query": "query GetAvailableSlots($date: String!, $terrain: String!) { availableSlots(date: $date, terrain: $terrain) { time isAvailable } }",
          "variables": {
              "date": "2024-11-27",
              "terrain": "A"
          }
      }
      ```

## Dictionnaire des données

| Code           | Libellé                                   | Type   | Obligatoire ?  | Remarques/Contraintes                                                                       |
|:---------------|:------------------------------------------|:-------|:---------------|:--------------------------------------------------------------------------------------------|
| pseudo         | Le pseudo d'un administrateur             | String | Oui            | Soit unique (identifiant)                                                                   |
| password       | Le mot de passe de l'administrateur       | String | Oui            | Chaîne de caractères hashée dans la base de données                                         |
| userId         | L'identifiant d'un utilisateur            | Number | Oui            | Unique                                                                                      |
| username       | Nom d'un utilisateur                      | String | Oui            | Soit unique (identifiant)                                                                   |
| courtId        | Identifiant d'un terrain                  | Number | Oui            | Unique                                                                                      |
| name           | Nom d'un terrain                          | String | Non            |                                                                                             |
| status         | Status d'un terrain                       | String | Oui            | Peut prendre les valeurs : `available`, `unavailable`                                       |
| reservationId  | Identifiant d'une reservation             | Number | Oui            | Oui                                                                                         |  
| date           | Date de la réservation                    | Date   | Oui            | Format de la date : `2024-12-12`                                                            |  
| timeSlot       | Horaire de la réservation dans la journée | Number | Oui            | Horaire représenté par un nombre unique de 1 à 16 (nombre de créneau de 45min de 10h à 22h) |  

## Tableau récapitulatif

| Ressource                                            | Noms des ressources (URL)         | Paramètres d'URL                                                      | Méthodes HTTP  | Commentaires                                                                                    |
|:-----------------------------------------------------|:----------------------------------|:----------------------------------------------------------------------|:---------------|:------------------------------------------------------------------------------------------------|
| Récupérer tous les terrains                          | /courts                           |                                                                       | GET            |                                                                                                 |
| Ajouter un terrain                                   | /courts                           | Format JSON dans le body : le "name" et le "status" du terrain ajouté | POST           | Le "name" doit être unique, une erreur s'affiche si ce n'est pas le cas                         |
| Récupérer les informations d'un terrain spécifique   | /courts/{courtId}                 | Identifiant d'un terrain                                              | GET            |                                                                                                 |
| Récupérer tous les utilisateurs                      | /users                            |                                                                       | GET            |                                                                                                 |
| S'inscrire en tant que nouvel utilisateur            | /register                         | Format JSON dans le body : "username"                                 | POST           | Le "username" doit être unique, une erreur s'affiche si ce n'est pas le cas                     |
| Se connecter en tant qu'utilisateur                  | /login                            | Format JSON dans le body : "username"                                 | POST           |                                                                                                 |
| Créer une nouvelle réservation                       | /reservations                     | Format JSON dans le body : "nameCourt", "date", "timeSlot"            | POST           |                                                                                                 |
| Récupérer les réservations de l'utilisateur connecté | /reservations                     |                                                                       | GET            | L'utilisateur doit être connecté                                                                |
| Supprimer une réservation                            | /reservations/{reservationId}     | Identifiant d'une réservation                                         | DELETE         | L'utilisateur doit être connecté pour supprimer une de ses réservations                         |
| Se connecter en tant qu'administrateur               | /admin/login                      | Format JSON dans le body : "name" et le mot de passe "password"       | POST           |                                                                                                 |
| Modifier le statut d'un terrain                      | /admin/courts/{courtId}           | Identifiant d'un terrain                                              | POST           | L'utilisateur doit être connecté en tant qu'administrateur pour modifier le statut d'un terrain |

## Sécurité

>Dans notre application nous avons utilisé la bibliothèque bcrypt afin de hasher le mot de passe de l'admin lors du peupleument, pour cela nous avon définis un "salt" puis les fonction de cryptage et décryptage qui sont donc utilisées au peupleument et au login de l'admin pour comparer les mots de passes. Ainsi, on obtient un mot de passe de ce type : "$2b$10$bRvyT7158hQCcbWMN3fn6Oo6YEQK6PfPn94Hg79Z92qFlKIvGaP3b".


## Remarques

>Au départ, j’ai travaillé avec mon collègue Marc Lebreton De Vonne, mais nous avons eu un désaccord sur le fonctionnement du système de réservation. Il est donc possible que nos rendus soient assez similaires sur de nombreux points.
>Dans mon projet, j’ai décidé de ne pas m’occuper des horaires des créneaux (slots) mais plutôt de prioriser la flexibilité en ce qui concerne la gestion des terrains et la planification des réservations. Actuellement, cela couvre uniquement la semaine en cours, mais ce système pourrait être étendu en fonction des besoins. Ce choix implique que les créneaux sont représentés par un numéro allant de 1 à 16, chaque numéro correspondant à une plage de réservation de 45 minutes dans une journée.