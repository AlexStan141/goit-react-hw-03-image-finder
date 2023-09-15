import React, { Component } from 'react';
import { BallTriangle } from 'react-loader-spinner';
import css from "./Loader.module.css";

export default class Loader extends Component {
  render() {
    return (
      <div className={css.loaderContainer}>
        <BallTriangle
          height={50}
          width={50}
          radius={5}
          color="#4fa94d"
          ariaLabel="ball-triangle-loading"
          wrapperClass={{}}
          wrapperStyle=""
          visible={true}
        />
      </div>
    );
  }
}
