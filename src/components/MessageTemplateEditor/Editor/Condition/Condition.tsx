import TextareaAutosize from 'react-textarea-autosize';
import { Button } from '../../../Button';
import styles from './Condition.module.scss';
import { CompletedTemplateItem } from '../../../../types';

const Condition = ({
  onDelete,
  onTextareaChange,
  conditionData,
  index,
}: {
  onDelete: () => void;
  onTextareaChange: (
    event: React.ChangeEvent<HTMLTextAreaElement>,
    property: keyof CompletedTemplateItem,
    index: number
  ) => void;
  conditionData: CompletedTemplateItem;
  index: number;
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
            value={conditionData.if}
            onChange={(event) => onTextareaChange(event, 'if', index)}
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
            value={conditionData.then}
            onChange={(event) => onTextareaChange(event, 'then', index)}
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
            value={conditionData.else}
            onChange={(event) => onTextareaChange(event, 'else', index)}
          />
        </label>
      </div>
    </form>
  );
};

export default Condition;
