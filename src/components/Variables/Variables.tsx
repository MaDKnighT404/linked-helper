import classNames from 'classnames';
import styles from './Variables.module.scss';

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
          <label className={styles.variable__title}>firstname</label>
          <input className={styles.variable__input} type="text" />
        </li>

        <li className={previewVariableClasses}>
          <label className={styles.variable__title}>lastname</label>
          <input className={styles.variable__input} type="text" />
        </li>

        <li className={previewVariableClasses}>
          <label className={styles.variable__title}>company</label>
          <input className={styles.variable__input} type="text" />
        </li>

        <li className={previewVariableClasses}>
          <label className={styles.variable__title}>position</label>
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
          <button className={styles.variable__button}>{`{firstname}`}</button>
        </li>
        <li className={editorVariableClasses}>
          <button className={styles.variable__button}>{`{lastname}`}</button>
        </li>
        <li className={editorVariableClasses}>
          <button className={styles.variable__button}>{`{company}`}</button>
        </li>
        <li className={editorVariableClasses}>
          <button className={styles.variable__button}>{`{position}`}</button>
        </li>
      </ul>
    );
  }

  return <div></div>;
};

export default Variables;
