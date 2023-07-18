import { useState } from 'react';
import { Button } from '../Button';
import { Editor } from './Editor';
import { Preview } from './Preview';
import { CompletedTemplateItem } from '../../types';
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
  const [completedTemplate, setCompletedTemplate] = useState<CompletedTemplateItem[]>([
    { start: initialTemplate, if: '', then: '', else: '', end: '' },
  ]);

  const togglePreview = () => {
    setIsOpenPreview((prev) => !prev);
  };
  console.log(completedTemplate);
  return (
    <div className={styles.MessageTemplateEditor}>
      <h1 className={styles.MessageTemplateEditor__title}>Message Template Editor</h1>
      <Editor
        variablesList={arrVarNames}
        completedTemplate={completedTemplate}
        setCompletedTemplate={setCompletedTemplate}
      />
      <Preview
        onClose={togglePreview}
        variablesList={arrVarNames}
        template={completedTemplate[0].start as string} // need calculate result
        isOpen={isOpenPreview}
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
