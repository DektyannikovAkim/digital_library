const search = {
    data() {
        return {
            userSearch: ''
        }
    },
    methods: {
        searchBooks(userSearch) {
            this.$parent.books.length = 0;
            this.$parent.getJson().then(data => {
                data.items.forEach(item => {
                    if (item.volumeInfo.title.toLowerCase().includes(userSearch.toLowerCase())) {
                        item.rating = 0;
                        item.favorite = this.$parent.favoritesBooks.find(el => el.id === item.id);
                        this.$parent.books.push(item);
                    }
                })
            })
        }
    },
    template: `
    <form class="search" @submit.prevent="searchBooks(userSearch)">
        <input type="text" class="search-text" v-model='userSearch'>
        <button class="search-button"></button>
    </form>
    `
}