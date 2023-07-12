import styles from './Editor.module.scss';

const Editor = () => {
  return <div className={styles.editor}>
    <h2 className={styles.editor__title}>Message editor</h2>
    <h4 className={styles.editor__subtitle}>Variables</h4>
    <div className={styles.editor__variables}>
      <button>{`{firstname}`}</button>
      <button>{`{lastname}`}</button>
      <button>{`{company}`}</button>
      <button>{`{position}`}</button>
    </div>
  </div>;
};

export default Editor;
