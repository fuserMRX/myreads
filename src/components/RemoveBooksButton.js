import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const RemoveBooksButton = (props) => {
    const handleRemoveBooks = (e) => {
        window.confirm('Are you sure you want to delete all books from the shelves?') &&
            props.removeAllBooks(e);
    };
    return (
        <div className="remove-books">
            <button onClick={handleRemoveBooks}>
                <FontAwesomeIcon icon={faTrashAlt} size="2x" />
                <span>Remove All Books</span>
            </button>
        </div>
    );
};

RemoveBooksButton.propTypes = {
    removeAllBooks: PropTypes.func.isRequired
};

export default RemoveBooksButton;
