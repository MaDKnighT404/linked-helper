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

  const [isOpenPreview, setIsOpenPreview] = useState(false);
  const [completedTemplate, setCompletedTemplate] = useState(initialTemplate);



  const togglePreview = () => {
    setIsOpenPreview((prev) => !prev);
  };

  return (
    <div className={styles.MessageTemplateEditor}>
      <h1 className={styles.MessageTemplateEditor__title}>Message Template Editor</h1>
      <Editor
        template={completedTemplate}
        variablesList={arrVarNames}
        setCompletedTemplate={setCompletedTemplate}
      />
      <Preview
        template={completedTemplate}
        variablesList={arrVarNames}
        isOpen={isOpenPreview}
        onClose={togglePreview}
      />

      <div className={styles['MessageTemplateEditor__buttons-wrapper']}>
        <Button title="Preview" onClick={togglePreview} />
        <Button title="Save" />
        <Button title="Close editor" onClick={onClose} />
      </div>
    </div>
  );
};

export default MessageTemplateEditor;
