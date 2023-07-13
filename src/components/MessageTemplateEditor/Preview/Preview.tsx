import styles from './Preview.module.scss';
import { Variables } from '../Variables';
import { Button } from '../../Button';

const Preview = ({ onClose }: { onClose: () => void }) => {
  const handlePreviewClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  return (
    <div className={styles['preview-substrate']} onClick={onClose}>
      <div className={styles.preview} onClick={handlePreviewClick}>
        <h2 className={styles.preview__title}>Message preview</h2>

        <h4 className={styles.preview__subtitle}>Message</h4>
        <textarea className={styles.preview__textarea} defaultValue="abc" />

        <h4 className={styles.preview__subtitle}>Variables</h4>
        <Variables type="preview" />

        <Button title="Close preview" className="button_preview" onClick={onClose} />
      </div>
    </div>
  );
};

export default Preview;
