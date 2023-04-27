const recipeList = document.querySelector('#recipe-items');
const mainContent = document.querySelector('.main-content');

async function loadRecipes() {
  const response = await fetch('http://localhost:3000/recipes');
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
  