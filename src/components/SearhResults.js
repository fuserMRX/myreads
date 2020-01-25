import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { search } from '../BooksAPI';
import Control from './Control';

export default class SearhResults extends Component {

    static propTypes = {
        updateBooks: PropTypes.func.isRequired
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
                console.log(searchResult);
                this.setState(() => ({
                    queryBooks: (searchResult && !searchResult.error) ? searchResult : [],
                    error: (searchResult && searchResult.error) ? errorMessage : ''
                }));
            });
    };

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
                                        <Control defaultValue={book.shelf || 'none'} book={book} updateBooks={this.props.updateBooks} />
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
