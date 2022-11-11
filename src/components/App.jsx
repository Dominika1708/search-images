import { useState } from 'react';
import { useEffect } from 'react';

import axios from 'axios';
import styles from './styles.module.css';

import { Searchbar } from './Searchbar';
import { ImageGallery } from './ImageGallery';
import { Button } from './Button';
import { Loader } from './Loader';
import { Modal } from './Modal';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const ApiKey = '29604603-3e19714eecf15449ea09081a7';

export const App = () => {
  const [images, setImages] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [modal, setModal] = useState({});

  useEffect(() => {
    const close = e => {
      if (e.keyCode === 27) {
        setModal({});
      }
    };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, []);

  useEffect(() => {
    setImages([]);
    setPage(1);
    setIsLoading(true);

    const fetchData = async () => {
      const response = await axios.get(
        `?q=${searchValue}&page=1&key=${ApiKey}&image_type=photo&orientation=horizontal&per_page=12`
      );

      setTimeout(() => {
        setImages([response.data.hits]);
        setIsLoading(false);
      }, 100);
    };
    fetchData();
  }, [searchValue]);

  const searchImages = value => {
    setSearchValue(value);
  };

  const scrollDown = () => {
    setTimeout(() => {
      window.scrollTo({
        top: 10000,
        left: 0,
        behavior: 'smooth',
      });
    }, 500);
  };

  const loadMoreImages = () => {
    setPage(prev => prev + 1);
    setIsLoading(true);

    const fetchData = async () => {
      const response = await axios.get(
        `?q=${searchValue}&page=${page}&key=${ApiKey}&image_type=photo&orientation=horizontal&per_page=12`
      );

      setTimeout(() => {
        setImages([...images, ...response.data.hits]);
        setIsLoading(false);
      }, 100);
    };
    fetchData();
    scrollDown();
  };

  const openModal = e => {
    const modalId = e.currentTarget.id;
    const modalData = images.find(image => image.webformatURL === modalId);
    setModal(modalData);
  };

  const closeModal = () => {
    setModal({});
  };

  return (
    <div className={styles.App}>
      <Searchbar onSubmit={searchImages} />

      {searchValue !== '' && (
        <ImageGallery images={images} onClick={openModal} />
      )}

      {images.length >= 12 && !isLoading && <Button onClick={loadMoreImages} />}

      {modal.largeImageURL !== undefined && (
        <Modal image={modal} onClick={closeModal} />
      )}

      {isLoading && <Loader />}
    </div>
  );
};
