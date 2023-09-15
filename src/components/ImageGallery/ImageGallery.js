import React, { Component } from 'react';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';
import PropTypes from 'prop-types';

export default class ImageGallery extends Component {
  render() {
    return (
      <ul className={css.gallery}>
        {this.props.images.map((image, index) => {
          return (
            <ImageGalleryItem
              source={image.webformatURL}
              description={image.tags}
              key={index}
              onImageClick={description => {
                this.props.onImageGalleryClick(
                  image.largeImageURL,
                  description
                );
              }}
            ></ImageGalleryItem>
          );
        })}
      </ul>
    );
  }
}

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.any).isRequired,
  onImageGalleryClick: PropTypes.func.isRequired,
};
