const sorter = {
    data() {
        return {
            dateSort: false,
            alphabetSort: false,
            ratingSort: false
        }
    },
    methods: {
        sortByCategories(sortingState, sortParameter) {
            if (!sortingState) {
                switch (sortParameter) {
                    case 'date':
                        this.$parent.books.sort((a, b) => { return this.sortByDateUp(a, b) });
                        break;
                    case 'alphabet':
                        this.$parent.books.sort((a, b) => { return this.sortByAlphabetUp(a, b) });
                        break;
                    case 'rating':
                        this.$parent.books.sort((a, b) => { return this.sortByRatingUp(a, b) });
                        break;
                }
            } else {
                switch (sortParameter) {
                    case 'date':
                        this.$parent.books.sort((a, b) => { return this.sortByDateDown(a, b) });
                        break;
                    case 'alphabet':
                        this.$parent.books.sort((a, b) => { return this.sortByAlphabetDown(a, b) });
                        break;
                    case 'rating':
                        this.$parent.books.sort((a, b) => { return this.sortByRatingDown(a, b) });
                        break;
                }
            }
        },
        sortByDateUp(firstValue, secondValue) {
            let firstDate = new Date(firstValue.volumeInfo.publishedDate);
            let secondDate = new Date(secondValue.volumeInfo.publishedDate);
            if (!firstValue.volumeInfo.publishedDate && !secondValue.volumeInfo.publishedDate) {
                return 0;
            } else if (!firstValue.volumeInfo.publishedDate) {
                return -1;
            } else if (!secondValue.volumeInfo.publishedDate) {
                return 1;
            }
            return firstDate - secondDate;
        },
        sortByDateDown(firstValue, secondValue) {
            let firstDate = new Date(firstValue.volumeInfo.publishedDate);
            let secondDate = new Date(secondValue.volumeInfo.publishedDate);
            if (!firstValue.volumeInfo.publishedDate && !secondValue.volumeInfo.publishedDate) {
                return 0;
            } else if (!firstValue.volumeInfo.publishedDate) {
                return 1;
            } else if (!secondValue.volumeInfo.publishedDate) {
                return -1;
            }
            return secondDate - firstDate;
        },
        sortByAlphabetUp(firstValue, secondValue) {
            let firstName = firstValue.volumeInfo.title.toLowerCase();
            let secondName = secondValue.volumeInfo.title.toLowerCase();
            if (firstName < secondName) {
                return -1;
            } else if (firstName > secondName) {
                return 1;
            }
            return 0;
        },
        sortByAlphabetDown(firstValue, secondValue) {
            let firstName = firstValue.volumeInfo.title.toLowerCase();
            let secondName = secondValue.volumeInfo.title.toLowerCase();
            if (firstName < secondName) {
                return 1;
            } else if (firstName > secondName) {
                return -1;
            }
            return 0;
        },
        sortByRatingUp(firstValue, secondValue) {
            return firstValue.rating - secondValue.rating;
        },
        sortByRatingDown(firstValue, secondValue) {
            return secondValue.rating - firstValue.rating;
        }
    },
    template: `
<div class="sort_by">
    <div class="sort_by-text">
        <span>Sort By</span>
    </div>
    <button class="sort_by-select" @click="sortByCategories(alphabetSort, 'alphabet'), alphabetSort = !alphabetSort">Alphabet
         <span v-if="!alphabetSort">A-z</span>
         <span v-else>Z-a</span>
    </button>
    <button class="sort_by-select" @click="sortByCategories(ratingSort, 'rating'), ratingSort = !ratingSort">Rating
         <img v-if="!ratingSort" src="img/arrow-up-thin.svg" alt="arrow-up">
         <img v-else src="img/arrow-down-thin.svg" alt="arrow-down">
        </button>
    <button class="sort_by-select" @click="sortByCategories(dateSort, 'date'), dateSort = !dateSort">Date of issue
         <img v-if="!dateSort" src="img/arrow-up-thin.svg" alt="arrow-up">
         <img v-else src="img/arrow-down-thin.svg" alt="arrow-down">
    </button>
</div>
    `
}