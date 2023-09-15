import React, { Component } from 'react';
import css from './Modal.module.css';
import PropTypes from 'prop-types';

export default class Modal extends Component {
  render() {
    return (
      <>
        <div className={css.overlay} onClick={this.props.onCloseModal}></div>
        <div className={css.modal}>
          <img
            src={this.props.imageSrc}
            alt={this.props.imageAlt}
            className={css.image}
          />
        </div>
      </>
    );
  }
}

Modal.propTypes = {
  imageSrc: PropTypes.string.isRequired,
  imageAlt: PropTypes.string.isRequired,
  onCloseModal: PropTypes.func.isRequired,
};
