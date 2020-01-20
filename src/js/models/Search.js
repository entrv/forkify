import axios from 'axios'

class Search {
    constructor(query) {
        this.query = query;
    }

    async getResults(query) {
        const proxy = "https://cors-anywhere.herokuapp.com/"
        const app_key = "d1edbb4c8552cec56b76bfb9f993041e"
        const app_id = "fa57c242"
        try {
        const res = await axios(`${proxy}https://api.edamam.com/search?app_id=${app_id}&app_key=${app_key}&q=${this.query}&to=30`)
        this.results = res.data.hits;
       
        console.log(res.data.hits)
        } catch(error) {
            alert(error)
        }
    }

}

export default Search;
