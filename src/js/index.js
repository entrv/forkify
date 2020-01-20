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
import {elements, rederLoader,clearLoader} from './views/base'
/**
 * -search object
 * current recipe object
 * Shopping list object
 * liked object
 */

const state = {}
const controlSearch = async () => {
   const query = searchView.getInput();
  
    if (query) {
        state.search = new Search(query)
           
        //prepare ud for result
        searchView.clearInput();
        searchView.clearResults();
        rederLoader(elements.searchRes)
        //search for recipes
        await state.search.getResults()

        clearLoader();
        //Render results on UI
        const recipeArr = state.search.results.map(arrResult => {
           
            return arrResult.recipe;
        })
        //console.log(state.recipeArr.length)
        searchView.renderResults(recipeArr)
    }

}
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
        console.log(gotoPage)
    }
})




