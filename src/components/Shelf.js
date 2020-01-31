import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Control from './Control';

class Shelf extends Component {
    constructor(props){
        super(props);
        this.bookTitle = this.convertIdIntoTitle(this.props.shelfId);
    }

    static propTypes = {
        shelfBooks: PropTypes.array.isRequired,
        shelfId: PropTypes.string.isRequired,
        refreshAllBooks: PropTypes.func.isRequired,
        triggerScroll: PropTypes.bool.isRequired
    };

    /**
    * Converts the "book shelf id" into shelf title
    * @description Converts the "book shelf id" into shelf title with corresponding upprecase letters
    * @param {string} shelfId - The id of the book shelf
    * @returns {string} shelf title
    */
    convertIdIntoTitle(shelfId) {
        let bookTitle = shelfId.split(/(?=[A-Z])/).map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
        return bookTitle;
    }

    /**
    * Detects changes in li and scroll to the shifted book
    * @description class component is used here in order to detect ref changes for a particular instance (particular shelf in our case).
    * That's why functional component is not used here.
    * Functional component will be re-rendered everytime the state in App.js changes and pass all referenes again in the manageRef method
    * which leads to the wrong scroll behavior
    * @param {node} ref - reference to a node
    */
    manageRef = (ref) => {
        if (ref !== null && ref !== undefined && this.props.triggerScroll) {
            ref.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });
        }
    }

    render() {
        return (
            <div className="list-books-content">
                <div className="bookshelf">
                    <h2 className="bookshelf-title">{this.bookTitle}</h2>
                    <div className="bookshelf-books">
                        <ol className="books-grid">
                            {this.props.shelfBooks.map(book => (
                                <li key={book.id} ref={this.manageRef}>
                                    <div className="book">
                                        <div className="book-top">
                                            <div className="book-cover"
                                                style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks && book.imageLinks.thumbnail})` }}>
                                            </div>
                                            <Control
                                                defaultValue={this.props.shelfId}
                                                book={book}
                                                updateBooks={this.props.refreshAllBooks} />
                                        </div>
                                        <div className="book-title">{book.title}</div>
                                        <div className="book-authors">{book.authors && book.authors[0]}</div>
                                    </div>
                                </li>
                            ))}
                        </ol>
                    </div>
                </div>
            </div>
        );
    }
}

export default Shelf;
