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
            if (this.favoritesBooks.length) {}
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
        removeFavorites(item) {
            localStorage.removeItem(item.id);
            this.getFavoritesBooks();
        },
        clearFavorites() {
            let favoritesList = document.querySelectorAll('.favorites-item');
            for (let i = 0; i < favoritesList.length; i++) {
                favoritesList[i].remove();
                localStorage.clear();
                this.favoritesBooks.length = 0;
            }
        },
        searchBooks(event) {
            let searchQuery = event.target.querySelector(".search-text").value;
            this.books.length = 0;
            this.getJson().then(data => {
                data.items.forEach(item => {
                    if (item.volumeInfo.title.toLowerCase().includes(searchQuery.toLowerCase())) {
                        this.books.push(item);
                    }
                })
            })
        },
        actvFavorite(item) {
            if (localStorage.getItem(item.id)) {
                return 'favorite';
            } else return '';
        },
        sortByCategories(category) {
            switch (category) {
                case 'date':
                    this.books.sort((a, b) => {
                        let firstDate = new Date(a.volumeInfo.publishedDate);
                        let secondDate = new Date(b.volumeInfo.publishedDate);
                        if (!a.volumeInfo.publishedDate && !b.volumeInfo.publishedDate) {
                            return 0;
                        } else if (!a.volumeInfo.publishedDate) {
                            return -1;
                        } else if (!b.volumeInfo.publishedDate) {
                            return 1;
                        }
                        return firstDate - secondDate;
                    });
                    break;
                case 'alphabet':
                    this.books.sort((a, b) => {
                        let firstName = a.volumeInfo.title.toLowerCase();
                        let secondName = b.volumeInfo.title.toLowerCase();
                        if (firstName < secondName) {
                            return -1;
                        } else if (firstName > secondName) {
                            return 1;
                        }
                        return 0;
                    })
                    break;
                case 'rating':
                    this.books.sort((a, b) => {
                        return a.rating - b.rating;
                    })
                    break;
            }
        },
        addRating(item) {
            if (item.rating < 10) {
                item.rating++;
            }
        },
        removeRating(item) {
            if (item.rating > 0) {
                item.rating--;
            }
        }
    },


    mounted() {
        this.getJson()
            .then(data => {
                for (let item of data.items) {
                    const newItem = Object.assign({ rating: 0 }, item);
                    this.books.push(newItem);
                }
                console.log(this.books);
            });
        this.getFavoritesBooks();
    }
}

Vue.createApp(app).mount('#app');