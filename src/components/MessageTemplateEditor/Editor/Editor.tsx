import TextareaAutosize from 'react-textarea-autosize';
import { useState } from 'react';
import { nanoid } from 'nanoid';
import { Button } from '../../Button';
import { Condition } from './Condition';
import { createNewTemplate } from '../../../helpers/createNewTemplate';
import styles from './Editor.module.scss';

const Editor = ({
  variablesList,
  template,
  setTemplate,
}: {
  variablesList: string[];
  template: string;
  setTemplate: (newTemplate: string) => void;
}) => {
  const [conditions, setConditions] = useState<string[]>([]);
  const [cursorPosition, setCursorPosition] = useState<number | null>(null);
  const [focusedTextAria, setFocusedTextAria] = useState<HTMLTextAreaElement | null>(null);
  const handleVariableButtonClick = (variable: string) => {
    // const newTemplate = createNewTemplate(textareaRef, template, variable);
    // setTemplate(newTemplate);
    // const textarea = textareaRef.current;
    // if (!textarea) return '';
    // const startPos = textarea.selectionStart || 0;
    // const endPos = textarea.selectionEnd || 0;
    // const newTemplate =
    //   template.substring(0, startPos) + `{${variable}}` + template.substring(endPos, template.length);
    // textarea.blur();
    // textarea.value = newTemplate;
    // return newTemplate;
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

  const splitTemplateText = () => {
    if (cursorPosition !== null) {
      const textBeforeCursor = template.slice(0, cursorPosition);
      const textAfterCursor = template.slice(cursorPosition);
      return { textBeforeCursor, textAfterCursor };
    }
    return { textBeforeCursor: template, textAfterCursor: '' };
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
          value={splitTemplateText().textBeforeCursor}
          onFocus={(event) => setFocusedTextAria(event.target)}
          onChange={(event) => {
            setTemplate(event.target.value);
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
              value={splitTemplateText().textAfterCursor}
              onFocus={(event) => setFocusedTextAria(event.target)}
              onChange={(event) => {
                const newTemplate = splitTemplateText().textBeforeCursor + event.target.value;
                setTemplate(newTemplate);
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Editor;
