from rest_framework import serializers
from .models import Demande
import re

class DemandeSerializer(serializers.ModelSerializer):

    class Meta:
        model = Demande
        fields = "__all__"
        read_only_fields = ["status", "creator", "created_at", "updated_at"]

    def validate_description(self, value):
        value = value.strip()
        if not value or len(value) < 5:
            raise serializers.ValidationError(
                "La description doit contenir au moins 5 caractères"
            )
        return value

    def validate_type(self, value):
        valid_choices = [choice[0] for choice in Demande.TYPE_REQ_CHOICES]

        if value not in valid_choices:
            raise serializers.ValidationError("Type de demande invalide.")
        return value

    def validate_telephone(self, value):
        telRegex = r'^\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$'

        if not value:
            raise serializers.ValidationError(
                "Veuillez entrer un numéro de téléphone"
            )

        if not re.match(telRegex, value):
            raise serializers.ValidationError(
                "Veuillez entrer un numéro de téléphone valide"
            )

        return value
