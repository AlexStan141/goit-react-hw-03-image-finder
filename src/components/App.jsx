import React, { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import { getData, getImagesSlice } from './apiFunctions';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';
import Notiflix from 'notiflix';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
      totalHits: 500,
      loadMoreButtonVisibility: false,
      searchValue: '',
      page: 1,
      loaderVisibility: false,
      modalImageSrc: '',
      modalImageAlt: '',
    };
  }

  init() {
    this.setState({ images: [] });
    this.setState({ loadMoreButtonVisibility: false });
  }

  async addFirstImages(searchValue) {
    var imagesToAdd = await getImagesSlice(
      1,
      searchValue,
      0,
      this.state.totalHits
    );
    this.setState({ images: imagesToAdd, page: 2 });
    this.setState(prevState => {
      return { ...prevState, searchValue: searchValue };
    });
    if (imagesToAdd.length < 12) {
      this.setState({ loadMoreButtonVisibility: false });
      if (imagesToAdd.length === 0) {
        Notiflix.Notify.failure('No results match your search');
      } else {
        Notiflix.Notify.failure('You reached the end of search result');
      }
    } else {
      this.setState({ loadMoreButtonVisibility: true });
    }
  }

  async addMoreImages() {
    var imagesToAdd = await getImagesSlice(
      this.state.page,
      this.state.searchValue,
      this.state.images.length,
      this.state.totalHits
    );
    this.setState(prevState => {
      return {
        ...prevState,
        images: [...prevState.images, ...imagesToAdd],
        page: prevState.page + 1,
      };
    });
    if (imagesToAdd.length < 12) {
      this.setState({ loadMoreButtonVisibility: false });
      Notiflix.Notify.failure('You reached the end of search results');
    } else {
      this.setState({ loadMoreButtonVisibility: true });
    }
  }

  render() {
    return (
      <>
        <Searchbar
          onSubmit={() => {
            this.init();
            this.setState({ loaderVisibility: true });
            setTimeout(async () => {
              this.addFirstImages(this.state.searchValue);
              this.setState({ loaderVisibility: false });
            }, 2000);
          }}
          workWithProps={value => {
            this.setState({ searchValue: value });
          }}
        ></Searchbar>
        <ImageGallery
          images={this.state.images}
          onImageGalleryClick={(source, description) => {
            this.setState({ modalImageSrc: source });
            this.setState({ modalImageAlt: description });
          }}
        ></ImageGallery>
        {this.state.loadMoreButtonVisibility && (
          <Button
            loadMoreImages={async () => {
              this.setState({
                loaderVisibility: true,
                loadMoreButtonVisibility: false,
              });
              setTimeout(async () => {
                this.addMoreImages();
                this.setState({
                  loaderVisibility: false,
                });
              }, 2000);
            }}
          ></Button>
        )}
        {this.state.loaderVisibility && <Loader></Loader>}
        {this.state.modalImageSrc && (
          <Modal
            imageSrc={this.state.modalImageSrc}
            imageAlt={this.state.modalImageAlt}
            onCloseModal={() => {
              this.setState({ modalImageSrc: '' });
            }}
          ></Modal>
        )}
      </>
    );
  }

  async componentDidUpdate(prevProps, prevState) {
    if (
      prevState.page !== this.state.page ||
      prevState.searchValue !== this.state.searchValue
    ) {
      var data = await getData(this.state.page, this.state.searchValue);
      this.setState({
        totalHits: data.totalHits,
      });
    }
  }
}
