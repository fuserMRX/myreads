import React from 'react';
import { Route } from 'react-router-dom';
import { getAll } from './BooksAPI';
import ShelvesView from './components/ShelvesView';
import SearchResults from './components/SearhResults';
import './App.css';

class BooksApp extends React.Component {

    state = {
        books: [],
        shelvesIds: []
    }

    getAllBooks = () => {
        getAll()
            .then(booksFromDB => {
                console.log(booksFromDB);
                this.setState(() => ({
                    books: booksFromDB,
                    // Filter shelves Ids and save them in state because new Ids can be added on the backend side
                    shelvesIds: booksFromDB.map(book => book.shelf).filter((shelf, index, arr) => arr.indexOf(shelf) === index)
                }));
            });
    }

    componentDidMount() {
        this.getAllBooks();
    }

    /**
    * Filter books by the shelf ID
    * @description Filter books by the shelf ID in order to pass books to the specific folder
    * @param {string} shelfId - The id of the book shelf
    * @returns {Array} return books for shelf
    */
    getBooksForShelf = (shelfId) => {
        const booksInShelf = this.state.books.filter((book) => book.shelf === shelfId);
        return booksInShelf;
    }

    render() {
        return (
            <div className="app">
                <Route exact path="/" render={() => (
                    <ShelvesView shelvesIds={this.state.shelvesIds} getBooksForShelf={this.getBooksForShelf} refreshAllBooks={this.getAllBooks}/>
                )}/>
                <Route path="/search" render={() => (
                    <SearchResults booksOnShelves={Object.values(this.state.books)} updateBooks={this.getAllBooks} />
                )} />
            </div>
        );
    }
}

export default BooksApp;

