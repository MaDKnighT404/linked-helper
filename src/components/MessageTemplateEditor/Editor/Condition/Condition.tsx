import TextareaAutosize from 'react-textarea-autosize';
import { Button } from '../../../Button';
import styles from './Condition.module.scss';

const Condition = ({
  onDelete,
  setFocusedTextAria,
}: {
  onDelete: () => void;
  setFocusedTextAria: (element: HTMLTextAreaElement | null) => void;
}) => {
  return (
    <form className={styles.condition}>
      <div className={styles.condition__part}>
        <label className={styles.condition__label} htmlFor="">
          <div className={styles['condition__state-wrapper']}>
            <span className={styles.condition__state}>IF</span>
            <Button title="Delete" className="button_delete" onClick={onDelete} />
          </div>
          <TextareaAutosize
            className={styles.condition__textaria}
            onFocus={(e) => setFocusedTextAria(e.target)}
          />
        </label>
      </div>

      <div className={styles.condition__part}>
        <label className={styles.condition__label} htmlFor="">
          <div className={styles['condition__state-wrapper']}>
            <span className={styles.condition__state}>THEN</span>
          </div>
          <TextareaAutosize
            className={styles.condition__textaria}
            onFocus={(e) => setFocusedTextAria(e.target)}
          />
        </label>
      </div>

      <div className={styles.condition__part}>
        <label className={styles.condition__label} htmlFor="">
          <div className={styles['condition__state-wrapper']}>
            <span className={styles.condition__state}>ELSE</span>
          </div>
          <TextareaAutosize
            className={styles.condition__textaria}
            onFocus={(e) => setFocusedTextAria(e.target)}
          />
        </label>
      </div>
    </form>
  );
};

export default Condition;
