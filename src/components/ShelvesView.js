import React from 'react';
import PropTypes from 'prop-types';
import Shelf from './Shelf';
import Search from './Search';

const ShelvesView = (props) => {
    return (
        <div className="list-books">
            <div className="list-books-title">
                <h1>MyReads</h1>
            </div>
            {props.shelvesIds.map(shelfId => (
                <Shelf key={shelfId} shelfId={shelfId} shelfBooks={props.getBooksForShelf(shelfId)} refreshAllBooks={props.refreshAllBooks} />
            ))}
            <Search />
        </div>
    );
};

ShelvesView.propTypes = {
    shelvesIds: PropTypes.array.isRequired,
    getBooksForShelf: PropTypes.func.isRequired,
    refreshAllBooks: PropTypes.func.isRequired
};

export default ShelvesView;
