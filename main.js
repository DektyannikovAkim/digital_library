'use strict'

const API = "https://www.googleapis.com/books/v1/volumes?q=search+terms";

const app = {
    data() {
        return {
            showFavorites: false,
            books: [],
            favoritesBooks: [],
        }
    },
    components: {
        'books': books,
        'favorites-books': favoritesBooks,
        'search': search,
        'sorter': sorter
    },
    methods: {
        getJson() {
            return fetch(`${API}`)
                .then(result => result.json()).catch(error => {
                    console.log(error);
                    return [];
                })
        }
    },
}

Vue.createApp(app).mount('#app');