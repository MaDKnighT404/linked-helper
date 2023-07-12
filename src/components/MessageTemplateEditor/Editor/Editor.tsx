import { Variables } from '../../Variables';
import styles from './Editor.module.scss';

const Editor = () => {
  return (
    <div className={styles.editor}>
      <h2 className={styles.editor__title}>Message editor</h2>

      <h4 className={styles.editor__subtitle}>Variables</h4>
      <Variables type="editor" />

      <h4 className={styles.editor__subtitle}>Message template</h4>
      <textarea className={styles.editor__textarea} defaultValue="123"/>
    </div>
  );
};

export default Editor;
