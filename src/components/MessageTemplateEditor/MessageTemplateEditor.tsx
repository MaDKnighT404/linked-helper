import { useState } from 'react';
import { Button } from '../Button';
import { Editor } from './Editor';
import { Preview } from './Preview';
import { NestedElement } from '../../types';
import styles from './MessageTemplateEditor.module.scss';

const MessageTemplateEditor = ({
  arrVarNames,
  template,
  callbackSave,
  onClose,
}: {
  arrVarNames: string[];
  template?: NestedElement[];
  callbackSave: (structure: NestedElement[] | null) => Promise<void>;
  onClose: () => void;
}) => {
  const [isOpenPreview, setIsOpenPreview] = useState(false);
  const [widgetStructure, setWidgetStructure] = useState<NestedElement[] | null>(template || null);
  const [isLoading, setIsLoading] = useState(false);

  const togglePreview = () => {
    setIsOpenPreview((prev) => !prev);
  };

  const handleSave = () => {
    setIsLoading(true);
    callbackSave(widgetStructure)
      .then(() => {
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className={styles.MessageTemplateEditor}>
      <h1 className={styles.MessageTemplateEditor__title}>Message Template Editor</h1>
      <Editor variablesList={arrVarNames} setWidgetStructure={setWidgetStructure} />
      <Preview
        arrVarNames={arrVarNames}
        widgetStructure={widgetStructure}
        onClose={togglePreview}
        isOpen={isOpenPreview}
      />

      <div className={styles['MessageTemplateEditor__buttons-wrapper']}>
        <Button title="Preview" onClick={togglePreview} />
        <Button title={isLoading ? 'Loading...' : 'Save'} onClick={handleSave} />
        <Button title="Close editor" onClick={onClose} />
      </div>
    </div>
  );
};

export default MessageTemplateEditor;
