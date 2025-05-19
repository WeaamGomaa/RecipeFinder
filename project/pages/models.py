from django.db import models
# from django.contrib.auth.models import User
# from django.utils import timezone

# Create your models here.

class Recipe(models.Model):
    courseType = [
        ('Main Course','Main Course'),
        ('Appetizers','Appetizers'),
        ('Dessert','Dessert')
    ]

    name = models.CharField(max_length=100, default=" ")
    id = models.CharField(max_length=20, unique=True, primary_key=True)
    type = models.CharField(max_length=50, choices=courseType, default=" ")
    servings = models.CharField(max_length=20, default=" ")
    description = models.TextField(default=" ")
    instructions = models.TextField(default=" ")
    image = models.ImageField(upload_to='photos/%y/%m/%d', null=True, blank=True)

    # author = models.ForeignKey(User, on_delete=models.CASCADE, default=" ")
    # created_at = models.DateTimeField(auto_now_add=True, default=timezone.now)
    # updated_at = models.DateTimeField(auto_now=True, default=timezone.now)

    # def __str__(self):
    #     return self.name
    

class Ingredient(models.Model):
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE, related_name='ingredients', null=True)
    name = models.CharField(max_length=100, default=" ")
    quantity = models.DecimalField(max_digits=6, decimal_places=2, default="0")

    class Meta:
        ordering = ['name']


class Nutrition(models.Model):
    recipe = models.OneToOneField(Recipe, on_delete=models.CASCADE, related_name='nutrition', null=True)
    calories = models.DecimalField(max_digits=6, decimal_places=2, default="0")
    protein = models.DecimalField(max_digits=6, decimal_places=2, default="0")
    carbs = models.DecimalField(max_digits=6, decimal_places=2, default="0")
    fat = models.DecimalField(max_digits=6, decimal_places=2, default="0")

class Time(models.Model):
    recipe = models.OneToOneField(Recipe, on_delete=models.CASCADE, related_name='time', null=True)
    prep_time = models.DecimalField(max_digits=6, decimal_places=2, default="0")  # in minutes
    cook_time = models.DecimalField(max_digits=6, decimal_places=2, default="0")     # in minutes
    total_time = models.DecimalField(max_digits=6, decimal_places=2, null=True)    # in minutes

    @property
    def total_time(self):
        return self.prep_time + self.cook_time
