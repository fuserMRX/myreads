import React from 'react';
import PropTypes from 'prop-types';

// Fully controlled component because value in input depends on value in the state on the Main page (App.js - state)
const SearchFilter = (props) => {
    return (
        <div className="search-books">
            <div className="search-books-main-page-bar">
                <div className="search-books-input-wrapper">
                    <input type="text"
                        placeholder="Search by title"
                        value={props.presentQuery}
                        onChange={props.filterBooks} />
                </div>
            </div>
        </div>
    );
};

SearchFilter.propTypes = {
    filterBooks: PropTypes.func.isRequired,
    presentQuery: PropTypes.string.isRequired
};

export default SearchFilter;
