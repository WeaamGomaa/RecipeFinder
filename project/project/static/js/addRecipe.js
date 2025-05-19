
let recipeName = document.getElementById("name");
let recipeId = document.getElementById("id");
let courseType = document.getElementById("course type");
let ingredName = document.getElementById("ingred_name");
let ingredQuantity = document.getElementById("ingred_quantity");
let submit = document.getElementById("submit");
let addIngredBtn = document.getElementById("addIngred");

let instructions = document.getElementById("instructions");
let calory = document.getElementById("calory");
let protein = document.getElementById("protein");
let carbs = document.getElementById("carbs");
let fat = document.getElementById("fat");
let prepTime = document.getElementById("prep");
let cookTime = document.getElementById("cook");
let totalTime = document.getElementById("total");
let serving = document.getElementById("serving");
let description = document.getElementById("description");
let ingredTextarea = document.getElementById("ingred_list");
let imageInput = document.getElementById("image_input");


// Form Validation Functions
function showError(input, message) {
  const formControl = input.parentElement;
  const errorDiv = formControl.querySelector('.error');
  errorDiv.textContent = message;
  input.style.borderColor = 'red';
}

function clearError(input) {
  const formControl = input.parentElement;
  const errorDiv = formControl.querySelector('.error');
  errorDiv.textContent = '';
  input.style.borderColor = '#606C38';
}

function validateRequired(input) {
  if (input.value.trim() === '') {
      showError(input, `${input.placeholder || input.name} is required`);
      return false;
  }
  clearError(input);
  return true;
}

function validateTextOnly(input) {
  const regex = /^[a-zA-Z\s\-']+$/;
  if (!regex.test(input.value.trim())) {
      showError(input, 'Only letters and spaces allowed');
      return false;
  }
  return true;
}

function validateNumber(input) {
  if (isNaN(input.value) || input.value <= 0) {
      showError(input, 'Please enter a valid number');
      return false;
  }
  return true;
}

function validateImage(input) {
  if (!input.files || input.files.length === 0) {
      showError(input, 'Recipe Name is required');
      return false;
  }
  
  const file = input.files[0];
  const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
  if (!validTypes.includes(file.type)) {
      showError(input, 'Only JPEG, PNG or GIF images are allowed');
      return false;
  }
  
  if (file.size > 2 * 1024 * 1024) { // 2MB
      showError(input, 'Image size must be less than 2MB');
      return false;
  }
  
  return true;
}

// Main Validation Function
function validateForm(event) {
  event.preventDefault();
  
  let isValid = true;
  
  // Validate recipe name
  if (!validateRequired(recipeName)) isValid = false;
  else if (!validateTextOnly(recipeName)) isValid = false;
  
  // Validate recipe ID
  if (!validateRequired(recipeId)) isValid = false;
  else if (isNaN(recipeId.value)) {
      showError(recipeId, 'Recipe ID must be a number');
      isValid = false;
  }
  
  // Validate course type
  if (!validateRequired(courseType)) isValid = false;
  
  // Validate servings
  if (!validateRequired(serving)) isValid = false;
  else if (!validateNumber(serving)) isValid = false;
  
  // Validate description
  if (!validateRequired(description)) isValid = false;
  
  // Validate ingredients (at least one)
  if (ingredientList.length === 0) {
      showError(ingredName, 'At least one ingredient is required');
      isValid = false;
  }
  
  // Validate instructions
  if (!validateRequired(instructions)) isValid = false;
  
  // Validate nutrition info
  if (!validateRequired(calory) || !validateNumber(calory)) isValid = false;
  if (!validateRequired(protein) || !validateNumber(protein)) isValid = false;
  if (!validateRequired(carbs) || !validateNumber(carbs)) isValid = false;
  if (!validateRequired(fat) || !validateNumber(fat)) isValid = false;
  
  // Validate time
  if (!validateRequired(prepTime) || !validateNumber(prepTime)) isValid = false;
  if (!validateRequired(cookTime) || !validateNumber(cookTime)) isValid = false;
  
  // Validate image
  if (!validateImage(imageInput)) isValid = false;
  
  // If form is valid, proceed with submission
  return isValid;
}


//console.log(recipeName,recipeId,courseType,ingredName,ingredQuantity,submit,addIngredName,addIngredQuantity);
/*
let submitValid = false;
submit.addEventListener("click" , function(event){
    
    if(recipeName.value === "" || recipeId.value === "" || courseType.value === "" || ingredName.value === "" || instructions.value === "" || imageInput.value === ""){
        event.preventDefault();
        console.log("false");

    }
});


//*************Ingredients************** */

let ingredientList = [];
addIngredBtn.addEventListener("click" , function(event){
    event.preventDefault();

    if(ingredName.value.trim() && ingredQuantity.value.trim()){
        let newIngred = {
            name:ingredName.value.trim(),
            quantity:ingredQuantity.value.trim()
        };
        ingredientList.push(newIngred);
        updateIngredientsDisplay();
        ingredName.value = "";
        ingredQuantity.value = "";
        ingredName.focus();
    }

});

function updateIngredientsDisplay(){
  ingredTextarea.value = "";
  ingredientList.forEach(ingred => {
    ingredTextarea.value += `${ingred.quantity} ${ingred.name}\n`;
  });
}


//*************Nutrition*************** */
/*
let nutritionList = [];
submit.addEventListener("click", function(){
    if(calory.value.trim() && protein.value.trim() && carbs.value.trim() && fat.value.trim()){
        let nutrition = {
            calory:calory.value.trim(),
            protein:protein.value.trim(),
            carbs:carbs.value.trim(),
            fat:fat.value.trim()
        };
        nutritionList.push(nutrition);
        localStorage.setItem("recipeNutrition", JSON.stringify(nutritionList));
    }
});



//*************Time***************** */

cookTime.onkeyup = function(){
    totalTime.innerHTML = parseInt(prepTime.value) + parseInt(cookTime.value);
}

let timeList = [];
submit.addEventListener("click" , function(){
    if(prepTime.value.trim() && cookTime.value.trim()){
        let time = {
            prepTime:prepTime.value.trim(),
            cookTime:cookTime.value.trim(),
            totalTime:totalTime.innerHTML
        }; 
        timeList.push(time);
    }
})


//*****************Image****************** */

let uploaded_image;
imageInput.addEventListener("change" , function(){
    let reader = new FileReader();
    reader.addEventListener("load" , function(){
        uploaded_image = reader.result;
        document.getElementById("display_image").style.backgroundImage = `url(${uploaded_image})`;
    });
    reader.readAsDataURL(this.files[0]);
});





//****************Recipe***************** */

let recipes =  JSON.parse(localStorage.getItem('recipes')) || avaliableRecipe;

function saveRecipes(recipes) {
    localStorage.setItem('recipes', JSON.stringify(recipes));
    console.log("saved", recipes);
}

function loadRecipes() {
    const recipes = localStorage.getItem('recipes');
    return recipes ? JSON.parse(recipes) : [];
}

function showRecipeDetails(recipeId) {
    const detailsWindow = window.open('', '_blank');
    detailsWindow.document.write(createRecipeHtml(recipeId));
    detailsWindow.document.close();
}

function getCurrentUser() {
  return localStorage.getItem('currentUser');
}

function getFavorites() {
  let user = getCurrentUser();
  if (!user) return []; 
  const favorites = localStorage.getItem(`favorites_${user}`);
  return favorites ? JSON.parse(favorites) : [];
}

function saveFavorites(favorites) {
  let user = getCurrentUser();
  if (!user) return; 
  localStorage.setItem(`favorites_${user}`, JSON.stringify(favorites));
}

function toggleFavorite(recipeId, event) {
  event.stopPropagation(); 
  
  let favorites = getFavorites();
  let index = favorites.indexOf(recipeId);

  if (index === -1) {
    favorites.push(recipeId); 
  } else {
    favorites.splice(index, 1);
  }

  saveFavorites(favorites);
  displayRecipes();
  
  if (window.detailsWindow && !window.detailsWindow.closed) {
    window.detailsWindow.location.reload();
  }
}

// submit.onclick = function submitRecipe() {

//   event.preventDefault();

//   if (!validateForm(event)) {
//       console.log("Form validation failed");
//       return; 
//   }

//     let newRecipe = {
//       id:recipeId.value,
  
//       title:recipeName.value,

//       course:courseType.value,

//       ingredients: ingredientList.map(item => `${item.quantity} ${item.name}`),

//       nutrition: {
//         calories: calory.value,
//         protein: protein.value,
//         carbs: carbs.value,
//         fat: fat.value
//       },

//       time: {
//         prep: prepTime.value,
//         cook: cookTime.value,
//         total: totalTime.innerHTML
//       },

//       descriptionForCard:description.value,

//       servings:serving.value,

//       instructions:instructions.value,

//       image:uploaded_image,

//       description: description.value
        
//     }
//     loadRecipes()
//     recipes.push(newRecipe);
//     saveRecipes(recipes);
//     displayRecipes();
//     console.log(recipes);
//     event.target.form.reset();

//     window.location.href = "admin_list.html"
   
// }

submit.onclick = async function submitRecipe(event) {
    event.preventDefault();

    if (!validateForm(event)) {
        console.log("Form validation failed");
        return;
    }

    // Prepare FormData
    const formData = new FormData();
    formData.append('name', recipeName.value);
    formData.append('recipe_id', recipeId.value);
    formData.append('type', courseType.value);
    formData.append('servings', serving.value);
    formData.append('description', description.value);
    formData.append('instructions', instructions.value);
    formData.append('ingredients', JSON.stringify(ingredientList));
    formData.append('calory', calory.value);
    formData.append('protein', protein.value);
    formData.append('carbs', carbs.value);
    formData.append('fat', fat.value);
    formData.append('prep', prepTime.value);
    formData.append('cook', cookTime.value);
    
    if (imageInput.files[0]) {
        formData.append('image', imageInput.files[0]);
    }

    try {
        const response = await fetch('/add-recipe/', {
            method: 'POST',
            headers: {
                'X-CSRFToken': document.querySelector('[name=csrfmiddlewaretoken]').value,
            },
            body: formData
        });

        if (response.ok) {
            const data = await response.json();
            if (data.success) {
                window.location.href = "admin_list.html";
            } else {
                console.error('Submission failed:', data.error);
            }
        } else {
            console.error('Server error:', response.status);
        }
    } catch (error) {
        console.error('Network error:', error);
    }
}
  
function createRecipeHtml(recipeId) {

  const cssLink = document.createElement('link');
  cssLink.rel = 'stylesheet';
  cssLink.href = '../css_files/recstyle.css';
  document.head.appendChild(cssLink);

  const recipes = loadRecipes();
  const recipe = recipes.find(r => r.id === recipeId);

  if (!recipe) {
    return '<!DOCTYPE html><html><body><p>Recipe not found</p></body></html>';
  }

  if (typeof recipe.instructions === 'string') {
    recipe.instructions = recipe.instructions.split('\n').filter(step => step.trim() !== '');
  }
  const instructionsArray = recipe.instructions || [];
  typeof recipe.instructions === 'string' 
      ? recipe.instructions.split('\n').filter(step => step.trim() !== '')
      : Array.isArray(recipe.instructions) 
          ? recipe.instructions 
          : [];

  const formattedInstructions = instructionsArray.map(step => 
    step.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
  ).join('<br>');

  const isFavorite = getFavorites().includes(recipe.id); 

  return `<!DOCTYPE html>
<html>
<head>
  <title>${recipe.title}</title>
  <link rel="stylesheet" href="css_files/recstyle.css">
  <style>
    .favorite-container {
      display: flex;
      justify-content: flex-end;
      padding: 10px;
      margin-right: 20px;
    }
    .favorite-btn {
      background: none;
      border: none;
      font-size: 24px;
      cursor: pointer;
      padding: 5px 10px;
      transition: all 0.3s ease;
    }
    .favorite-btn:hover {
      transform: scale(1.2);
      color:red;
    }
    .favorited {
      color: red;
    }
  </style>
</head>
<body id="mbod">
  <div class="sec">
    <span class="inView">
      <h2>${recipe.title}</h2>
      <img class="pol" src="${recipe.image}" alt="${recipe.title}">           
    </span>
    
<button class="favorite-btn ${isFavorite ? 'favorited' : ''}" 
        data-recipe-id="${recipe.id}"
        onclick="window.opener.toggleFavorite('${recipe.id}', event)">
        <img src="images/FavButActive.png" 
        class="favIco ${isFavorite ? 'active' : ''}" 
        alt="Favorite">
</button>


    <span>
      <h4>Recipe Description:</h4>
      <pre id="desc">    ${recipe.description}</pre>
      <h4 class="ing">Ingredients:</h4>
      <pre>    ${recipe.ingredients.join("\n    ")}</pre>
    </span>
    <span>
      <h4 class="box">Nutritional Information
        <br><br>
        <pre>
      Calories: ${recipe.nutrition.calories}
      Protein: ${recipe.nutrition.protein}
      Carbs: ${recipe.nutrition.carbs}
      Fat: ${recipe.nutrition.fat}
        </pre>
      </h4>
    </span>
    <span>
      <h4 class="box">
        <br>
        <pre>
  Prep Time: ${recipe.time.prep}
  Cook Time: ${recipe.time.cook}
  Servings: ${recipe.servings}
        </pre>
      </h4>
    </span>
  </div>

  <div class="sec">
    <pre class="ins">
      <h3 class="ing">Cooking Instructions:</h3>
  ${formattedInstructions}
    </pre>
  </div>
  <script>
    document.querySelector('.favorite-btn').addEventListener('click', function() {
      this.classList.toggle('favorited');
    });
  </script>
</body>
</html>`;
}


document.querySelector('.favorite-btn').addEventListener('click', function() {
  this.classList.toggle('favorited');
  //this.innerHTML = this.classList.contains('favorited') ? '❤️'  :'🤍';
});

function displayRecipes() {
  const recipes = loadRecipes();
  if (!Array.isArray(recipes)) {
    recipes = [];
}
  const favorites = getFavorites();
  const container = document.getElementById("recipes-container");

  if (!container) {
    console.error('Container element not found');
    return;
  }

  container.innerHTML = '';

  if (recipes.length === 0) {
    container.innerHTML = '<p>No recipes found. Add some recipes to get started!</p>';
    return;
  }

  recipes.forEach(recipe => {
    const isFavorite = favorites.includes(recipe.id);
    const card = document.createElement('div');
    card.className = "recipe-card";
    card.innerHTML = `
      <img src="${recipe.image}" alt="${recipe.title}" class="recipe-image">
      <h3>${recipe.title}</h3>
      <p class="recipe-info">Course: ${recipe.course}</p>
      <p class="recipe-desc">${recipe.descriptionForCard || ''}</p>
      <div class="action-buttons">
        <button class="edit-btn" onclick="window.location.href = 'Edit_Recipe.html'">Edit</button>
        <button class="delete-btn" data-id="${recipe.id}">Delete</button>
      </div>
`;
    
    card.addEventListener('click', (e) => {
      if (!e.target.closest('.action-buttons')) {
        showRecipeDetails(recipe.id);
      }
    });
    
    container.appendChild(card);
  });
  addDeleteEvents();
  console.log(recipes);
}


function addDeleteEvents() {
  document.addEventListener('click', function(e) {
      if (e.target.classList.contains('delete-btn')) {
          const recipeId = e.target.dataset.id;
          deleteRecipe(recipeId);
      }
  });
}

function deleteRecipe(id) {
  if (confirm('Are you sure you want to delete this recipe?')) {
    recipes = recipes.filter(recipe => recipe.id.toString() === id.toString());
    saveRecipes(recipes);
    displayRecipes();
  }
}



function showRecipeDetails(recipeId) {
  const html = createRecipeHtml(recipeId);
  window.detailsWindow = window.open('', '_blank');
  
  if (window.detailsWindow) {
    window.detailsWindow.document.open();
    window.detailsWindow.document.write(html);
    window.detailsWindow.document.close();
  } else {
    alert('Please allow popups to view recipe details');
  }
}

function initializeData() {
  if (!localStorage.getItem('recipes')) {
    const sampleRecipes = [
      {
        id: '1',
        title: 'Sample Pasta',
        description: 'Delicious pasta recipe',
        descriptionForCard: 'Quick and easy pasta dish',
        course: 'Main',
        image: 'https://example.com/pasta.jpg',
        ingredients: ['Pasta', 'Tomato sauce', 'Cheese'],
        instructions: ['**Boil** the pasta', 'Add **sauce**'],
        nutrition: {
          calories: 400,
          protein: '15g',
          carbs: '60g',
          fat: '10g'
        },
        time: {
          prep: '10 mins',
          cook: '20 mins'
        },
        servings: 2
      }
    ];
    saveRecipes(sampleRecipes);
  }
}

// Update event listeners
submit.addEventListener("click", validateForm);

recipeName.addEventListener('input', () => validateTextOnly(recipeName));
recipeId.addEventListener('input', () => validateNumber(recipeId));
courseType.addEventListener('blur', () => validateRequired(courseType));


// Add real-time validation for some fields
/*
recipeName.addEventListener('input', () => {
    if (recipeName.value.trim() !== '') {
        validateTextOnly(recipeName);
    }
});

recipeId.addEventListener('input', () => {
    if (recipeId.value.trim() !== '') {
        if (isNaN(recipeId.value)) {
            showError(recipeId, 'Recipe ID must be a number');
        } else {
            clearError(recipeId);
        }
    }
});
*/
// Add error divs dynamically (run this once when page loads)
document.addEventListener('DOMContentLoaded', function() {
    const inputs = document.querySelectorAll('.inputfield');
    inputs.forEach(input => {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error';
        errorDiv.style.color = 'red';
        errorDiv.style.fontSize = '12px';
        errorDiv.style.marginTop = '5px';
        input.parentNode.insertBefore(errorDiv, input.nextSibling);
    });
});

window.addEventListener('DOMContentLoaded', () => {
  initializeData();
  displayRecipes();
  const inputs = document.querySelectorAll('.inputfield');
  inputs.forEach(input => {
      if (!input.nextElementSibling || !input.nextElementSibling.classList.contains('error')) {
          const errorDiv = document.createElement('div');
          errorDiv.className = 'error';
          input.parentNode.appendChild(errorDiv);
      }
  });
});
