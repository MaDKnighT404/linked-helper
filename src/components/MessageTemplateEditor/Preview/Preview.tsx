import styles from './Preview.module.scss';
import { Variables } from '../../Variables';

const Preview = () => {
  return (
    <div className={styles.preview}>
      <h2 className={styles.preview__title}>Message preview</h2>

      <h4 className={styles.preview__subtitle}>Message</h4>
      <textarea className={styles.preview__textarea} defaultValue="abc"/>

      <h4 className={styles.preview__subtitle}>Variables</h4>
      <Variables type="preview" />
    </div>
  );
};

export default Preview;
