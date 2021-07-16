'use strict'

const API = "https://www.googleapis.com/books/v1/volumes?q=search+terms";

const app = {
    data() {
        return {
            showFavorites: false,
            books: [],
            favoritesBooks: [],
            activeBtn: false
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
            if (this.favoritesBooks.length) {
                // this.clearFavorites();
            }
            this.favoritesBooks.length = 0;
            while (i--) {
                this.favoritesBooks.push(JSON.parse(localStorage.getItem(keys[i])));
            }
        },
        addFavorites(item) {
            if (!localStorage.getItem(item.id)) {
                localStorage.setItem(item.id, JSON.stringify(this.books.find(el => el.id === item.id)));
            } else {
                localStorage.removeItem(item.id);
            }
            this.getFavoritesBooks()
        },
        clearFavorites() {
            let favoritesList = document.querySelectorAll('.favorites-item');
            for (let i = 0; i < favoritesList.length; i++) {
                favoritesList[i].remove();
            }
        },
        searchBooks() {

        },
        actvFavorite(item) {
            if (localStorage.getItem(item.id)) {
                return 'favorite';
            } else return '';
        }
    },

    mounted() {
        this.getJson()
            .then(data => {
                this.books.push(...data.items);
            });
        this.getFavoritesBooks();
    }
}

Vue.createApp(app).mount('#app');