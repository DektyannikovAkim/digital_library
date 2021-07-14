'use strict'

const API = "https://www.googleapis.com/books/v1/volumes?q=search+terms";

const app = {
    data() {
        return {
            showFavorites: false,
            likedBooks: localStorage.length,
            books: [],
            favoritesBooks: []
        }
    },
    methods: {
        getJson() {
            return fetch(`${API}`)
                .then(result => result.json()).catch(error => {
                    console.log(error);
                    return [];
                })
        },
        getFavoritesBooks() {
            let keys = Object.keys(localStorage);
            let i = keys.length;

            while (i--) {
                this.favoritesBooks.push(JSON.parse(localStorage.getItem(keys[i])));
            }
            console.log(this.favoritesBooks);
        },
        addFavorites(indx) {
            if (!localStorage.getItem(indx)) {
                localStorage.setItem(indx, JSON.stringify(this.books[indx]))
            } else localStorage.removeItem(indx);
            // Подумать можно ли упростить проверку содержания localStorage для отображения текста в избранном
            this.likedBooks = localStorage.length;
        },
        searchBooks() {

        }
    },

    mounted() {
        this.getJson()
            .then(data => {
                this.books.push(...data.items);
            });
        this.getFavoritesBooks();
    },

    watch: {
        likedBooks() {
            this.getFavoritesBooks();
        }
    }
}

Vue.createApp(app).mount('#app');