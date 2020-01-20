import {elements} from './base'

export const getInput = () => {
    console.log('getInput')
    return elements.searchInput.value;
    
}
export const clearResults = () => {
    elements.searchResList.innerHTML = '';
}
export const clearInput = () => {
    elements.searchInput.value = '';
    
}

//'pasta with tomato and spinach
// acc : 0 / acc+cur.length = 5 / newTitle = ['pasta']
// acc : 5 / acc+cur.length = 9 / newTitle = ['pasta','with']
const limitRecipeTitle = (title, limit = 17) => {
    const newTitle = [];
    if (title.length > limit) {
        title.split(' ').reduce((acc, cur) => {
            if (acc + cur.length <= limit) {
                newTitle.push(cur)
            }
            return acc + cur.length;
        }, 0);

        return `${newTitle.join(' ')} ...`
    } else {

    }
    return title;
}
const renderRecipe = recipe => {
    const markup = `
    <li>
                    <a class="results__link results__link--active" href="#23456">
                        <figure class="results__fig">
                            <img src="${recipe.image}" alt="Test">
                        </figure>
                        <div class="results__data">
                            <h4 class="results__name">${limitRecipeTitle(recipe.label)}</h4>
                            <p class="results__author">${recipe.source}</p>
                        </div>
                    </a>
                </li>
    `

    elements.searchResList.insertAdjacentHTML('beforeend', markup)
}
export const renderResults = (recipes, page =1, resPerPage = 10) => {
    recipes.forEach(element => {
        
        renderRecipe(element)
    });
}