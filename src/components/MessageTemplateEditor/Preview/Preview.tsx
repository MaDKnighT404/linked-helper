import { useEffect, useRef, useState } from 'react';
import { Button } from '../../Button';
import styles from './Preview.module.scss';
import { messageGenerator } from '../../../helpers/messageGenerator';
import { adjustTextareaHeight } from '../../../helpers/adjustTextareaHeight';

const Preview = ({
  variablesList,
  template,
  onClose,
}: {
  variablesList: string[];
  template: string;
  onClose: () => void;
}) => {
  const [inputValues, setInputValues] = useState<Record<string, string>>({});
  const [newTemplate, setNewTemplate] = useState(template);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleInputChange = (variable: string, value: string) => {
    setInputValues((prevState) => ({
      ...prevState,
      [variable]: value,
    }));
  };

  useEffect(() => {
    const generatedMessage = messageGenerator(template, inputValues);
    setNewTemplate(generatedMessage);
    adjustTextareaHeight(textareaRef);
  }, [inputValues, template]);

  return (
    <div className={styles['preview-substrate']}>
      <div className={styles.preview} onClick={(event) => event.stopPropagation()}>
        <h2 className={styles.preview__title}>Message preview</h2>

        <h4 className={styles.preview__subtitle}>Message</h4>
        <textarea
          ref={textareaRef}
          className={styles.preview__textarea}
          value={newTemplate}
          readOnly
        />

        <h4 className={styles.preview__subtitle}>Variables</h4>
        <ul className={styles['variables-list-preview']}>
          {variablesList.map((variable) => (
            <li className={styles.variable} key={variable}>
              <label className={styles.variable__label}>{variable} :</label>
              <input
                className={styles.variable__input}
                type="text"
                onChange={(e) => handleInputChange(variable, e.target.value)}
              />
            </li>
          ))}
        </ul>

        <Button title="Close preview" className="button_preview" onClick={onClose} />
      </div>
    </div>
  );
};

export default Preview;
