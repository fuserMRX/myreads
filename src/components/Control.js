import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { update } from '../BooksAPI';


class Control extends Component {

    static propTypes = {
        book: PropTypes.object.isRequired,
        updateBooks: PropTypes.func.isRequired
    }

    state = {
        shelfId: ''
    }

    handleChange = (e) => {
        let shelfToChange = e.target.value;
        // Update shelf ID on the backend side
        update(this.props.book, shelfToChange)
            .then(res => {
                console.log(res);
                // Ability to show at once the needed shelf in select
                this.setState(() => ({
                    shelfId: shelfToChange
                }));
                this.props.updateBooks();
            })
            .catch(e => console.log(e.message));
    };

    render() {
        return (
            <div>
                <div className="book-shelf-changer">
                    <select value={this.state.shelfId || this.props.defaultValue || 'none'} onChange={this.handleChange}>
                        <option value="move" disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                    </select>
                </div>
            </div>
        );
    }
}

export default Control;
