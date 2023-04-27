const recipeList = document.querySelector('#recipe-items');
const mainContent = document.querySelector('.main-content');

async function loadRecipes() {
  const response = await fetch('http://localhost:3000/recipes');
  const data = await response.json();
  return data;
}