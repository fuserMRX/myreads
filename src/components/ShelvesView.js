import React, { Suspense } from 'react';
import PropTypes from 'prop-types';
import Search from './Search';
import SearchFilter from './SearchFilter';
import RemoveBooksButton from './RemoveBooksButton';

const Shelf = React.lazy(() => import('./Shelf')); // Lazy-loaded


const ShelvesView = (props) => {
    return (
        <div className="list-books">
            <div className="list-books-title">
                <h1>MyReads</h1>
            </div>
            <SearchFilter filterBooks={props.filterBooks} presentQuery={props.presentQuery} />
            {props.shelvesIds.map(shelfId => (
                <Suspense key={shelfId} fallback={<h1>Loading shelf...</h1>}>
                    <Shelf
                        key={shelfId}
                        shelfId={shelfId}
                        shelfBooks={props.getBooksForShelf(shelfId)}
                        refreshAllBooks={props.refreshAllBooks}
                        triggerScroll={props.triggerScroll}
                    />
                </Suspense>
            ))}
            <Search />
            <RemoveBooksButton removeAllBooks={props.removeAllBooks} />
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
