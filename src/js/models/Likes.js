export default class Likes {
    constructor() {
        this.likes = [];
    }

    addLike(id, title, author, img) {
        const like = {id, title, author, img}
        this.likes.push(like)

        // localstorag save it
        this.persistData();
        return like;
    }

    deleteLike(id) {
        const index = this.likes.findIndex(el => {
            return el.id === id
        })
        // [2,4,8]  splice(1,1)  - return 4 , original array [2,8]
        // // [2,4,8]  slice(1,2)  - return 4 ,  original array [2,4,8]
        this.likes.splice(index, 1);

        //perisit localstorage
        this.persistData() 
    }
    
    isLiked(id) {
        return this.likes.findIndex(el => el.id === id) !== -1
    }

    getNumLikes() {
        return this.likes.length
    }

    persistData() {
        localStorage.setItem('likes', JSON.stringify(this.likes))
    }

    readStorage() {
        const storage = JSON.parse( localStorage.getItem('likes'))

        
        if(storage) this.likes = storage;

    }
}