import { Button } from '../../Button';
import styles from './Editor.module.scss';

const Editor = ({ variablesList }: { variablesList: string[] }) => {
  return (
    <div className={styles.editor}>
      <h2 className={styles.editor__title}>Message editor</h2>

      <h4 className={styles.editor__subtitle}>Variables</h4>

      <ul className={styles['variables-list-editor']}>
        {variablesList.map((variable) => (
          <li className={styles.variable} key={variable}>
            <Button className="button_variable" title={`{${variable}}`} />
          </li>
        ))}
      </ul>

      <h4 className={styles.editor__subtitle}>Message template</h4>
      <textarea className={styles.editor__textarea} defaultValue="123" />
    </div>
  );
};

export default Editor;
