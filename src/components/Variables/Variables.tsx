import classNames from 'classnames';
import styles from './Variables.module.scss';
import { Button } from '../Button';

const Variables = ({ type }: { type: string }) => {
  if (type === 'preview') {
    const previewVariablesListClasses = classNames(
      styles['variables-list'],
      styles['variables-list_preview']
    );
    const previewVariableClasses = classNames(styles.variable, styles.variable_preview);

    return (
      <ul className={previewVariablesListClasses}>
        <li className={previewVariableClasses}>
          <label className={styles.variable__label}>firstname :</label>
          <input className={styles.variable__input} type="text" />
        </li>

        <li className={previewVariableClasses}>
          <label className={styles.variable__label}>lastname :</label>
          <input className={styles.variable__input} type="text" />
        </li>

        <li className={previewVariableClasses}>
          <label className={styles.variable__label}>company :</label>
          <input className={styles.variable__input} type="text" />
        </li>

        <li className={previewVariableClasses}>
          <label className={styles.variable__label}>position :</label>
          <input className={styles.variable__input} type="text" />
        </li>
      </ul>
    );
  }

  if (type === 'editor') {
    const editorVariablesListClasses = classNames(
      styles['variables-list'],
      styles['variables-list_editor']
    );
    const editorVariableClasses = classNames(styles.variable, styles.variable_editor);
    return (
      <ul className={editorVariablesListClasses}>
        <li className={editorVariableClasses}>
          <Button className="button_variable" title={`{firstname}`} />
        </li>
        <li className={editorVariableClasses}>
          <Button className="button_variable" title={`{lastname}`} />
        </li>
        <li className={editorVariableClasses}>
          <Button className="button_variable" title={`{company}`} />
        </li>
        <li className={editorVariableClasses}>
          <Button className="button_variable" title={`{position}`} />
        </li>
      </ul>
    );
  }

  return <div></div>;
};

export default Variables;
