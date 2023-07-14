import { useState } from 'react';
import { Button } from '../Button';
import { Editor } from './Editor';
import { Preview } from './Preview';
import styles from './MessageTemplateEditor.module.scss';

const MessageTemplateEditor = ({ onClose }: { onClose: () => void }) => {
  const arrVarNames = localStorage.arrVarNames
    ? JSON.parse(localStorage.arrVarNames)
    : ['firstname', 'lastname', 'company', 'position'];

  const initialTemplate = `
  hello {firstname},

this is {lastname}

company is {company}

and position is {position}`;

  const [isOpenEditor, setIsOpenEditor] = useState(true);
  const [template, setTemplate] = useState(initialTemplate);

  const togglePreview = () => {
    setIsOpenEditor((prev) => !prev);
  };

  return (
    <div className={styles.MessageTemplateEditor}>
      <h1 className={styles.MessageTemplateEditor__title}>Message Template Editor</h1>
      {isOpenEditor ? (
        <Editor
          variablesList={arrVarNames}
          template={template}
          setTemplate={setTemplate}
        />
      ) : (
        <Preview onClose={togglePreview} variablesList={arrVarNames} template={template} />
      )}

      <div className={styles['MessageTemplateEditor__buttons-wrapper']}>
        <Button title="Preview" onClick={togglePreview} />
        <Button title="Save" />
        <Button title="Close editor" onClick={onClose} />
      </div>
    </div>
  );
};

export default MessageTemplateEditor;
