## Définition de l'utilisateur non authentifié

Un utilisateur non authentifié est un utilisateur qui accède à l’application sans être connecté à un compte. Il a accès uniquement aux pages publiques mises à sa disposition.

## Pages accessibles

### Page d'inscription
L'utilisateur non authentifié peut accéder à la page d'inscription afin de créer un compte. Cette page contient un formulaire (nom, courriel, mot de passe et confirmation du mot de passe)

#### Comportements attendus :
- Affichage du formulaire d'insctiption.
- valdiation coté client des champs obligatoires.
- vérification du format du courriel.
- Vérification si le mot de passe correspond à la confimation.

### Page de connexion
L'utilisateur peut accéder à la page de connexion afin de s'authentifié.
- epuis la page d’accueil.
- depuis la page d’inscription.

## Restrictions d’accès

L’utilisateur non authentifié n’a pas accès aux fonctionnalités réservées aux utilisateurs connectés :
- le tableau de bord 
- la création, la consultation ou la modification des demandes 
- l’accès aux pages de gestion ou d’administration.
