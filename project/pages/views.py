
from django.shortcuts import render, redirect
from django.contrib import messages
from .forms import AddRecipeForm, IngredientForm, NutritionForm, TimeForm
from .models import Recipe, Ingredient, Nutrition, Time
import json

def add_recipe(request):
    if request.method == 'POST':
        recipe_form = AddRecipeForm(request.POST, request.FILES)
        
        if recipe_form.is_valid():
            # Save the main recipe
            recipe = recipe_form.save(commit=False)
            recipe.save()
            
            # Process ingredients from JSON
            ingredients_data = json.loads(request.POST.get('ingredients', '[]'))
            for ingredient in ingredients_data:
                Ingredient.objects.create(
                    recipe=recipe,
                    name=ingredient['name'],
                    quantity=ingredient['quantity']
                )
            
            # Save nutrition info
            Nutrition.objects.create(
                recipe=recipe,
                calories=request.POST.get('calory'),
                protein=request.POST.get('protein'),
                carbs=request.POST.get('carbs'),
                fat=request.POST.get('fat')
            )
            
            # Save time info
            Time.objects.create(
                recipe=recipe,
                prep_time=request.POST.get('prep'),
                cook_time=request.POST.get('cook')
            )
            
            messages.success(request, 'Recipe added successfully!')
            return redirect('recipe_list')
    else:
        recipe_form = AddRecipeForm()
    
    return render(request, 'pages/AddRecipe.html', {
        'form': recipe_form,
    })

def edit_recipe(request):
    return render(request, 'pages/EditRecipe.html')