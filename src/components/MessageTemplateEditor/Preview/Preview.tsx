import { useEffect, useRef, useState } from 'react';
import { Button } from '../../Button';
import { messageGenerator } from '../../../helpers/messageGenerator';
import { adjustTextareaHeight } from '../../../helpers/adjustTextareaHeight';
import styles from './Preview.module.scss';

const Preview = ({
  variablesList,
  template,
  isOpen,
  onClose,
}: {
  variablesList: string[];
  template: string;
  isOpen: boolean;
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
    if (isOpen) {
      const generatedMessage = messageGenerator(template, inputValues);
      setNewTemplate(generatedMessage);
      if (textareaRef.current) {
        textareaRef.current.value = generatedMessage;
        adjustTextareaHeight(textareaRef);
      }
    }
  }, [isOpen, inputValues, template]);

  return (
    <div className={`${styles['preview-substrate']} ${isOpen && styles['preview-substrate_open']}`}>
      <div className={styles.preview} onClick={(event) => event.stopPropagation()}>
        <h2 className={styles.preview__title}>Предпросмотр сообщения</h2>

        <textarea
          ref={textareaRef}
          className={styles.preview__textarea}
          value={newTemplate}
          readOnly
        />

        <h4 className={styles.preview__subtitle}>Переменные</h4>
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

        <Button title="Закрыть предпросмотр" className="button_preview" onClick={onClose} />
      </div>
    </div>
  );
};

export default Preview;
