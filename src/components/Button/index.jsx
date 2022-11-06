import PropTypes from "prop-types";
import styles from '../styles.module.css';

export const Button = ({ onClick }) => (
  <button className={styles.Button} type="button" onClick={onClick}>
    Load more
  </button>
);

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};