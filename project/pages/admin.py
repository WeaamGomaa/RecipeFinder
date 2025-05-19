from django.contrib import admin
from .models import Recipe, Ingredient, Nutrition, Time  # Import your models

admin.site.register(Recipe)
admin.site.register(Ingredient)
admin.site.register(Nutrition)
admin.site.register(Time)

# Register your models here.
