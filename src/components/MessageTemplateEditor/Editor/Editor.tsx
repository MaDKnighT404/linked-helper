import TextareaAutosize from 'react-textarea-autosize';
import { useState } from 'react';
import { nanoid } from 'nanoid';
import { Button } from '../../Button';
import { Condition } from './Condition';

import styles from './Editor.module.scss';

const Editor = ({
  variablesList,
  completedTemplate,
  setCompletedTemplate,
  onTextareaChange,
}: {
  variablesList: string[];
  completedTemplate: string;
  setCompletedTemplate: (newTemplate: string) => void;
  onTextareaChange: (index: number, value: string) => void; 
}) => {
  const [conditions, setConditions] = useState<string[]>([]);
  const [focusedTextAria, setFocusedTextAria] = useState<HTMLTextAreaElement | null>(null);

  const handleVariableButtonClick = (variable: string) => {
    if (!focusedTextAria) return;
    if (focusedTextAria) {
      const startPos = focusedTextAria.selectionStart || 0;
      const endPos = focusedTextAria.selectionEnd || 0;
      const newTemplate =
        focusedTextAria.value.substring(0, startPos) +
        `{${variable}}` +
        focusedTextAria.value.substring(endPos, focusedTextAria.value.length);
      focusedTextAria.value = newTemplate;

      focusedTextAria.blur();
    }
  };

  const handleAddCondition = () => {
    setConditions((prevConditions) => [...prevConditions, nanoid()]);
  };

  const handleDeleteCondition = (index: number) => {
    setConditions((prevConditions) => {
      const updatedConditions = [...prevConditions];
      updatedConditions.splice(index, 1);
      return updatedConditions;
    });
  };

  return (
    <div className={styles.editor}>
      <h2 className={styles.editor__title}>Message editor</h2>

      <h4 className={styles.editor__subtitle}>Variables</h4>

      <ul className={styles['variables-list-editor']}>
        {variablesList.map((variable) => (
          <li className={styles.variable} key={variable}>
            <Button
              className="button_variable"
              title={`{${variable}}`}
              onClick={() => handleVariableButtonClick(variable)}
            />
          </li>
        ))}
      </ul>

      <Button
        title="Click to add: IF [{some variable} or expression] THEN [then_value] ELSE [else_value]"
        className="button_condition"
        onClick={handleAddCondition}
      />

      <h4 className={styles.editor__subtitle}>Message template</h4>
      <div className={styles['editor__message-wrapper']}>
        <TextareaAutosize
          className={styles.editor__textarea}
          defaultValue={completedTemplate}
          onFocus={(event) => setFocusedTextAria(event.target)}
          onChange={(event) => {
            setCompletedTemplate(event.target.value);
            onTextareaChange(0, event.target.value); // Обновляем состояние в MessageTemplateEditor
          }}
        />
        {conditions.map((condition, index) => (
          <div key={condition}>
            <Condition
              onDelete={() => handleDeleteCondition(index)}
              setFocusedTextAria={setFocusedTextAria}

            />
            <TextareaAutosize
              className={styles.editor__textarea}
              onFocus={(event) => setFocusedTextAria(event.target)}
              onChange={(event) => {
                onTextareaChange(index + 1, event.target.value); // Обновляем состояние в MessageTemplateEditor
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Editor;
