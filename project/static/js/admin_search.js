// search section

let searchCriteria = 'Recipe Name';
function getSearchCrit(id){
       let search = document.getElementById('search');
       if(id == 'searchRecipeName'){
               searchCriteria = 'Recipe Name';
               search.placeholder = 'Search by Recipe Name';
           } else {
               searchCriteria = "Ingredient";
               search.placeholder = 'Search by Ingredient';
                   }
       search.focus();
}

function showRecipeDetails(recipeId) {
    const detailsWindow = window.open('', '_blank');
    detailsWindow.document.write(createRecipeHtml(recipeId));
    detailsWindow.document.close();
}

function searching(){
const search = document.querySelector(".SearchBlock");
const submit_name = document.getElementById("searchRecipeName");
const submit_ing = document.getElementById("searchIng");
const input = document.getElementById("search");
const returnToList = document.querySelector(".icon");


//search by recipe name
submit_name.addEventListener("click" , function(){
   const searchValue = input.value.toLowerCase().trim();
   const recipes = loadRecipes();
   const container = document.getElementById("recipes-container"); // Moved to main scope
   
   if (!container) {
       console.error("Container not found!");
       return;
   }

   container.innerHTML = '';
   //filter recipes
   
   const filtered = recipes.filter(recipe => recipe.title.toLowerCase().includes(searchValue));
    //display message if not there
    if(JSON.stringify(filtered) === '[]'){
      container.innerHTML = `<p class = "no result">No Items Match ${searchValue}</p>`
    }
   // show matched flex box
   else{
       filtered.forEach(recipe =>{
           const card = document.createElement('div');
           card.className = "recipe-card";
           card.innerHTML = `
               <img src="${recipe.image}" alt="${recipe.title}" class="recipe-image">
               <h2>${recipe.title}</h2>
               <p class="recipe">Course: ${recipe.course} <br> Description: ${recipe.descriptionForCard}</p>
               <div class="spacer"></div>

               <div class="action-buttons">
                   <button class="edit-btn" onclick="window.location.href = 'Edit_Recipe.html'">Edit</button>
                   <button class="delete-btn" data-id="${recipe.id}">Delete</button>
               </div>
           `;

           card.addEventListener('click', (e) => {
            if (!e.target.closest('.action-buttons')) {
                const recipeId = recipe.id;
                showRecipeDetails(recipeId);
            }
            });
           
            container.appendChild(card);
        });
        addDeleteEvents();
    }
   //clear input field after clicking
   returnToList.addEventListener('click', function(){
       input.value = '';
   })
   

})

// By ingredient
submit_ing.addEventListener("click" , function(){
   const searchValue = input.value.toLowerCase().trim();
   const recipes = loadRecipes();
   const container = document.getElementById("recipes-container"); // Moved to main scope
   
   if (!container) {
       console.error("Container not found!");
       return;
   }

   container.innerHTML = '';
   //filter recipes
   const filtered = recipes.filter(recipe => recipe.ingredients.some(ingredient => ingredient.toLowerCase().includes(searchValue)));
    //display message if not there
    if(JSON.stringify(filtered) === '[]'){
      container.innerHTML = `<p class = "no result">No Items Match ${searchValue}</p>`
    }
   // show matched flex box
   else{
       filtered.forEach(recipe =>{
           const card = document.createElement('div');
           card.className = "recipe-card";
           card.innerHTML = `
               <img src="${recipe.image}" alt="${recipe.title}" class="recipe-image">
               <h2>${recipe.title}</h2>
               <p class="recipe">Course: ${recipe.course} <br> Description: ${recipe.descriptionForCard}</p>
               <div class="spacer"></div>
   
               <div class="action-buttons">
                   <button class="edit-btn" onclick="window.location.href = 'Edit_Recipe.html'">Edit</button>
                   <button class="delete-btn" data-id="${recipe.id}">Delete</button>
               </div>
           `;
   
           card.addEventListener('click', (e) => {
            if (!e.target.closest('.action-buttons')) {
                const recipeId = recipe.id;
                showRecipeDetails(recipeId);
            }
            });
           
            container.appendChild(card);
        });
        addDeleteEvents();
      
   }
   //clear input field after clicking
   returnToList.addEventListener('click', function(){
       input.value = '';
   })

})

}
window.addEventListener('DOMContentLoaded', function() {
displayRecipes();
searching();
});

