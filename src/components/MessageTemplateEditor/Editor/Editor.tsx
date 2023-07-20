import TextareaAutosize from 'react-textarea-autosize';
import { useState } from 'react';
import { nanoid } from 'nanoid';
import { Button } from '../../Button';
import { Condition } from './Condition';

import styles from './Editor.module.scss';

const Editor = ({
  variablesList,
  template,
  setCompletedTemplate,
}: {
  variablesList: string[];
  template: string;
  setCompletedTemplate: (text: string) => void;
}) => {
  const [focusedTextarea, setFocusedTextarea] = useState<HTMLTextAreaElement | null>(null);

  const [textAfterCursorState, setTextAfterCursorState] = useState('');

  const [full, setFull] = useState([
    { start: '', if: '', then: '', else: '', end: '' },
    { start: '', if: '', then: '', else: '', end: '' },
  ]);

  const handleVariableButtonClick = (variable: string) => {
    if (focusedTextarea) {
      const { selectionStart, selectionEnd, value } = focusedTextarea;
      const textBeforeCursor = value.substring(0, selectionStart);
      const textAfterCursor = value.substring(selectionEnd);
      const updatedTemplate = `${textBeforeCursor}{${variable}}${textAfterCursor}`;
      focusedTextarea.value = updatedTemplate;
      setCompletedTemplate(updatedTemplate);
    }
  };

  const handleAddConditional = () => {
    if (focusedTextarea) {
      const { selectionStart, selectionEnd, value } = focusedTextarea;
      const textBeforeCursor = value.substring(0, selectionStart);
      const textAfterCursor = value.substring(selectionEnd);
      focusedTextarea.value = textBeforeCursor;
      setCompletedTemplate(textBeforeCursor);
      setTextAfterCursorState(textAfterCursor);
    }
  };

  const handleGetFull = (deepLevel: number, count: number) => {
    const textareas = Array.from(document.getElementsByTagName('textarea')).filter(
      (textarea) => textarea.id
    );

    const newFull = [...full];
    newFull[deepLevel] = {
      start:
        textareas.find((textarea) => textarea.id === `${deepLevel}-${count}-start`)?.value || '',
      if: textareas.find((textarea) => textarea.id === `${deepLevel}-${count}-if`)?.value || '',
      then: textareas.find((textarea) => textarea.id === `${deepLevel}-${count}-then`)?.value || '',
      else: textareas.find((textarea) => textarea.id === `${deepLevel}-${count}-else`)?.value || '',
      end: textareas.find((textarea) => textarea.id === `${deepLevel}-${count}-end`)?.value || '',
    };
    setFull(newFull);
  };
  console.log(full);

  const [inputs, setInputs] = useState([
    { text: '1', focused: false, id: 1 },
    { text: '2', focused: false, id: 2 },
    { text: '3', focused: false, id: 3 },
  ]);

  const handleFocus = (id: number) => {
    setInputs((prevInputs) =>
      prevInputs.map((input) => ({
        ...input,
        focused: input.id === id,
      }))
    );
  };

  const handleClick = () => {
    const focusedIndex = inputs.findIndex((input) => input.focused);
    if (focusedIndex >= 0) {
      const newInput = {
        text: '',
        focused: true,
        id: Date.now(), // Unique ID for the new input, you can use a library like uuid for more robust IDs
      };
      setInputs((prevInputs) => [
        ...prevInputs.slice(0, focusedIndex + 1),
        newInput,
        ...prevInputs.slice(focusedIndex + 1),
      ]);
    }
  };
  console.log(inputs);
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
        onClick={handleAddConditional}
      />
      <Button title="get full" className="button_condition" onClick={() => handleGetFull(0, 0)} />

      <h4 className={styles.editor__subtitle}>Message template</h4>
      <div className={styles['editor__message-wrapper']}>
        <TextareaAutosize
          className={styles.editor__textarea}
          defaultValue={template}
          onFocus={(e) => setFocusedTextarea(e.target)}
          id="0-0-start"
        />

        <div id="addedConditional">
          <Condition setFocusedTextarea={setFocusedTextarea} />
          <TextareaAutosize
            className={styles.editor__textarea}
            defaultValue={textAfterCursorState}
            onFocus={(e) => setFocusedTextarea(e.target)}
            id="0-0-end"
          />
        </div>
      </div>

      <div>
        {inputs.map((input) => (
          <input key={input.id} value={input.text} onFocus={() => handleFocus(input.id)} />
        ))}
        <button onClick={handleClick}>click me</button>
      </div>
    </div>
  );
};

export default Editor;
