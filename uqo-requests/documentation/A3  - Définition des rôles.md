---
# A3 – Définition des rôles

## Rôle : Utilisateur

L’utilisateur est un membre standard du système dont le rôle principal est de soumettre et de suivre ses propres demandes.

**Permissions :**

* Créer une nouvelle demande
* Consulter la liste de ses demandes
* Accéder au détail de ses demandes
* Ajouter des commentaires à ses demandes lorsque le statut le permet

**Restrictions :**

* L’utilisateur ne peut consulter que ses propres demandes
* Il ne peut pas modifier une demande une fois qu’elle est en cours de traitement ou finalisée
* Il ne peut ni approuver, ni rejeter, ni changer le statut d’une demande
---

## Rôle : Gestionnaire

Le gestionnaire est responsable du traitement et du suivi des demandes soumises par les utilisateurs.

**Permissions :**

- Accéder à l’ensemble des demandes du système
- Consulter le détail de chaque demande
- Modifier le statut d’une demande selon les règles établies
- Ajouter des commentaires administratifs
- Approuver ou rejeter une demande

**Restrictions :**

- Le gestionnaire ne peut pas créer de demandes au nom d’un utilisateur
- Il ne peut pas modifier le contenu initial d’une demande (titre ou description)

---

## Différences de permissions entre les rôles

Fonctionnalité | Utilisateur | Gestionnaire |

---

| Fonctionnalité                   | Utilisateur | Gestionnaire |
| -------------------------------- | ----------- | ------------ |
| Créer une demande                | Oui         | Non          |
| Consulter ses demandes           | Oui         | Non          |
| Consulter toutes les demandes    | Non         | Oui          |
| Modifier le statut d’une demande | Non         | Oui          |
| Ajouter des commentaires         | Oui         | Oui          |
| Approuver / rejeter une demande  | Non         | Oui          |

Cette séparation des rôles permet d’assurer une **gestion claire des responsabilités**, de **renforcer la sécurité du système** et de garantir une logique métier cohérente, en limitant les actions possibles selon le profil de l’utilisateur
