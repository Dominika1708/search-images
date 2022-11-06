import PropTypes from 'prop-types';
import styles from '../styles.module.css';

export const ImageGalleryItem = ({ id, url, onClick }) => (
  <li className={styles.ImageGalleryItem} onClick={onClick} id={url}>
    <img className={styles.ImageGalleryItem_image} src={url} alt={id} />
  </li>
);

ImageGalleryItem.propTypes = {
  id: PropTypes.number.isRequired,
  url: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
