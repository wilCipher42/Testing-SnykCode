from rest_framework import viewsets
from rest_framework.exceptions import PermissionDenied
from rest_framework.permissions import IsAuthenticated
from .models import Demande
from .serializers import DemandeSerializer
from .permissions import IsCreatorOrManager


class DemandeViewSet(viewsets.ModelViewSet):
    """
    A2.1 – API de modification des demandes :
    - un utilisateur authentifié peut modifier sa demande
    - seulement si son statut est SUBMITTED
    """

    serializer_class = DemandeSerializer
    permission_classes = [IsAuthenticated, IsCreatorOrManager]

    def get_queryset(self):
        if self.request.user.is_staff:
         return Demande.objects.all().order_by("-created_at")

        return Demande.objects.filter(
        creator=self.request.user
        ).order_by("-created_at")

    def update(self, request, *args, **kwargs):
        demande = self.get_object()

        if demande.status != "SUBMITTED":
            raise PermissionDenied(
                "La demande ne peut être modifiée que lorsque son statut est SUBMITTED."
            )

        return super().update(request, *args, **kwargs)

    def perform_create(self, serializer):
        serializer.save(
            creator=self.request.user,
            status="SUBMITTED"
        )

