import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SearhFilter extends Component {

    static propTypes = {
        filterBooks: PropTypes.func.isRequired
    }

    state = {
        query: '',
    };

    /**
    * State handling function
    * @description handles state based on search availability
    * @param {object} event - SyntheticEvent object
    * @returns {string} updated state
    */
    handleSearchFilter = (event) => {
        let val = event.target.value;
        this.setState(() => ({
            query: val,
        }));
        this.props.filterBooks(val);
    };

    render() {
        return (
            <div className="search-books">
                <div className="search-books-main-page-bar">
                    <div className="search-books-input-wrapper">
                        <input type="text" placeholder="Search by title" value={this.state.query} onChange={this.handleSearchFilter} />
                    </div>
                </div>
            </div>
        );
    }
}

export default SearhFilter;
