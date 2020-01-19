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
import {elements} from './views/base'
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
        //search for recipes
        await state.search.getResults()

        //Render results on UI
        const recipeArr = state.search.results.map(arrResult => {
            return arrResult.recipe;
        })
        
        searchView.renderResults(recipeArr)
    }

}
elements.searchForm.addEventListener('submit', e => {
    e.preventDefault()
    controlSearch()
})
//const search = new Search('pizza')
//console.log(search.getResults().then)


