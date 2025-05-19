from django import forms
from .models import Recipe, Ingredient, Nutrition, Time

class AddRecipeForm(forms.ModelForm):
    class Meta:
        model = Recipe
        fields = ['name', 'id', 'type', 'servings', 'description', 'instructions', 'image']
        widgets = {
            'description': forms.Textarea(attrs={'rows': 10}),
            'instructions': forms.Textarea(attrs={'rows': 10}),
        }

class IngredientForm(forms.Form):
    name = forms.CharField(max_length=100)
    quantity = forms.CharField(max_length=50)

class NutritionForm(forms.ModelForm):
    class Meta:
        model = Nutrition
        fields = ['calories', 'protein', 'carbs', 'fat']

class TimeForm(forms.ModelForm):
    class Meta:
        model = Time
        fields = ['prep_time', 'cook_time']