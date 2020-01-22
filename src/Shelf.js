import React from 'react';

const Shelf = (props) => {
    const books = props.shelfBooks;
    const bookTitle = convertIdIntoTitle(props.shelfId);

    /**
    * Converts the "book shelf id" into shelf title
    * @description Converts the "book shelf id" into shelf title with corresponding upprecase letters
    * @param {string} shelfId - The id of the book shelf
    * @returns {string} shelf title
    */
    function convertIdIntoTitle(shelfId) {
        let bookTitle = shelfId.split(/(?=[A-Z])/).map( word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
        return bookTitle;
    }

    return (
        <div>
            <div className="bookshelf">
                <h2 className="bookshelf-title">{bookTitle}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {books.map(book => (
                            <li key={book.id}>
                                <div className="book">
                                    <div className="book-top">
                                        <div className="book-cover"
                                            style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}>
                                        </div>
                                    </div>
                                    <div className="book-title">{book.title}</div>
                                    <div className="book-authors">{book.authors[0]}</div>
                                </div>
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        </div>
    );
};

export default Shelf;
