import React from 'react';
import PropTypes from 'prop-types';
import Shelf from './Shelf';
import Search from './Search';
import SearchFilter from './SearchFilter';
import RemoveBooksButton from './RemoveBooksButton';

const ShelvesView = (props) => {
    const noBooksMessage = 'Sorry you don\'t have any books on shelves. Please consider to use button below to add new ones.';
    return (
        <div className="list-books">
            <div className="list-books-title">
                <h1>MyReads</h1>
            </div>
            <SearchFilter filterBooks={props.filterBooks} />
            {!props.shelvesIds.length && <h3 style={{textAlign: 'center'}}>{noBooksMessage}</h3>}
            {props.shelvesIds.map(shelfId => (
                <Shelf
                    key={shelfId}
                    shelfId={shelfId}
                    shelfBooks={props.getBooksForShelf(shelfId)}
                    refreshAllBooks={props.refreshAllBooks}
                    triggerScroll={props.triggerScroll}
                />
            ))}
            <Search />
            <RemoveBooksButton removeAllBooks={props.removeAllBooks}/>
        </div>
    );
};

ShelvesView.propTypes = {
    shelvesIds: PropTypes.array.isRequired,
    getBooksForShelf: PropTypes.func.isRequired,
    refreshAllBooks: PropTypes.func.isRequired,
    triggerScroll: PropTypes.bool.isRequired,
    removeAllBooks: PropTypes.func.isRequired
};

export default ShelvesView;
