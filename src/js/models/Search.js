import axios from 'axios'
import {app_key, proxy, app_id} from '../config'
class Search {
    constructor(query) {
        this.query = query;
    }

    async getResults(query) {
        
        
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
