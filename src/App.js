import React from 'react';
import { Route } from 'react-router-dom';
import { getAll, update } from './BooksAPI';
import ShelvesView from './components/ShelvesView';
import SearchResults from './components/SearhResults';
import './App.css';

class BooksApp extends React.Component {

    state = {
        books: [],
        shelvesIds: [],
        triggerScroll: false
    }

    getAllBooks = (changeScroll) => {
        getAll()
            .then(booksFromDB => {
                this.setState(() => ({
                    books: booksFromDB,
                    // Filter shelves Ids and save them in state because new Ids can be added on the backend side
                    shelvesIds: booksFromDB.map(book => book.shelf).filter((shelf, index, arr) => arr.indexOf(shelf) === index),
                    triggerScroll: changeScroll || false
                }));
            });
    }

    removeAllBooksFromTheShelves = () => {
        const { books } = this.state;
        this.setState(() => ({
            books: [],
            shelvesIds: []
        }));
        if (books.length > 0) {
            books.forEach(book => {
                update(book, 'none');
            });
        }
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
        const booksInShelf = this.state.books && this.state.books.filter((book) => book.shelf === shelfId);
        return booksInShelf;
    }

    render() {
        return (
            <div className="app">
                <Route exact path="/" render={() => (
                    <ShelvesView
                        shelvesIds={this.state.shelvesIds}
                        getBooksForShelf={this.getBooksForShelf}
                        refreshAllBooks={this.getAllBooks}
                        triggerScroll={this.state.triggerScroll}
                        removeAllBooks={this.removeAllBooksFromTheShelves}
                    />
                )}/>
                <Route path="/search" render={() => (
                    <SearchResults
                        triggerScroll={this.state.triggerScroll}
                        updateScrollState={this.updateScrollState}
                        booksOnShelves={Object.values(this.state.books)}
                        updateBooks={this.getAllBooks} />
                )} />
            </div>
        );
    }
}

export default BooksApp;

