import {elements} from './base'

export const getInput = () => {
    console.log('getInput')
    return elements.searchInput.value;
    
}
export const clearResults = () => {
    elements.searchResList.innerHTML = '';
    elements.searchResPages.innerHTML = '';
}
export const clearInput = () => {
    elements.searchInput.value = '';
    
}

export const highlightSelected= id => {

    const resultstArr = Array.from(document.querySelectorAll('.results__link'))
    resultstArr.forEach( el => {
        el.classList.remove('results__link--active')
        
    })
    document.querySelector(`a[href="#${id}"]`).classList.add('results__link--active')
}

//'pasta with tomato and spinach
// acc : 0 / acc+cur.length = 5 / newTitle = ['pasta']
// acc : 5 / acc+cur.length = 9 / newTitle = ['pasta','with']
export const limitRecipeTitle = (title, limit = 17) => {
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
                    <a class="results__link " href="#${recipe.source}">
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

// type : prev or next
const createButton = (page, type) => {

    return `<button class="btn-inline results__btn--${type}"
    data-goto=${type === 'prev' ? page -1 : page + 1}>
    <svg class="search__icon">
        <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
    </svg>
    <span>Page ${type === 'prev' ? page -1 : page + 1}</span>
</button>
`

}
const rederButton = (page, numResults, resPerPage) => {
    const pages = Math.ceil(numResults / resPerPage);
    console.log('pages ===' + pages + ',numResults' + numResults +  ',resPerPage' + resPerPage)
    let button;
    if (page === 1 && pages > 1) {
        //next page go
        button = createButton(page, 'next');
    } else if (page < pages) {
        //both button
        button = `
        ${createButton(page, 'prev')}
        ${createButton(page, 'next')}
        `
    } else if (page === pages && pages > 1) {
        //button on only prev pages
        button = createButton(page, 'prev');
    }

    elements.searchResPages.insertAdjacentHTML('afterbegin', button)
}
export const renderResults = (recipes, page =1, resPerPage = 10) => {
    // current page
    const start = (page -1) * resPerPage;
    const end = page * resPerPage;
    console.log('start-end' + start + '///' +  end + '///' + recipes.length)
    recipes.slice(start, end).forEach(element => {
                
        renderRecipe(element)
    });
    console.log('renderResults' + recipes.length)

    //render pagination button
    rederButton(page, recipes.length, resPerPage)
}