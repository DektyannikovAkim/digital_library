const favoriteItem = {
    props: ['item'],
    template: `
    <figure class="favorites-item">
        <img :src="item.volumeInfo.imageLinks.smallThumbnail" alt="Фото книги">
        <figcaption class="favorites-item-info">
             <div class="wrapper-for-info">
                        <h3>{{ item.volumeInfo.title }}</h3>
                        <button class="remove-favorites" @click="$parent.removeFavorites(item)">Remove from favorites</button>
                </div>
        </figcaption>
    </figure>
    `
}

const favoritesBooks = {
    components: { favoriteItem },
    props: ['favoritesBooks'],
    methods: {
        getFavoritesBooks() {
            let keys = Object.keys(localStorage);
            let i = keys.length;
            this.favoritesBooks.length = 0;
            while (i--) {
                this.favoritesBooks.push(JSON.parse(localStorage.getItem(keys[i])));
            }
        },
        toggleFavorites(item) {
            if (!localStorage.getItem(item.id)) {
                localStorage.setItem(item.id, JSON.stringify(this.$parent.books.find(el => el.id === item.id)));
                item.favorite = true;
            } else {
                localStorage.removeItem(item.id);
                item.favorite = false;
            }
            this.getFavoritesBooks()
        },
        removeFavorites(item) {
            let findItem = this.$parent.books.find(el => el.id === item.id);
            if (findItem) {
                findItem.favorite = false;
            }
            localStorage.removeItem(item.id);
            this.getFavoritesBooks();
        },
        clearFavorites() {
            let favoritesList = document.querySelectorAll('.favorites-item');
            localStorage.clear();
            this.favoritesBooks.length = 0;
            for (let i = 0; i < favoritesList.length; i++) {
                favoritesList[i].remove();
            }
            for (let i = 0; i < this.$parent.books.length; i++) {
                this.$parent.books[i].favorite = false;
            }
        }
    },
    mounted() {
        this.getFavoritesBooks();
    },
    template: `
    <div class="favorites-list" v-show="$root.showFavorites">
        <div class="favorites-content">
            <button class="close-favorites-list"
            @click="$root.showFavorites = !$root.showFavorites">
            </button>
            <favoriteItem
            v-if="favoritesBooks.length" 
            v-for="book of favoritesBooks"
            :key="book.id"
            :item="book">
            </favoriteItem>
            <span class="no-books-in-favorites" v-show="!favoritesBooks.length">
            You don't have any favorite books yet :(</span>
            <button v-show="favoritesBooks.length"
            class="clear"
            @click="clearFavorites()">
            Clear favotites</button>
        </div>
    </div>
    `
}