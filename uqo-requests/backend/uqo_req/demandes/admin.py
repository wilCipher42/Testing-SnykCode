from django.contrib import admin
from .models import Demande

# Register your models here.
@admin.register(Demande)
class DemandeAdmin(admin.ModelAdmin):
	list_display = (
		"id",
		"creator",
		"telephone",
		"type",
		"titre",
		"status",
		"created_at",
		"updated_at",
	)

	list_filter = ("type", "created_at")
	search_fields = ("type", "status", "dmandeur")

