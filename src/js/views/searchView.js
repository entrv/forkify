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
const renderRecipe = recipe => {
    const markup = `
    <li>
                    <a class="results__link results__link--active" href="#23456">
                        <figure class="results__fig">
                            <img src="${recipe.image}" alt="Test">
                        </figure>
                        <div class="results__data">
                            <h4 class="results__name">${recipe.label}</h4>
                            <p class="results__author">${recipe.source}</p>
                        </div>
                    </a>
                </li>
    `

    elements.searchResList.insertAdjacentHTML('beforeend', markup)
}
export const renderResults = recipes => {
    recipes.forEach(element => {
        
        renderRecipe(element)
    });
}