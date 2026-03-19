# Architecture globale de l’application

## 1. Frontend
Le frontend correspond à la couche visible par l’utilisateur.  
Il est responsable de l’interface utilisateur et des interactions.

Dans ce projet, le frontend est développé avec React.

### Responsabilités :
- Afficher les pages et composants
- Gérer les actions de l’utilisateur (clics, formulaires)
- Envoyer des requêtes HTTP vers l’API REST
- Afficher les réponses reçues du backend

Le frontend ne contient pas de logique métier et n’accède pas directement à la base de données.

---

## 2. Backend
Le backend représente la couche logique de l’application.

### Responsabilités :
- Traiter les requêtes reçues du frontend
- Appliquer les règles métier
- Gérer l’authentification et la sécurité
- Communiquer avec la base de données
- Retourner des réponses structurées (JSON)

Le backend agit comme intermédiaire entre le frontend et la base de données.

---

## 3. Base de données
La base de données est responsable du stockage permanent des données.

### Responsabilités :
- Enregistrer les données utilisateurs
- Conserver les informations de l’application
- Assurer l’intégrité et la cohérence des données

L’accès à la base de données se fait uniquement via le backend.

---

## 4. Rôle de l’API REST
L’API REST permet la communication entre le frontend et le backend à l’aide de requêtes HTTP.

### Rôles principaux :
- Fournir une interface standardisée
- Séparer le frontend du backend
- Utiliser les méthodes HTTP (GET, POST, PUT, DELETE)
- Faciliter la maintenance et l’évolution de l’application

L’API REST permet à chaque couche de fonctionner de manière indépendante.
