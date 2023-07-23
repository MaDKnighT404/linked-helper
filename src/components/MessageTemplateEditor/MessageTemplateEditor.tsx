import { useState } from 'react';
import { Button } from '../Button';
import { Editor } from './Editor';
import { Preview } from './Preview';

import styles from './MessageTemplateEditor.module.scss';
import { NestedElement } from '../../types';

const MessageTemplateEditor = ({ onClose }: { onClose: () => void }) => {
  const arrVarNames = localStorage.arrVarNames ? JSON.parse(localStorage.arrVarNames) : ['firstname', 'lastname', 'company', 'position'];

  const [isOpenPreview, setIsOpenPreview] = useState(false);
  const [savedTemplateStructure, setSavedTemplateStructure] = useState<NestedElement[] | null>(null);

  const togglePreview = () => {
    setIsOpenPreview((prev) => !prev);
  };

  const saveEditorTemplate = () => {
    localStorage.setItem('editorTemplate', JSON.stringify(savedTemplateStructure));
  };

  return (
    <div className={styles.MessageTemplateEditor}>
      <h1 className={styles.MessageTemplateEditor__title}>Message Template Editor</h1>
      <Editor variablesList={arrVarNames} setSavedTemplateStructure={setSavedTemplateStructure} />
      <Preview
        onClose={togglePreview}
        variablesList={arrVarNames}
        savedTemplateStructure={savedTemplateStructure}
        isOpen={isOpenPreview}
      />

      <div className={styles['MessageTemplateEditor__buttons-wrapper']}>
        <Button title="Preview" onClick={togglePreview} />
        <Button title="Save" onClick={saveEditorTemplate} />
        <Button title="Close editor" onClick={onClose} />
      </div>
    </div>
  );
};

export default MessageTemplateEditor;
