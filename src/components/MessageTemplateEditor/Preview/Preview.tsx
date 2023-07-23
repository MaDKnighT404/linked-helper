import TextareaAutosize from 'react-textarea-autosize';
import { useEffect, useState } from 'react';
import { Button } from '../../Button';
import { messageGenerator } from '../../../helpers';
import styles from './Preview.module.scss';

const Preview = ({ variablesList, template, isOpen, onClose }: { variablesList: string[]; template: string; isOpen: boolean; onClose: () => void }) => {
  const [inputValues, setInputValues] = useState<Record<string, string>>({});
  const [newTemplate, setNewTemplate] = useState(template);

  const handleInputChange = (variable: string, value: string) => {
    setInputValues((prevState) => ({
      ...prevState,
      [variable]: value,
    }));
  };

  useEffect(() => {
    if (isOpen) {
      const generatedMessage = messageGenerator(template, inputValues);
      setNewTemplate(generatedMessage);
    }
  }, [isOpen, inputValues, template]);

  return (
    <div className={`${styles['preview-substrate']} ${isOpen && styles['preview-substrate_open']}`}>
      <div className={styles.preview} onClick={(event) => event.stopPropagation()}>
        <h2 className={styles.preview__title}>Message Preview</h2>

        <TextareaAutosize className={styles.preview__textarea} value={newTemplate} readOnly />

        <h4 className={styles.preview__subtitle}>Variables</h4>
        <ul className={styles['variables-list-preview']}>
          {variablesList.map((variable) => (
            <li className={styles.variable} key={variable}>
              <label className={styles.variable__label}>{variable} :</label>
              <input className={styles.variable__input} type="text" onChange={(e) => handleInputChange(variable, e.target.value)} />
            </li>
          ))}
        </ul>

        <Button title="Close" className="button_preview" onClick={onClose} />
      </div>
    </div>
  );
};

export default Preview;
