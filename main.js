'use strict'

const API = "https://www.googleapis.com/books/v1/volumes?q=search+terms";

const app = {
    data() {
        return {
            showFavorites: false,
            showCatigories: false,
            books: [],
            favoritesBooks: [],
            categoryNames: {
                authors: {
                    nameOfCategories: "Authors",
                    arrayOfCategories: [],
                },
                year: {
                    nameOfCategories: "Year",
                    arrayOfCategories: [],
                },
                publisher: {
                    nameOfCategories: "Publisher",
                    arrayOfCategories: [],
                }
            }
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
                            this.categoryNames.authors.arrayOfCategories.push(author);
                        }
                    }
                    if (item.volumeInfo.publishedDate) {
                        this.categoryNames.year.arrayOfCategories.push((new Date(item.volumeInfo.publishedDate)).getFullYear());
                    }
                    if (item.volumeInfo.publisher) {
                        this.categoryNames.publisher.arrayOfCategories.push(item.volumeInfo.publisher);
                    }
                }
                this.categoryNames.authors.arrayOfCategories = this.unique(this.categoryNames.authors.arrayOfCategories);
                this.categoryNames.year.arrayOfCategories = this.unique(this.categoryNames.year.arrayOfCategories);
                this.categoryNames.publisher.arrayOfCategories = this.unique(this.categoryNames.publisher.arrayOfCategories);

            })
    }
}

Vue.createApp(app).mount('#app');