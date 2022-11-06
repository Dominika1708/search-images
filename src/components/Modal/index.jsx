import PropTypes from "prop-types";
import styles from '../styles.module.css';

export const Modal = ({ image, onClick }) => (
  <div className={styles.Overlay} onClick={onClick}>
    <div className={styles.Modal}>
      <img src={image.largeImageURL} alt={image.id} />
    </div>
  </div>
);

Modal.propTypes = {
  image: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
};