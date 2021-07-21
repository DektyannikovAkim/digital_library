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