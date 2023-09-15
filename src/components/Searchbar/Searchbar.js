import React, { Component } from 'react';
import css from './Searchbar.module.css';
import PropTypes from 'prop-types';

export default class Searchbar extends Component {

  handleChange = evt => {
    const { name, value } = evt.target;
	console.log(name);
    this.props.workWithProps(value);
  };

  handleSubmit = evt => {
    evt.preventDefault();
    this.props.onSubmit();
  };

  render() {
    return (
      <header className="searchbar">
        <form className={css.form} onSubmit={this.handleSubmit}>
          <button type="submit" className={css.button}>
            <span className="button-label">Search</span>
          </button>
          <input
            className={css.input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            name="search"
            onChange={this.handleChange}
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
