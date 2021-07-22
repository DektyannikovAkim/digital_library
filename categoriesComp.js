const categorySection = {
    props: ["arrayOfSections", "categoryName"],
    template: `
    <nav class="categories-info"
     v-show="$parent.showCatigories">
     <button class="category-items"
        @click="$parent.filterByCategory('All', categoryName)"
        >All</button>
        <button class="category-items"
        v-for="item of arrayOfSections"
        @click="$parent.filterByCategory(item, categoryName)"
        >{{ item }}</button>
    </nav>          
    `
}


const categories = {
    props: ['categoryName', "arrayOfSections"],
    components: {
        'category-section': categorySection,
    },
    data() {
        return {
            showCatigories: false,
        }
    },
    methods: {
        filterByCategory(item, category) {
            this.$parent.books.length = 0;
            if (item !== 'All') {
                switch (category) {
                    case 'Authors':
                        this.$parent.getJson()
                            .then(data => {
                                this.$root.$refs.books.getBooks(data.items);
                                this.$parent.books = this.$parent.books.filter(el => {
                                    if (el.volumeInfo.authors) {
                                        return el.volumeInfo.authors.includes(item);
                                    }
                                });
                            })
                        break;
                    case 'Year':
                        this.$parent.getJson()
                            .then(data => {
                                this.$root.$refs.books.getBooks(data.items);
                                this.$parent.books = this.$parent.books.filter(el => {
                                    let date = (new Date(el.volumeInfo.publishedDate)).getFullYear();
                                    if (date === item) {
                                        return true
                                    }
                                    return false
                                });
                            })
                        break;
                    case 'Publisher':
                        this.$parent.getJson()
                            .then(data => {
                                this.$root.$refs.books.getBooks(data.items);
                                this.$parent.books = this.$parent.books.filter(el => {
                                    return el.volumeInfo.publisher === item;
                                });
                            })
                        break;
                }
            } else {
                this.$parent.getJson()
                    .then(data => {
                        this.$root.$refs.books.getBooks(data.items);
                    })
            }
        }
    },
    template: `
    <div class="categories" @click="showCatigories = !showCatigories">
                    {{ categoryName }}
                    <div class="arrow-down" v-if="!showCatigories"></div>
                    <div class="arrow-up" v-else></div>
                    <category-section
                    :array-of-sections="arrayOfSections"
                    :category-name="categoryName"
                    ></category-section>
                </div>
    `
}