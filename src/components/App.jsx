import React, { Component } from 'react';
import axios from 'axios';
import styles from './styles.module.css';

import { Searchbar } from './Searchbar';
import { ImageGallery } from './ImageGallery';
import { Button } from './Button';
import { Loader } from './Loader';
import { Modal } from './Modal';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const ApiKey = '29604603-3e19714eecf15449ea09081a7';

export class App extends Component {
  state = {
    images: [],
    searchValue: '',
    page: 1,
    isLoading: false,
    modal: {},
  };

  componentDidMount() {
    const close = e => {
      if (e.keyCode === 27) {
        this.setState({ modal: {} });
      }
    };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }

  async componentDidUpdate(prevProps, prevStats) {
    if (this.state.searchValue !== prevStats.searchValue) {
      this.setState({ images: [], page: 1, isLoading: true });
      const { searchValue, page } = this.state;
      const response = await axios.get(
        `?q=${searchValue}&page=${page}&key=${ApiKey}&image_type=photo&orientation=horizontal&per_page=12`
      );
      // const imageArray = response.data.hits
      // let newArray = [];
      // imageArray.map(image => newArray.push({id: image.id, webformatURL: image.webformatURL, largeImageURL: image.largeImageURL}))

      setTimeout(() => {
        this.setState({ images: response.data.hits, isLoading: false });
      }, 100);
      return
    }

    if (this.state.page !== prevStats.page) {
      this.setState({ isLoading: true });
      const { searchValue, page } = this.state;
      const response = await axios.get(
        `?q=${searchValue}&page=${page}&key=${ApiKey}&image_type=photo&orientation=horizontal&per_page=12`
      );

      setTimeout(() => {
        this.setState(({ images }) => ({
          images: [...images, ...response.data.hits],
          isLoading: false,
        }));
      }, 100);
    }
  }

  searchImages = value => {
    this.setState({ searchValue: value });
  };

  scrollDown = () => {
    setTimeout(() => {
      window.scrollTo({
        top: 10000,
        left: 0,
        behavior: 'smooth',
      });
    }, 500);
  };

  loadMoreImages = () => {
    const nextPage = this.state.page + 1;
    this.setState({ page: nextPage });
    this.scrollDown();
  };

  openModal = e => {
    const images = this.state.images;
    const modalId = e.currentTarget.id;
    const modalData = images.find(image => image.webformatURL === modalId);
    this.setState({ modal: modalData });
  };

  closeModal = () => {
    this.setState({ modal: {} });
  };

  render() {
    const { searchValue, images, isLoading, modal } = this.state;

    return (
      <div className={styles.App}>
        <Searchbar onSubmit={this.searchImages} />

        {searchValue !== '' && (
          <ImageGallery images={images} onClick={this.openModal} />
        )}

        {images.length >= 12 && !isLoading && (
          <Button onClick={this.loadMoreImages} />
        )}

        {modal.largeImageURL !== undefined && (
          <Modal image={modal} onClick={this.closeModal} />
        )}

        {isLoading && <Loader />}
      </div>
    );
  }
}
