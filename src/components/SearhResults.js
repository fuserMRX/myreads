import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { search } from '../BooksAPI';
import Control from './Control';

export default class SearhResults extends Component {

    constructor(props) {
        super(props);
        this.scrollState = this.props.triggerScroll;
        // Prevent scrolling to the bottom if we switch to the main page ("/")
        // And updated state for filtered books in order to refresh results
        this.props.updateScrollAndFilteredBooksState(false, []);
    }

    static propTypes = {
        updateBooks: PropTypes.func.isRequired,
        updateScrollAndFilteredBooksState: PropTypes.func.isRequired,
        booksOnShelves: PropTypes.array.isRequired,
        filteredBooks: PropTypes.array.isRequired
    }

    state = {
        queryBooks: [],
        error: ''
    };

    /**
    * State handling function
    * @description handles state based on search availability
    * @param {object} event - SyntheticEvent object
    * @returns {string} updated state
    */
    handleSearchChange = (event) => {
        let val = event.target.value;
        search(val)
            .then((searchResult) => {
                const errorMessage = 'Unfortunately there are no books in your search result. Please try another one.';
                this.setState(() => ({
                    queryBooks: (searchResult && !searchResult.error) ? searchResult : [],
                    error: (searchResult && searchResult.error) ? errorMessage : ''
                }));
            });
    };


    /**
    * Helper for shelves consistency between pages
    * @description help to define shelf and pass it for consistency between search and main page
    * @param {object} book - book from the serach query
    * @returns {string || object} returns empty string or book object
    */
    checkIfBookExistsOnShelf(book) {
        const existingBooks = this.props.booksOnShelves;
        const searchBooks = existingBooks.filter(existingBook => existingBook.id === book.id);
        if (searchBooks.length > 0) {
            return searchBooks[0].shelf;
        }
        return '';
    }

    render() {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to="/" className="close-search">
                        Close
                    </Link>
                    <div className="search-books-input-wrapper">
                        <input type="text" placeholder="Search by title or author" value={this.state.value} onChange={this.handleSearchChange} />
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {this.state.error ? this.state.error : this.state.queryBooks.map((book) => (
                            <li key={book.id}>
                                <div className="book">
                                    <div className="book-top">
                                        <div className="book-cover"
                                            style={{ width: 128, height: 193, backgroundImage: `url(${(book.imageLinks && book.imageLinks.thumbnail) || (book.imageLinks && book.imageLinks.smallThumbnail)})`}}>
                                        </div>
                                        <Control triggerScroll={'false'} defaultValue={this.checkIfBookExistsOnShelf(book) || 'none'} book={book} updateBooks={this.props.updateBooks} />
                                    </div>
                                    <div className="book-title">{book.title && book.title}</div>
                                    <div className="book-authors">
                                        {book.authors && book.authors.join(', ')}
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        );
    }
}
