const recipeList = document.querySelector('#recipe-items');
const mainContent = document.querySelector('.main-content');

async function loadRecipes() {
  // const response = await fetch('http://localhost:3000/recipes');
  const response = await fetch('https://recipes-g6go.onrender.com/recipes');

  const data = await response.json();
  return data;
}
//aside data binding
function renderRecipes(recipe) {
    recipeList.innerHTML = '';
    recipe
      .map(item => {
        return {
          title: item.title,
          image: item.image,
          likes: item.aggregateLikes,
        };
      })
      .forEach(food => {
        const li = document.createElement('li');
        const div = document.createElement('div');
        div.classList.add('recipe');
        const img = document.createElement('img');
        img.src = food.image;
        img.alt = food.alt;
        div.append(img);
        const div2 = document.createElement('div');
        div2.classList.add('recipe-info');
        const p = document.createElement('p');
        p.classList.add('recipe-name');
        p.innerText = food.title;
        div2.append(p);
        div.append(img);
        div.append(div2);
        li.append(div);
        recipeList.append(li);
        li.addEventListener('click', e => {
          const selectedTitle =
            e.target.querySelector('.recipe-name').textContent;
          bindRecipeInfo(selectedTitle);
        });
      });
  }
  document.addEventListener('DOMContentLoaded', async () => {
    const recipes = await loadRecipes();
    renderRecipes(recipes);
  });
  document.querySelector('form').addEventListener('submit', async e => {
    e.preventDefault();
    const input = document.querySelector('input');
    const value = input.value.toLowerCase().trim();
    //get recipes
    const recipes = await loadRecipes();
    //find name from array
    const recipe = recipes.filter(recipe =>
      recipe.title.toLowerCase().includes(value)
    );
    renderRecipes(recipe);
  });
  async function bindRecipeInfo(title) {
    mainContent.innerHTML = '';
    const recipes = await loadRecipes();
    const recipe = recipes.find(item => item.title === title);
  
    const html = `
      <div class="image-container">
          <img src="${recipe.image}" alt="${recipe.title}" />
            <img src="${recipe.secondaryImages[0]}" alt="${recipe.title}" />
            <img src="${recipe.secondaryImages[1]}" alt="${recipe.title}" />
            <img src="${recipe.secondaryImages[2]}" alt="${recipe.title}" />
          </div>
          <h2 class="recipe-name">${recipe.title}</h2>
          <div class="recipe-summary">
            <div class="summary">
              <svg class="bi" width="32" height="32" fill="currentColor">
                <use xlink:href="bootstrap-icons.svg#people" />
              </svg>
              <p>${recipe.servings} Servings</p>
            </div>
            <div class="summary">
              <svg class="bi" width="32" height="32" fill="currentColor">
                <use xlink:href="bootstrap-icons.svg#alarm" />
              </svg>
              <p>${recipe.readyInMinutes} minutes</p>
            </div>
            <div class="summary">
              <svg class="bi" width="32" height="32" fill="currentColor">
                <use xlink:href="bootstrap-icons.svg#heart" />
              </svg>
              <p>${recipe.aggregateLikes} Likes</p>
            </div>
            <div class="summary">
              <svg class="bi" width="32" height="32" fill="currentColor">
                <use xlink:href="bootstrap-icons.svg#fire" />
              </svg>
              <p>${recipe.caloreies} Calories</p>
            </div>
          </div>
          <div class="ingredients">
            <h3>Ingredients</h3>
            <ul class="recipe-list">
             ${recipe.ingredients
               .map(ingredient => {
                 const html = `
                  <li>
                      <svg class="bi" width="32" height="32" fill="currentColor">
                          <use xlink:href="bootstrap-icons.svg#arrow-right-short" />
                      </svg>
                      <p>${ingredient}</p>
                  </li>
               `;
                 return html;
               })
               .join('')}
            </ul>
          </div>
          <div class="preparations">
            <h3>Preparations</h3>
            ${recipe.preparation}
          </div>
          <div class="salutation">Happy Cooking!!!</div>  
    `;
    mainContent.innerHTML = html;
  }