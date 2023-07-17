import { useRef } from 'react';
import { adjustTextareaHeight } from '../../../../helpers/adjustTextareaHeight';
import styles from './Condition.module.scss';

const Condition = () => {
  const textareaIf = useRef<HTMLTextAreaElement>(null);
  return (
    <form className={styles.condition}>
      <div className={styles.condition__part}>
        <label className={styles.condition__label} htmlFor="">
          <span className={styles.condition__state}>IF</span>
          <textarea
            className={styles.condition__textaria}
            ref={textareaIf}
            onChange={() => adjustTextareaHeight(textareaIf)}
          />
        </label>
      </div>

      <div className={styles.condition__part}>
        <label className={styles.condition__label} htmlFor="">
          <span className={styles.condition__state}>THEN</span>
          <textarea
            className={styles.condition__textaria}
            ref={textareaIf}
            onChange={() => adjustTextareaHeight(textareaIf)}
          />
        </label>
      </div>

      <div className={styles.condition__part}>
        <label className={styles.condition__label} htmlFor="">
          <span className={styles.condition__state}>ELSE</span>
          <textarea
            className={styles.condition__textaria}
            ref={textareaIf}
            onChange={() => adjustTextareaHeight(textareaIf)}
          />
        </label>
      </div>
    </form>
  );
};

export default Condition;
