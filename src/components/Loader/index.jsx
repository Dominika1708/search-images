import { ThreeDots } from 'react-loader-spinner';
import styles from '../styles.module.css';

export const Loader = () => (
  <div className={styles.Loader}>
    <ThreeDots
      height="80"
      width="80"
      radius="9"
      color="#303f9f"
      ariaLabel="three-dots-loading"
      wrapperStyle={{}}
      wrapperClassName=""
      visible={true}
    />
  </div>
);
