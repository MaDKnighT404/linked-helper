import React, { useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { nanoid } from 'nanoid';
import { Button } from '../../Button';

import styles from './Editor.module.scss';

interface Element {
  text: string;
  id: string;
  focused: boolean;
  deepLevel: number;
  status: string;
}

type NestedElement = Element | NestedElement[];

const Editor: React.FC<{ variablesList: string[] }> = ({ variablesList }) => {

  const [editorStructure, setEditorStructure] = useState<NestedElement[]>([
    [{ text: 'start', id: nanoid(), focused: true, deepLevel: 1, status: 'status - start' }],
    [
      { text: 'if 1', id: nanoid(), focused: false, deepLevel: 1, status: 'if' },
      { text: 'then 1', id: nanoid(), focused: false, deepLevel: 1, status: 'then' },
      [
        { text: 'if 2', id: nanoid(), focused: false, deepLevel: 2, status: 'if' },
        { text: 'then 2', id: nanoid(), focused: false, deepLevel: 2, status: 'then' },
        [
          { text: 'if 3', id: nanoid(), focused: false, deepLevel: 3, status: 'if' },
          { text: 'then 3', id: nanoid(), focused: false, deepLevel: 3, status: 'then' },
          { text: 'else 3', id: nanoid(), focused: false, deepLevel: 3, status: 'else' },
          [
            { text: 'if 4', id: nanoid(), focused: false, deepLevel: 4, status: 'if' },
            [
              { text: 'if 5', id: nanoid(), focused: false, deepLevel: 5, status: 'if' },
              { text: 'then 5', id: nanoid(), focused: false, deepLevel: 5, status: 'then' },
              { text: 'else 5', id: nanoid(), focused: false, deepLevel: 5, status: 'else' },
              { text: 'end 5', id: nanoid(), focused: false, deepLevel: 5, status: 'status - end' },
            ],
            { text: 'then 4', id: nanoid(), focused: false, deepLevel: 4, status: 'then' },
            { text: 'else 4', id: nanoid(), focused: false, deepLevel: 4, status: 'else' },
            { text: 'end 4', id: nanoid(), focused: false, deepLevel: 4, status: 'status - end' },
          ],
          { text: 'end 3', id: nanoid(), focused: false, deepLevel: 3, status: 'status - end' },
        ],
        { text: 'else 2', id: nanoid(), focused: false, deepLevel: 2, status: 'else' },
        { text: 'end 2', id: nanoid(), focused: false, deepLevel: 2, status: 'status - end' },
      ],
      { text: 'else 1', id: nanoid(), focused: false, deepLevel: 1, status: 'else' },
      { text: 'end 1', id: nanoid(), focused: false, deepLevel: 1, status: 'status - end' },
    ],
  ]);




  const handleDeleteButtonClick = (deepLevel: number, elements: NestedElement[]) => {
    const deleteElements = (elements: NestedElement[]): NestedElement[] => {
      const updatedElements: NestedElement[] = [];

      for (const element of elements) {
        if (Array.isArray(element)) {
          const updatedNestedElements = deleteElements(element);
          if (updatedNestedElements.length > 0) {
            updatedElements.push(updatedNestedElements);
          }
        } else {
          if (element.deepLevel !== deepLevel || element.status === 'status - start') {
            updatedElements.push(element);
          }
        }
      }

      return updatedElements;
    };

    setEditorStructure((prevStructure) => {
      const updatedStructure = deleteElements(elements).flat();
      return updateDeepLevel(updatedStructure, 1);
    });
  };

  const updateDeepLevel = (elements: NestedElement[], currentDeepLevel: number): NestedElement[] => {
    const updatedElements: NestedElement[] = [];

    for (const element of elements) {
      if (Array.isArray(element)) {
        const updatedNestedElements = updateDeepLevel(element, currentDeepLevel + 1);
        updatedElements.push(updatedNestedElements);
      } else {
        element.deepLevel = currentDeepLevel;
        updatedElements.push(element);
      }
    }

    return updatedElements;
  };

  const renderTextareaElements = (elements: NestedElement[]): JSX.Element[] => {
    return elements.map((element) => {
      if (Array.isArray(element)) {
        return (
          <React.Fragment key={(element as Element[])[0].id}>
            {renderTextareaElements(element)}
          </React.Fragment>
        );
      }

      const elementData = element as Element;

      return (
        <div
          className={styles.condition__part}
          style={{ marginLeft: elementData.deepLevel * 100 }}
          key={elementData.id}
        >
          <div className={styles.condition__label}>
            <div className={styles['condition__state-wrapper']}>
              <span className={styles.condition__state}>{elementData.status.toUpperCase()}</span>
              {elementData.status === 'if' && (
                <Button
                  title="Delete"
                  className="button_delete"
                  onClick={() => handleDeleteButtonClick(elementData.deepLevel, editorStructure)}
                />
              )}
            </div>
            <TextareaAutosize
              className={styles.condition__textaria}
              value={elementData.text}
            />
          </div>
        </div>
      );
    });
  };

  return (
    <div className={styles.editor}>
      <h2 className={styles.editor__title}>Message editor</h2>

      <h4 className={styles.editor__subtitle}>Variables</h4>

      <ul className={styles['variables-list-editor']}>
        {variablesList.map((variable) => (
          <li className={styles.variable} key={variable}>
            <Button className="button_variable" title={`{${variable}}`} />
          </li>
        ))}
      </ul>

      <Button
        title="Click to add: IF [{some variable} or expression] THEN [then_value] ELSE [else_value]"
        className="button_condition"
      />
      <Button title="get full" className="button_condition" />

      <h4 className={styles.editor__subtitle}>Message template</h4>
      <div className={styles['editor__message-wrapper']}>
        {renderTextareaElements(editorStructure)}
      </div>
    </div>
  );
};

export default Editor;
