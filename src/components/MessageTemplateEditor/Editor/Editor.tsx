import TextareaAutosize from 'react-textarea-autosize';
import { ChangeEvent, useState } from 'react';
import { nanoid } from 'nanoid';
import { Button } from '../../Button';
import { Condition } from './Condition';

import styles from './Editor.module.scss';

type ConditionType = {
  if: { text: string; focused: boolean; id: string };
  then: { text: string; focused: boolean; id: string };
  else: { text: string; focused: boolean; id: string };
  end: { text: string; focused: boolean; id: string };
  deepLevel: number;
  countOnLevel: number;
};

const updateFocusedPart = (
  focusedTextarea: HTMLTextAreaElement | null,
  part: any,
  variable: string
) => {
  if (focusedTextarea) {
    const { selectionStart, selectionEnd, value } = focusedTextarea;
    const textBeforeCursor = value.substring(0, selectionStart);
    const textAfterCursor = value.substring(selectionEnd);
    const updatedTemplate = `${textBeforeCursor}{${variable}}${textAfterCursor}`;
    return part.focused ? { ...part, text: updatedTemplate } : part;
  }
};

const Editor = ({
  variablesList,
  template,
  setCompletedTemplate,
}: {
  variablesList: string[];
  template: string;
  setCompletedTemplate: (text: string) => void;
}) => {
  const [startTextarea, setStartTextarea] = useState({
    start: {
      text: template,
      focused: true,
      id: nanoid(),
    },
  });
  const [conditions, setConditions] = useState<ConditionType[]>([]);
  const [focusedTextarea, setFocusedTextarea] = useState<HTMLTextAreaElement | null>(null);
  console.log(startTextarea);
  const handleAddConditional = () => {
    const newConditional: ConditionType = {
      if: { text: '1', focused: false, id: nanoid() },
      then: { text: '2', focused: false, id: nanoid() },
      else: { text: '3', focused: false, id: nanoid() },
      end: { text: '4', focused: false, id: nanoid() },
      deepLevel: 0,
      countOnLevel: 0,
    };

    setConditions((prev) => [...prev, newConditional]);
  };

  const handleFocusTextaria = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const focusedTextareaById = event.target.id;

    setStartTextarea((prevStartTextarea) => ({
      ...prevStartTextarea,
      start: {
        ...prevStartTextarea.start,
        focused: prevStartTextarea.start.id === focusedTextareaById,
      },
    }));

    setConditions((prevConditions) =>
      prevConditions.map((condition) => ({
        ...condition,
        if: { ...condition.if, focused: condition.if.id === focusedTextareaById },
        then: { ...condition.then, focused: condition.then.id === focusedTextareaById },
        else: { ...condition.else, focused: condition.else.id === focusedTextareaById },
        end: { ...condition.end, focused: condition.end.id === focusedTextareaById },
      }))
    );
  };
  const handleAddVariableToText = (variable: string) => {
    const isFocusedInConditions = conditions.some(
      (condition) =>
        condition.if.focused ||
        condition.then.focused ||
        condition.else.focused ||
        condition.end.focused
    );

    if (isFocusedInConditions && focusedTextarea) {
      setConditions((prevConditions) =>
        prevConditions.map((condition) => ({
          ...condition,
          if: updateFocusedPart(focusedTextarea, condition.if, variable),
          then: updateFocusedPart(focusedTextarea, condition.then, variable),
          else: updateFocusedPart(focusedTextarea, condition.else, variable),
          end: updateFocusedPart(focusedTextarea, condition.end, variable),
        }))
      );
    } else if (startTextarea.start.focused && focusedTextarea) {
      setStartTextarea((prevStartTextarea) => ({
        ...prevStartTextarea,
        start: updateFocusedPart(focusedTextarea, prevStartTextarea.start, variable),
      }));
    }
    setFocusedTextarea(null);
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
              onClick={() => handleAddVariableToText(variable)}
            />
          </li>
        ))}
      </ul>

      <Button
        title="Click to add: IF [{some variable} or expression] THEN [then_value] ELSE [else_value]"
        className="button_condition"
        onClick={handleAddConditional}
      />
      <Button title="get full" className="button_condition" />

      <h4 className={styles.editor__subtitle}>Message template</h4>
      <div className={styles['editor__message-wrapper']}>
        <TextareaAutosize
          className={styles.editor__textarea}
          value={startTextarea.start.text}
          onFocus={(e) => {
            handleFocusTextaria(e);
            setFocusedTextarea(e.target);
          }}
          id={startTextarea.start.id}
        />

        {conditions.map((condition) => (
          <div className={styles.condition} key={condition.if.id}>
            <div className={styles.condition__part}>
              <div className={styles.condition__label}>
                <div className={styles['condition__state-wrapper']}>
                  <span className={styles.condition__state}>IF</span>
                  <Button title="Delete" className="button_delete" />
                </div>
                <TextareaAutosize
                  className={styles.condition__textaria}
                  value={condition.if.text}
                  onFocus={(e) => {
                    handleFocusTextaria(e);
                    setFocusedTextarea(e.target);
                  }}
                  id={condition.if.id}
                />
              </div>
            </div>

            <div className={styles.condition__part}>
              <div className={styles.condition__label}>
                <div className={styles['condition__state-wrapper']}>
                  <span className={styles.condition__state}>THEN</span>
                </div>
                <TextareaAutosize
                  className={styles.condition__textaria}
                  value={condition.then.text}
                  onFocus={(e) => {
                    handleFocusTextaria(e);
                    setFocusedTextarea(e.target);
                  }}
                  id={condition.then.id}
                />
              </div>
            </div>

            <div className={styles.condition__part}>
              <div className={styles.condition__label}>
                <div className={styles['condition__state-wrapper']}>
                  <span className={styles.condition__state}>ELSE</span>
                </div>
                <TextareaAutosize
                  className={styles.condition__textaria}
                  value={condition.else.text}
                  onFocus={(e) => {
                    handleFocusTextaria(e);
                    setFocusedTextarea(e.target);
                  }}
                  id={condition.else.id}
                />
              </div>
            </div>
            <TextareaAutosize
              className={styles.editor__textarea}
              value={condition.end.text}
              onFocus={(e) => {
                handleFocusTextaria(e);
                setFocusedTextarea(e.target);
              }}
              id={condition.end.id}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Editor;

// const handleVariableButtonClick = (variable: string) => {
//   if (focusedTextarea) {
//     const { selectionStart, selectionEnd, value } = focusedTextarea;
//     const textBeforeCursor = value.substring(0, selectionStart);
//     const textAfterCursor = value.substring(selectionEnd);
//     const updatedTemplate = `${textBeforeCursor}{${variable}}${textAfterCursor}`;
//     focusedTextarea.value = updatedTemplate;
//     setCompletedTemplate(updatedTemplate);
//   }
// };

// const handleAddConditional = () => {
//   if (focusedTextarea) {
//     const { selectionStart, selectionEnd, value } = focusedTextarea;
//     const textBeforeCursor = value.substring(0, selectionStart);
//     const textAfterCursor = value.substring(selectionEnd);
//     focusedTextarea.value = textBeforeCursor;
//     setCompletedTemplate(textBeforeCursor);
//     setTextAfterCursorState(textAfterCursor);
//   }
// };

// const handleGetFull = (deepLevel: number, count: number) => {
//   const textareas = Array.from(document.getElementsByTagName('textarea')).filter(
//     (textarea) => textarea.id
//   );

//   const newFull = [...full];
//   newFull[deepLevel] = {
//     start:
//       textareas.find((textarea) => textarea.id === `${deepLevel}-${count}-start`)?.value || '',
//     if: textareas.find((textarea) => textarea.id === `${deepLevel}-${count}-if`)?.value || '',
//     then: textareas.find((textarea) => textarea.id === `${deepLevel}-${count}-then`)?.value || '',
//     else: textareas.find((textarea) => textarea.id === `${deepLevel}-${count}-else`)?.value || '',
//     end: textareas.find((textarea) => textarea.id === `${deepLevel}-${count}-end`)?.value || '',
//   };
//   setFull(newFull);
// };
// console.log(full);

// const [inputs, setInputs] = useState([
//   { text: '1', focused: false, id: 1 },
//   { text: '2', focused: false, id: 2 },
//   { text: '3', focused: false, id: 3 },
// ]);

// const handleFocus = (id: number) => {
//   setInputs((prevInputs) =>
//     prevInputs.map((input) => ({
//       ...input,
//       focused: input.id === id,
//     }))
//   );
// };

// const handleClick = () => {
//   const focusedIndex = inputs.findIndex((input) => input.focused);
//   if (focusedIndex >= 0) {
//     const newInput = {
//       text: '',
//       focused: true,
//       id: Date.now(), // Unique ID for the new input, you can use a library like uuid for more robust IDs
//     };
//     setInputs((prevInputs) => [
//       ...prevInputs.slice(0, focusedIndex + 1),
//       newInput,
//       ...prevInputs.slice(focusedIndex + 1),
//     ]);
//   }
// };
//      {/* <div>
//      {inputs.map((input) => (
//        <input key={input.id} value={input.text} onFocus={() => handleFocus(input.id)} />
//      ))}
//      <button onClick={handleClick}>click me</button>
//    </div> */}
