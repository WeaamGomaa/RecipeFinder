
function showRecipeDetails(recipeId) {
    const detailsWindow = window.open('', '_blank');
    const htmlContent = createRecipeHtml(recipeId);
    detailsWindow.document.write(htmlContent);
    detailsWindow.document.close();
}

function editRecipe(id) {
    window.location.href = `Edit_Recipe.html?id=${id}`;
}

function initData(){
    try{
        const dataElement = document.getElementById('recipes-data');
        const recipesData  = JSON.parse(dataElement.dataset.recipes);
        const simplifiedRecipes = recipesData.map(item => ({
                id: item.pk,
                ...item.fields  
            }));
    
        displayRecipes(simplifiedRecipes);
    } catch (error) {
        console.error(error);
    }
}

    function displayRecipes(recipes) {
        const container = document.getElementById("recipes-container");
        container.innerHTML = '';
        
        recipes.forEach(recipe => {
            const card = createRecipeCard(recipe);
            container.appendChild(card);
        });
    }


    function createRecipeCard(recipe){
        const card =document.createElement('div');
            card.className = "recipe-card";
            
            card.innerHTML = `
                <img src="/media/${recipe.image}" alt="${recipe.title}" class="recipe-image">
                <h2>${recipe.title}</h2>
                <p class="recipe">Course: ${recipe.course} <br> Description: ${recipe.description}</p>
                <div class="spacer"></div>

                <div class="action-buttons">
                    <button class="edit-btn" onclick="editRecipe(${recipe.id})">Edit</button>
                    <button class="delete-btn" data-id="${recipe.id}">Delete</button>
                </div>
            `;

            card.addEventListener('click', (e) => {
                if (!e.target.closest('.action-buttons')) {
                    const recipeId = recipe.id;
                    showRecipeDetails(recipeId);
                }
            });
        return card;
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
            
            recipes = recipes.filter(recipe => recipe.id.toString() !== id.toString());
            saveRecipes(recipes);
            displayRecipes();
        }
    }
    
function createRecipeHtml(recipeId) {

        const dataElement = document.getElementById('recipes-data');
        const recipesData  = JSON.parse(dataElement.dataset.recipes);
        console.log(recipesData);
        const simplifiedRecipes = recipesData.map(item => ({
                id: item.pk,
                ...item.fields  
            }));
        console.log(simplifiedRecipes);
        const recipe = simplifiedRecipes.find(r => r.id === recipeId);

        if (!recipe) {
        return '<!DOCTYPE html><html><body><p>Recipe not found</p></body></html>';
        }

        const staticBaseUrl = '/static/';

        const instructionsArray = 
        typeof recipe.instructions === 'string' 
            ? recipe.instructions.split('**') 
            : recipe.instructions || [];

        const formattedInstructions = instructionsArray.map(step => 
        step.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        ).join('<br>');
        

        return `<!DOCTYPE html>
        <html>
        <head>
        <title>${recipe.title}</title>
        <link rel="stylesheet" href="${staticBaseUrl}css/recstyle.css">
        </head>
        <body id="mbod">
        <div class="sec">
        <span class="inView">
            <h2>${recipe.title}</h2>
            <img class="pol" src="/media/${recipe.image}" alt="${recipe.title}">           
        </span>

        <button class="favorite-btn ">
            <img src="${staticBaseUrl}images/FavButActive.png" class="favIco" alt="Favorite">
        </button>

        <span>
            <h4>Recipe Description:</h4>
            <pre id="desc">    ${recipe.description}</pre>
            <h4 class="ing">Ingredients:</h4>
            <pre>    ${recipe.ingredients}</pre>
        </span>
        <span>
            <h4 class="box">Nutritional Information
            <br><br>
            <pre>
Calories: ${recipe.calories} 
Protein: ${recipe.protein}g
Carbs: ${recipe.carbs}g
Fat: ${recipe.fat}g
            </pre>
            </h4>
        </span>
        <span>
            <h4 class="box">Time Information
            <br><br>
            <pre>
Prep Time: ${recipe.prep} mins
Cook Time: ${recipe.cook} mins
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

    window.addEventListener('DOMContentLoaded', () => {
        initData();
    });

    