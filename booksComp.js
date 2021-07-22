const book = {
    props: ['book'],
    template: `
<figure class="books-item">
    <img :src="book.volumeInfo.imageLinks.smallThumbnail" alt="Фото книги">
    <figcaption class="item-info">
        <div class="wrapper-for-interaction">
            <div class="wrapper-for-rating">
                <button class="count-buttons remove-rating" @click="$parent.removeRating(book)"></button>
                <input class="number-of-rating" type="text" :value="book.rating" readonly>
                <button class="count-buttons add-rating" @click="$parent.addRating(book)"></button>
            </div>
            <button class="book-add" type="button" 
            @click="$root.$refs.favoritesBooks.toggleFavorites(book)"
            :class="{ favorite: book.favorite}">
                <i class="fas fa-star"></i>
            </button>
        </div>
        <h3>{{ book.volumeInfo.title }}</h3>
        <h4 v-if="book.volumeInfo.authors" v-for="author of book.volumeInfo.authors">{{ author }}</h4>
        <h4 v-else>Author unknown</h4>
    </figcaption>
</figure>`
}

const books = {
    components: { book },
    props: ['books'],
    methods: {
        addRating(item) {
            if (item.rating < 10) {
                item.rating++;
            }
        },
        removeRating(item) {
            if (item.rating > 0) {
                item.rating--;
            }
        },
        getBooks(items) {
            for (let item of items) {
                let newItem = '';
                if (localStorage.getItem(item.id)) {
                    newItem = Object.assign({ rating: 0, favorite: true }, item);
                } else newItem = Object.assign({ rating: 0, favorite: false }, item);
                this.books.push(newItem);
            }
        }
    },

    mounted() {
        this.$parent.getJson()
            .then(data => {
                this.getBooks(data.items)
                console.log(this.books);
            })
    },
    template: `
    <div class="books-list">
        <book 
            v-for="book of books" 
            :key="book.id"
            :book="book">
        </book>
    </div>`
}