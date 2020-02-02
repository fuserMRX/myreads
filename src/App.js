import React from 'react';
import { Route } from 'react-router-dom';
import { getAll, update } from './BooksAPI';
import ShelvesView from './components/ShelvesView';
import SearchResults from './components/SearchResults';
import './App.css';

class BooksApp extends React.Component {

    constructor(props){
        super(props);
        this.errorMessage = 'Sorry you don\'t have any books on shelves. Please consider to use button below to add new ones.';
    }

    state = {
        books: [],
        shelvesIds: [],
        triggerScroll: false,
        filteredBooksObj: {
            updatedBooks: [],
            query: ''
        },
        error: ''
    }

    getAllBooks = (changeScroll) => {
        getAll()
            .then(booksFromDB => {
                this.setState(() => ({
                    books: booksFromDB,
                    // Filter shelves Ids and save them in state because new Ids can be added on the backend side
                    shelvesIds: booksFromDB.map(book => book.shelf).filter((shelf, index, arr) => arr.indexOf(shelf) === index),
                    triggerScroll: changeScroll || false,
                    // Clean up filtered books on the main page so that the scroll between books works correctly
                    filteredBooksObj: { updatedBooks: [], query: '' },
                    error: booksFromDB.length ? '' : this.errorMessage
                }));
            });
    }

    removeAllBooksFromTheShelves = () => {
        const { books } = this.state;
        // Immediatly clean all books
        this.setState(() => ({
            books: [],
            shelvesIds: [],
            error: this.errorMessage
        }));
        // Move all books in none
        if (books.length > 0) {
            books.forEach(book => {
                update(book, 'none');
            });
        }
    }

    /**
    * State handling function
    * @description handles state based on search availability
    * @param {object} event - SyntheticEvent object
    */
    filterBooks = (event) => {
        let query = event.target.value;
        const updatedBooks = this.state.books.filter(book => book.title.toLowerCase().includes(query.toLowerCase()));
        this.setState(() => ({
            filteredBooksObj: { updatedBooks: updatedBooks, query: query }
        }));
    }


    componentDidMount() {
        this.getAllBooks();
    }

    updateScrollState = (scrollParam) => {
        this.setState(() => ({
            triggerScroll: scrollParam
        }));
    }

    /**
    * Filter books by the shelf ID
    * @description Filter books by the shelf ID in order to pass books to the specific folder
    * @param {string} shelfId - The id of the book shelf
    * @returns {Array} return books for shelf
    */
    getBooksForShelf = (shelfId) => {
        let booksInShelf = [];
        if (this.state.filteredBooksObj.query) {
            return this.state.filteredBooksObj.updatedBooks.filter((book) => book.shelf === shelfId);
        }
        booksInShelf = this.state.books && this.state.books.filter((book) => book.shelf === shelfId);
        return booksInShelf;
    }

    render() {
        return (
            <div className="app">
                <Route exact path="/" render={() => (
                    <ShelvesView
                        errorMessage={this.state.error}
                        filterBooks={this.filterBooks}
                        presentQuery={this.state.filteredBooksObj.query}
                        shelvesIds={this.state.shelvesIds}
                        getBooksForShelf={this.getBooksForShelf}
                        refreshAllBooks={this.getAllBooks}
                        triggerScroll={this.state.triggerScroll}
                        removeAllBooks={this.removeAllBooksFromTheShelves}
                    />
                )} />
                <Route path="/search" render={() => (
                    <SearchResults
                        triggerScroll={this.state.triggerScroll}
                        filteredBooks={this.state.filteredBooks}
                        updateScrollState={this.updateScrollState}
                        booksOnShelves={Object.values(this.state.books)}
                        updateBooks={this.getAllBooks} />
                )} />
            </div>
        );
    }
}

export default BooksApp;

