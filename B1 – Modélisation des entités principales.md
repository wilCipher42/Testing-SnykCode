# B1 – Modélisation des entités principales

## 1. Objectif de la modélisation

Cette section définit les entités essentielles du système de gestion des demandes, ainsi que leurs attributs, contraintes et relations. La modélisation vise à assurer :

- la traçabilité des demandes (qui a créé quoi, quand, et dans quel état),
- la gestion des accès selon les rôles (Utilisateur vs Gestionnaire),
- la cohérence des règles métier liées au cycle de vie des demandes (statuts et transitions).

## 2. Entité **Utilisateur** (User)

### 2.1 Rôle de l’entité

L’utilisateur représente toute personne authentifiée pouvant interagir avec le système. Deux profils sont requis :

- **USER** : crée et consulte ses propres demandes,
- **MANAGER** : supervise les demandes et peut en changer le statut selon les règles définies.

### 2.2 Attributs (proposition)

- **id** _(PK)_ : identifiant unique
- **email** _(unique, obligatoire)_ : identifiant de connexion
- **password_hash** _(obligatoire)_ : mot de passe stocké sous forme hashée
- **first_name** _(obligatoire)_ : prénom
- **last_name** _(obligatoire)_ : nom
- **role** _(obligatoire)_ : `USER` ou `MANAGER` (valeur par défaut : `USER`)
- **created_at** _(obligatoire)_ : date de création
- **updated_at** _(obligatoire)_ : date de dernière mise à jour

### 2.3 Contraintes et règles

- L’adresse courriel doit être **unique** dans le système.
- Le rôle doit appartenir à l’ensemble : `{USER, MANAGER}`.
- Les informations d’authentification ne doivent jamais stocker de mot de passe en clair (hash obligatoire).

## 3. Entité **Demande** (Request)

### 3.1 Rôle de l’entité

La demande représente une requête soumise par un utilisateur (ex. demande de service, accès, congé, etc.). Elle contient les informations principales et un statut reflétant son avancement.

### 3.2 Attributs (proposition)

- **id** _(PK)_ : identifiant unique
- **created_by** _(FK → User, obligatoire)_ : utilisateur propriétaire de la demande
- **title** _(obligatoire)_ : titre synthétique de la demande
- **description** _(obligatoire)_ : description détaillée
- **type** _(optionnel mais recommandé)_ : catégorie (ex. `ACCESS`, `IT_SUPPORT`, `LEAVE`, etc.)
- **status** _(obligatoire)_ : `SUBMITTED`, `IN_PROGRESS`, `COMPLETED`, `CANCELED`
- **created_at** _(obligatoire)_ : date de soumission
- **updated_at** _(obligatoire)_ : date de dernière modification

### 3.3 Contraintes et règles métier (alignées aux exigences)

- **Statut initial** à la création : `SUBMITTED`.
- **Modification** de la demande autorisée uniquement si `status = SUBMITTED`.
- **Statuts finaux** : `COMPLETED` et `CANCELED` (aucune transition sortante).

### 3.4 Transitions autorisées (cycle de vie)

- `SUBMITTED → IN_PROGRESS`
- `SUBMITTED → CANCELED`
- `IN_PROGRESS → COMPLETED`
- `IN_PROGRESS → CANCELED`

Transitions interdites :

- `SUBMITTED → COMPLETED`
- `IN_PROGRESS → SUBMITTED`
- transitions depuis `COMPLETED` ou `CANCELED`

## 4. Relations entre entités

### 4.1 Relation principale : **Utilisateur — Demande**

**Type :** 1 à N

- Un **Utilisateur** peut créer **0..N** demandes.
- Une **Demande** appartient à **exactement 1** utilisateur (son créateur).

**Implémentation (base de données) :**

- `Request.created_by` est une clé étrangère vers `User.id`.

### 4.2 Cardinalités

- `User (1) ⟶ (0..*) Request`
- `Request (1) ⟶ (1) User`

### 4.3 Justification

Cette relation garantit :

- la traçabilité (propriété des demandes),
- la sécurisation (un utilisateur ne consulte que ses demandes, sauf rôle gestionnaire),
- la conformité aux règles d’accès décrites dans les exigences.

## 5. Représentation synthétique (ERD texte)

- **User**(id PK, email UNIQUE, password_hash, first_name, last_name, role, created_at, updated_at)
- **Request**(id PK, created_by FK→User.id, title, description, type, status, created_at, updated_at)

Relation :

- **User 1 — N Request**
