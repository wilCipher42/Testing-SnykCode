# A4 – Définition des statuts

## Objectif

Définir et décrire les differents statuts des demandes/requêtes soumises.

---

## 1. Liste des statuts

Notre application permet aux utilisateurs (authentifiés) de soumettre des demandes de plusieurs types (RH, INFORMATIQUE, etc.), et ces demandes transitent d'un état à un autre jusqu'à ce que les demandes soient complétées ou traitées par un gestionnaire. Ces états sont donc

- SUBMITTED
- IN_PROGRESS
- COMPLETED
- CANCELED

---

## 2. Description des statuts

Dans l’application UQO-Request, chaque demande passe par différents statuts qui permettent de suivre son cycle de vie, depuis sa création jusqu’à sa finalisation ou son annulation.

**SUBMITTED**
Ce statut indique que la demande a été créée et soumise par un utilisateur authentifié.
Toutes les informations obligatoires ont été fournies et la demande est enregistrée dans le système.
Aucun traitement n’a encore été effectué par un gestionnaire.

**IN PROGRESS**
La demande est en cours de traitement par un gestionnaire ou un service concerné (Informatique, RH, Maintenance, etc.).
Des actions peuvent être réalisées sur la demande, comme l’analyse, la communication avec le demandeur ou l’exécution de la tâche demandée.

**COMPLETED**
La demande a été traitée avec succès.
Le service responsable a complété toutes les actions nécessaires et la demande est considérée comme résolue.
Aucune modification supplémentaire n’est requise.

**CANCELED**
La demande a été annulée avant d’être complétée.
L’annulation peut être effectuée par le demandeur ou par un gestionnaire si la demande n’est plus pertinente ou ne peut pas être traitée.

## 3. Transitions autorisées et interdites

a- Les transitions définissent les changements possibles entre les différent statuts d'une demande

b-Transitions autorisées 
    SUBMITTED → IN_PROGRESS
        La demande est prise en charge pour traitement.
    SUBMITTED → CANCELED
        La demande est annulée avant d'etre prise en charge.
    IN_PROGRESS → COMPLETED
        La demande a été traitée et complétée.
    IN_PROGRESS → CANCELED
        La demande est annulée pendant son traitement
   

b-Transitions interdites
    SUBMITTED → COMPLETED
        La demande doit etre traité avant d'etre complétée.
    IN_PROGRESS → SUBMITTED
        Une demande prise en charge ne peut pas revenir a l'état initial.
    COMPLETED → Aucune transistion autorisée.
        Le statut COMPLETED est un état final.
    CANCELED → Aucune transistion autorisée.
        Le statut CANCELED est un état final.
    

    
