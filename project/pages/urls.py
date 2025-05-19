from django.urls import path 
from .views import add_recipe
urlpatterns = [
    path('', add_recipe, name='add_recipe'),
    # path('about', views.about, name='about'),
]