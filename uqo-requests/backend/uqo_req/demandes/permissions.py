from rest_framework.permissions import BasePermission, SAFE_METHODS

class IsCreatorOrManager(BasePermission):
    """
    - Manager (is_staff) : accès complet
    - User normal : accès seulement à ses propres objets
    """

    def has_object_permission(self, request, view, obj):
        if request.user and request.user.is_staff:
            return True
        return obj.creator == request.user


class OnlyManagerCanChangeStatus(BasePermission):
    """
    Empêche un user normal de modifier le champ 'status' (et date_traitement).
    """

    def has_permission(self, request, view):
        return True  # on vérifie au niveau objet / data

    def has_object_permission(self, request, view, obj):
        # Managers: ok
        if request.user and request.user.is_staff:
            return True

        # User normal: interdit de changer status/date_traitement
        if request.method in ("PUT", "PATCH"):
            if "status" in request.data or "date_traitement" in request.data:
                return False

        return obj.creator == request.user