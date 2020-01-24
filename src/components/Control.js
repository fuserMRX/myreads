import React from 'react';
import PropTypes from 'prop-types';
import { update } from '../BooksAPI';

const Control = (props) => {

    const handleChange = (e) => {
        let shelfToChange = e.target.value;
        // Update shelf ID on the backend side
        update(props.book, shelfToChange)
            .then(res => {
                console.log(res);
                props.updateBooks();
            })
            .catch(e => console.log(e.message));
    };

    return (
        <div className="book-shelf-changer">
            <select value={props.defaultValue} onChange={handleChange}>
                <option value="move" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
            </select>
        </div>
    );
};

Control.propTypes = {
    updateBooks: PropTypes.func.isRequired,
    defaultValue: PropTypes.string.isRequired
};

export default Control;
