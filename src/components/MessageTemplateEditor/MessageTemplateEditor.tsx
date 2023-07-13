import { useState } from 'react';
import { Button } from '../Button';
import { Editor } from './Editor';
import { Preview } from './Preview';
import styles from './MessageTemplateEditor.module.scss';

const MessageTemplateEditor = ({ onClose }: { onClose: () => void }) => {
  const [isOpenEditor, setIsOpenEditor] = useState(true);

  const togglePreview = () => {
    setIsOpenEditor((prev) => !prev);
  };

  return (
    <div className={styles.MessageTemplateEditor}>
      <h1 className={styles.MessageTemplateEditor__title}>Message Template Editor</h1>
      {isOpenEditor ? <Editor /> : <Preview onClose={togglePreview} />}

      <div className={styles['MessageTemplateEditor__buttons-wrapper']}>
            <Button title="Preview" className="button_preview" onClick={togglePreview} />
            <Button title="Save" className="button_save" />
            <Button title="Close editor" className="button_preview" onClick={onClose} />
      </div>
    </div>
  );
};

export default MessageTemplateEditor;
