from django.db import models
from django.contrib.auth.models import User

class Demande(models.Model):

    TYPE_REQ_CHOICES = [
        ("it", "Informatique"),
        ("rh", "Ressources Humaines"),
        ("maintenance", "Maintenance"),
        ("other", "Autre"),
    ]

    STATUS_CHOICES = [
        ("SUBMITTED", "Soumise"),
        ("IN_PROGRESS", "En traitement"),
        ("COMPLETED", "Complétée"),
        ("CANCELED", "Annulée"),
    ]

    creator = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="demandes"
    )

    telephone = models.CharField(max_length=20)
    type = models.CharField(max_length=30, choices=TYPE_REQ_CHOICES)
    titre = models.CharField(max_length=255)
    description = models.TextField()

    status = models.CharField(
        max_length=30,
        choices=STATUS_CHOICES,
        default="SUBMITTED"
    )

    date_traitement = models.DateTimeField(blank=True, null=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.titre
