import React, { Component } from 'react';
import css from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

export default class ImageGalleryItem extends Component {
  render() {
    return (
      <li>
        <img
          src={this.props.source}
          alt={this.props.description}
          className={css.image}
          onClick={() => {
            this.props.onImageClick(this.props.description);
          }}
        />
      </li>
    );
  }
}

ImageGalleryItem.propTypes = {
  source: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  onImageClick: PropTypes.func.isRequired,
};
