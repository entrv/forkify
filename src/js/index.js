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
import * as listView from './views/listView'
import * as likesView from './views/likesView'
import {elements, renderLoader,clearLoader} from './views/base'
import Recipe from './models/Recipe'
import List from './models/List'
import Likes from './models/Likes'

/**
 * -search object
 * current recipe object
 * Shopping list object
 * liked object
 */

const state = {}
window.state = state;
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
            recipeView.renderRecipe(
                state.recipe,
                state.likes.isLiked(id)
                );

            
        } catch(err) {
            console.log(err)
            alert('Error processing id ' + err);

        }
    }
}

//window.addEventListener('hashchange', controlRecipe);
//window.addEventListener('load', controlRecipe);
['hashchange','load'].forEach(event => {
    window.addEventListener(event, controlRecipe)
})

const controlList = () => {
    // create new list if there is not yet
    if (!state.list) state.list = new List();


    //add each ingredient
    state.recipe.ingredients.forEach(el => {
        const item = state.list.addItem(el.count, el.unit, el.ingredient)
        console.log(item)
        listView.renderItem(item);
    })


}

// handle delete and update list item events

elements.shopping.addEventListener('click', e=> {
    const id = e.target.closest('.shopping__item').dataset.itemid;
    
    if (e.target.matches('.shopping__delete, .shopping__delete *')) {
        console.log('shopping__delete')
        state.list.deleteItem(id);

        listView.deleteItem(id);
    } else if (e.target.matches('.shopping__count-value')) {
        console.log('shopping__count-value')
        const val = parseInt(e.target.value, 10);
        state.list.updateCount(id, val);
    }
})



//restore liked recipes

window.addEventListener('load', () => {
    
    state.likes = new Likes();
    
    state.likes.readStorage();
    console.log('state.likes.getNumLikes' + state.likes.getNumLikes)
    likesView.toggleLikeMenu(state.likes.getNumLikes())

    //render the existing likes
    state.likes.likes.forEach(like => likesView.renderLike(like))
})

/**
 * Like controller
 */

const controlLike = () => {
    if (!state.likes) state.likes = new Likes();
    const currentId = state.recipe.id;

    //user has not yet liked
    if (!state.likes.isLiked(currentId)) {
        //add like to the state
        const newLike = state.likes.addLike(
            currentId,
            state.recipe.title,
            state.recipe.author,
            state.recipe.img
        )
        //toggle button like
        likesView.toggleLikeBtn(true)
        //add like to ui list

        likesView.renderLike(newLike)
        
    } else {
        //user has liked
        //remove like button
        state.likes.deleteLike(currentId)

        //toggle like button
        likesView.toggleLikeBtn(false)
        //remove like from ui list
        likesView.deleteLike(currentId)
    }

    likesView.toggleLikeMenu(state.likes.getNumLikes())
    
}


//handling recipe button class
elements.recipe.addEventListener('click', e => {
    if (e.target.matches('.btn-decrease, .btn-decrease *')) {
        //decrease button is click
        if (state.recipe.servings > 1) {
            state.recipe.updateServings('dec')
            recipeView.updateServingsIngredients(state.recipe)
        }
        console.log('state.recipe-decrease' + state.recipe)
    } else if (e.target.matches('.btn-increase, .btn-increase *')) {
        //increase button is click
        state.recipe.updateServings('inc')
        recipeView.updateServingsIngredients(state.recipe)
        console.log('state.recipe-increase' + state.recipe)
    } else if (e.target.matches('.recipe__btn-add,.recipe__btn-add *')) {
        //add ingredients to shoppin glist
        controlList();
    } else if (e.target.matches('.recipe__love, .recipe__love *')) {
        // Like controoler
        controlLike();
    }

    
})


