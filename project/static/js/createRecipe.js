localStorage.removeItem('recipes'); 
    saveRecipes(recipes);


function saveRecipes(recipes) {
  localStorage.setItem('recipes', JSON.stringify(recipes));
}

function loadRecipes() {
  const recipes = localStorage.getItem('recipes');
  return recipes ? JSON.parse(recipes) : [];
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

  const instructionsArray = 
  typeof recipe.instructions === 'string' 
      ? recipe.instructions.split('**') 
      : recipe.instructions || [];

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
  <button class="edit-btn" onclick="editRecipe(${recipe.id})">Edit</button>
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

}
function addDeleteEvents() {
  document.querySelectorAll('.delete-btn').forEach(btn => {
      btn.addEventListener('click', function() {
          const recipeId = parseInt(this.getAttribute('data-id'));
          deleteRecipe(recipeId);
      });
  });
}

function deleteRecipe(id) {
  if (confirm('Are you sure you want to delete this recipe?')) {
      recipes = recipes.filter(recipe => recipe.id !== id);
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

window.addEventListener('DOMContentLoaded', () => {
  initializeData();
  displayRecipes();
});