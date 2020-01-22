import axios from 'axios'
import {app_key, proxy, app_id} from '../config'
export default class Recipe {
    constructor(id) {
        this.id = id;
    }

    async getRecipe() {
        try {
            const res = await axios(`${proxy}https://api.edamam.com/search?app_id=${app_id}&app_key=${app_key}&q=pizza&to=1&Id=${this.id}`)
            
            this.title = res.data.hits[0].recipe.label;
            this.author = res.data.hits[0].recipe.source;
            this.img = res.data.hits[0].recipe.image;
            this.url = res.data.hits[0].recipe.uri;
            this.ingredients = res.data.hits[0].recipe.ingredients;
            console.log(res.data.hits[0].recipe)
            

        } catch (error) {
            console.log('Recipe Error: ' + error)
            alert('Something went wrong :(')
        }
    }

    calcTime(){
        const numIng =this.ingredients.length;
        const periods = Math.ceil(numIng / 3)
        this.time = periods * 15;
    }

    calcServings() {
        this.servings = 4;
    }

    parseIngredients() {
        const unitsLong = ['tablespoons', 'tablespoon','ounce','ounces','teaspoon','teaspoons','cups','pounds'];
        const unitShort = ['tbsp','tbsp','oz','oz','tsp','tsp','cup','pount']
        console.log('entrv=' + this.title)
        const newIngredients =this.ingredients.map(el =>{
            
            // uniform units
            let ingredient = el.text.toLowerCase();

            unitsLong.forEach((unit, i) => {
                ingredient = ingredient.replace(unit, unitShort[i])
            });
            //remove parentheses
            ingredient = ingredient.replace(/ *\([^)]*\) */g, " ");
            
            //parse ingredients into count ,unit, and ingredient

            const arrIng = ingredient.split(' ')
            const unitIndex = arrIng.findIndex(el2 =>{
                return unitShort.includes(el2)
            })
            let objIng;

            
            if (unitIndex > -1) {
                //there is a unit
                const arrCount = arrIng.slice(0, unitIndex);
                let count;
                if (arrCount.length === 1) {
                    
                    count = eval(arrIng[0].replace('-','+'))
                } else {
                    count = eval(arrIng.slice(0, unitIndex).join('+'))
                    
                }
                objIng = {
                    count: count,
                    unit: arrIng[unitIndex],
                    ingredient: arrIng.slice(unitIndex + 1).join(' ')
                }
            }  else if (parseInt(arrIng[0], 10)) {
                
                //there is no unit, but 1st element is number
                objIng ={
                    count: parseInt(arrIng[0]),
                    unit: '',
                    ingredient: arrIng.slice(1).join(' ')
                }
            } else if (unitIndex === -1) {
                // there is no unit ad no number in 1st position
                
                objIng ={
                    count : 1,
                    unit: '',
                    ingredient: ingredient,
                }
            } else {
               
            }
            return objIng;
        });

        this.ingredients = newIngredients;
    }
}