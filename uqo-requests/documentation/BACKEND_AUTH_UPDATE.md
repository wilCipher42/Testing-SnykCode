# Backend Authentication & Structure Update

## Contexte

Suite aux mises à jour de la structure du backend, des modifications ont été apportées afin d'assurer :

- L’activation de l’authentification JWT
- La gestion des permissions sécurisées via Django REST Framework
- La configuration CORS pour permettre la communication avec le frontend
- La validation du bon fonctionnement des routes API

---

## Modifications effectuées

### 1. Ajout des dépendances

Fichier modifié :
`backend/requirements.txt`

Ajout :

- djangorestframework-simplejwt
- django-cors-headers

---

### 2. Configuration des settings

Fichier modifié :
`backend/uqo_req/uqo_req/settings.py`

Ajouts :

- Activation de `corsheaders`
- Configuration du middleware CORS
- Configuration `REST_FRAMEWORK`
  - JWTAuthentication
  - SessionAuthentication (pour dev)
  - IsAuthenticated par défaut
- CORS_ALLOW_ALL_ORIGINS = True (dev uniquement)

---

### 3. Configuration des URLs JWT

Fichier :
`backend/uqo_req/uqo_req/urls.py`

Ajout des endpoints :

- `/api/token/`
- `/api/token/refresh/`

---

## Tests effectués

- Migration base de données appliquée
- Création d’un superuser
- Test POST `/api/token/` → génération access & refresh
- Test GET `/api/demandes/` → 200 OK
- Test POST `/api/demandes/` → 201 Created

---

## Résultat

Le backend est maintenant :

- Fonctionnel
- Sécurisé via JWT
- Compatible avec le frontend (CORS activé)
- Prêt à être connecté au frontend React

---

## Prochaine étape

Connexion du frontend React à l’API réelle.
