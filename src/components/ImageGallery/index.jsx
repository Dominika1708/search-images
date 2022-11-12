import PropTypes from "prop-types";
import { nanoid } from 'nanoid';
import styles from '../styles.module.css';
import { ImageGalleryItem } from 'components/ImageGalleryItem';

export const ImageGallery = ({ images, onClick }) => (
  <ul className={styles.ImageGallery}>
    {images.map(image => (
      <ImageGalleryItem
        key={nanoid()}
        url={image.webformatURL}
        id={image.id}
        onClick={onClick}
      />
    ))}
  </ul>
);

ImageGallery.propTypes = {
  images: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
};