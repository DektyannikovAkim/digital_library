const favoriteItem = {
    props: ['item'],
    template: `
    <figure class="favorites-item">
        <img :src="item.volumeInfo.imageLinks.smallThumbnail" alt="Фото книги">
        <figcaption class="favorites-item-info">
             <div class="wrapper-for-info">
                        <h3>{{ item.volumeInfo.title }}</h3>
                        <button class="remove-favorites" @click="$parent.toggleFavorites(item)">Remove from favorites</button>
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
            if (JSON.parse(localStorage.getItem('favoritesBooks'))) {
                this.$parent.favoritesBooks = JSON.parse(localStorage.getItem('favoritesBooks'));
            }
        },
        toggleFavorites(item) {
            if (this.$parent.favoritesBooks.find(el => el.id === item.id)) {
                this.$parent.favoritesBooks = this.$parent.favoritesBooks.filter(el => el.id !== item.id)
                this.$parent.books.find(el => el.id === item.id).favorite = false;
            } else {
                this.$parent.favoritesBooks.push(item);
                this.$parent.books.find(el => el.id === item.id).favorite = true;
            }

            localStorage.setItem('favoritesBooks', JSON.stringify(this.$parent.favoritesBooks))
        },
        clearFavorites() {
            localStorage.clear();
            this.$parent.favoritesBooks.length = 0;
            this.$parent.books.forEach(el => el.favorite = false);
        }
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