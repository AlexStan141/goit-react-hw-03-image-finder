import React, { Component } from 'react';
import css from './Button.module.css';
import PropTypes from 'prop-types';

export default class Button extends Component {
  render() {
    return (
      <button onClick={this.props.loadMoreImages} className={css.button}>
        Load more
      </button>
    );
  }
}

Button.propTypes = {
  loadMoreImages: PropTypes.func.isRequired,
};
