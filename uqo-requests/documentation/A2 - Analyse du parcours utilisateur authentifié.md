## Analyse du parcours utilisateur authentifié

### Accès au tableau de bord et aux pages protégées

#### Accès au tableau de bord
Une fois authentifié, l’utilisateur accède au tableau de bord. Ce tableau de bord permet à l’utilisateur de consulter la liste de ses demandes. Chaque demande affichée contient les informations nécessaires pour identifier la demande,notamment son titre, son type , son statut, date de création et date de derniére modification.

#### Accès aux pages protégées
À partir du tableau de bord, l’utilisateur authentifié peut accéder :

- A la page de détail d’une demande (consulter ses demande, voir l'etat de ses demandes et enfin modifier ses demande si elle nest pas encore en traitement ) ;
- A la page de création d’une nouvelle demande.

Ces pages sont réservées aux utilisateurs authentifiés et font partie des pages protégées de l’application.

---

## Restrictions d’accès du parcours utilisateur authentifié

Les pages suivantes de l’application sont considérées comme protégées et accessibles uniquement à un utilisateur authentifié :

- Tableau de bord utilisateur
- Page de détail d’une demande
- Page de création d’une nouvelle demande
- Page de modification d’une demande

Un utilisateur non authentifié ne peut pas accéder directement à ces pages.

### Comportement d’un utilisateur non authentifié

Lorsqu’un utilisateur non authentifié tente d’accéder à une page protégée :

- l’accès à la page est refusé ;
- l’utilisateur est redirigé vers la page de connexion ;
- un message explicite est affiché pour indiquer que l’authentification est requise.

#### Message attendu (exemple)
« Vous devez être connecté pour accéder à cette page. »

### Redirection vers la page de connexion

Toute tentative d’accès à une page protégée sans authentification entraîne automatiquement une redirection vers la page de connexion.  
L’utilisateur doit s’authentifier avant de pouvoir poursuivre sa navigation.

### Règles spécifiques d’accès aux actions

- La consultation du détail d’une demande est autorisée uniquement pour un utilisateur authentifié.
- La création d’une nouvelle demande est réservée aux utilisateurs authentifiés.
- La modification d’une demande est autorisée uniquement si :
  - l’utilisateur est authentifié ;
  - le statut de la demande est SUBMITTED.

Si le statut est différent, l’action de modification est bloquée côté interface utilisateur.
