//fa57c242  application id
//d1edbb4c8552cec56b76bfb9f993041e	— application key

//import str from './models/Search'

//import {add as a, multiply as m , ID } from './views/searchView'

//import * as searchView from './views/searchView'

//console.log(`Using11 imported funtion ${searchView.add(
//    searchView.ID, 2)}   and 
//${searchView.multiply(searchView.ID, 2)}
//`)



import Search from './models/Search'
import * as searchView from './views/searchView'
import * as recipeView from './views/recipeView'
import {elements, renderLoader,clearLoader} from './views/base'
import Recipe from './models/Recipe'
/**
 * -search object
 * current recipe object
 * Shopping list object
 * liked object
 */

const state = {}

/**search control */
const controlSearch = async () => {
   const query = searchView.getInput();
  
    if (query) {
        state.search = new Search(query)
           
        //prepare ud for result
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchRes)

        try {
            //search for recipes
            await state.search.getResults()

            clearLoader();
            //Render results on UI
            const recipeArr = state.search.results.map(arrResult => {
            
                return arrResult.recipe;
            })
            //console.log(state.recipeArr.length)
            searchView.renderResults(recipeArr)
        } catch (err) {
            alert('Something query Error')
            clearLoader();
        }
    }

}
elements.searchForm.addEventListener('submit', e => {
    e.preventDefault()
    controlSearch()
})

//TESTING
elements.searchForm.addEventListener('submit', e => {
    e.preventDefault()
    controlSearch()
})

//const search = new Search('pizza')
//console.log(search.getResults().then)

elements.searchResPages.addEventListener('click', (e) => {
    const btn = e.target.closest('.btn-inline')
    
    if (btn) {
        //console.log(state.recipeArr.length)
        const gotoPage = parseInt(btn.dataset.goto, 10);
        searchView.clearResults();
        const recipeArr = state.search.results.map(arrResult => {
           
            return arrResult.recipe;
        })
        searchView.renderResults(recipeArr, gotoPage)
        
    }
})


/*recepi controll*/

// const r = new Recipe(44556)
// r.getRecipe();
// console.log(r)
const controlRecipe = async () => {
    //get id from url
    const id= window.location.hash.replace('#', '');
    console.log(id);

    if (id) {
        //prepare UI
        recipeView.clearRecipe();
        renderLoader(elements.recipe)

        //highlight selected
        if (state.search) searchView.highlightSelected(id)
        //create new recipe object
        state.recipe = new Recipe(id)
        try {
            //get recipe data
            
            await state.recipe.getRecipe();
            state.recipe.parseIngredients();
            //cacluation serving and time
            state.recipe.calcTime();
            state.recipe.calcServings();
            //render recipe

            clearLoader();
            recipeView.renderRecipe(state.recipe);

            
        } catch(err) {
            alert('Error processing id ' + err);

        }
    }
}

//window.addEventListener('hashchange', controlRecipe);
//window.addEventListener('load', controlRecipe);
['hashchange','load'].forEach(event => {
    window.addEventListener(event, controlRecipe)
})