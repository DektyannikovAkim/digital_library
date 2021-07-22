'use strict'

const API = "https://www.googleapis.com/books/v1/volumes?q=search+terms";

const app = {
    data() {
        return {
            showFavorites: false,
            showCatigories: false,
            books: [],
            favoritesBooks: [],
            authors: [],
            yearOfPublishing: [],
            publishingHouse: [],
            categoryNames: ['Authors', 'Year', 'Publisher']
        }
    },
    components: {
        'books': books,
        'favorites-books': favoritesBooks,
        'search': search,
        'sorter': sorter,
        'categories': categories
    },
    methods: {
        getJson() {
            return fetch(`${API}`)
                .then(result => result.json()).catch(error => {
                    console.log(error);
                    return [];
                })
        },
        unique(arr) {
            let result = [];

            for (let str of arr) {
                if (!result.includes(str)) {
                    result.push(str);
                }
            }
            return result;
        }
    },
    mounted() {
        this.getJson()
            .then(data => {
                for (let item of data.items) {
                    if (item.volumeInfo.authors) {
                        for (let author of item.volumeInfo.authors) {
                            this.authors.push(author);
                        }
                    }
                    if (item.volumeInfo.publishedDate) {
                        this.yearOfPublishing.push((new Date(item.volumeInfo.publishedDate)).getFullYear());
                    }
                    if (item.volumeInfo.publisher) {
                        this.publishingHouse.push(item.volumeInfo.publisher);
                    }
                }
                this.authors = this.unique(this.authors);
                this.yearOfPublishing = this.unique(this.yearOfPublishing);
                this.publishingHouse = this.unique(this.publishingHouse);

            })
    }
}

Vue.createApp(app).mount('#app');