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
  count: number;
  status: string;
}

type NestedElement = Element | NestedElement[];

const recursiveDeleteByDeepLevel = (
  elements: NestedElement[],
  targetDeepLevel: number,
  targetCount: number
): NestedElement[] => {
  return elements.reduce((acc: NestedElement[], element: NestedElement) => {
    if (Array.isArray(element)) {
      const newNestedArray = recursiveDeleteByDeepLevel(element, targetDeepLevel, targetCount);
      if (newNestedArray.length > 0) {
        acc.push(newNestedArray);
      }
    } else {
      const elementData = element as Element;
      if (elementData.deepLevel !== targetDeepLevel || elementData.count !== targetCount || elementData.status === 'status - start') {
        acc.push(elementData);
      }
    }
    return acc;
  }, []);
};

const Editor: React.FC<{ variablesList: string[] }> = ({ variablesList }) => {
  const [editorStructure, setEditorStructure] = useState<NestedElement[]>([
    [
      {
        text: 'start',
        id: nanoid(),
        focused: true,
        deepLevel: 1,
        count: 1,
        status: 'status - start',
      },
    ],
    [
      { text: 'if 1', id: nanoid(), focused: false, deepLevel: 1, count: 1, status: 'if' },
      [
        { text: 'if 2', id: nanoid(), focused: false, deepLevel: 2, count: 1, status: 'if' },
        { text: 'then 2', id: nanoid(), focused: false, deepLevel: 2, count: 1, status: 'then' },
        { text: 'else 2', id: nanoid(), focused: false, deepLevel: 2, count: 1, status: 'else' },
        {
          text: 'end 2',
          id: nanoid(),
          focused: false,
          deepLevel: 2,
          count: 1,
          status: 'status - end',
        },
      ],
      { text: 'then 1', id: nanoid(), focused: false, deepLevel: 1, count: 1, status: 'then' },
      [
        { text: 'if 3', id: nanoid(), focused: false, deepLevel: 2, count: 2, status: 'if' },
        [
          { text: 'if 4', id: nanoid(), focused: false, deepLevel: 3, count: 1, status: 'if' },
          { text: 'then 4', id: nanoid(), focused: false, deepLevel: 3, count: 1, status: 'then' },
          { text: 'else 4', id: nanoid(), focused: false, deepLevel: 3, count: 1, status: 'else' },
          {
            text: 'end 4',
            id: nanoid(),
            focused: false,
            deepLevel: 3,
            count: 1,
            status: 'status - end',
          },
        ],
        { text: 'then 3', id: nanoid(), focused: false, deepLevel: 2, count: 2, status: 'then' },
        [
          { text: 'if 5', id: nanoid(), focused: false, deepLevel: 3, count: 2, status: 'if' },
          { text: 'then 5', id: nanoid(), focused: false, deepLevel: 3, count: 2, status: 'then' },
          { text: 'else 5', id: nanoid(), focused: false, deepLevel: 3, count: 2, status: 'else' },
          {
            text: 'end ',
            id: nanoid(),
            focused: false,
            deepLevel: 3,
            count: 2,
            status: 'status - end',
          },
        ],
        { text: 'else 3', id: nanoid(), focused: false, deepLevel: 2, count: 2, status: 'else' },
        {
          text: 'end 3',
          id: nanoid(),
          focused: false,
          deepLevel: 2,
          count: 2,
          status: 'status - end',
        },
      ],
      { text: 'else 1', id: nanoid(), focused: false, deepLevel: 1, count: 1, status: 'else' },
      {
        text: 'end 1',
        id: nanoid(),
        focused: false,
        deepLevel: 1,
        count: 1,
        status: 'status - end',
      },
    ],
  ]);

  const handleDeleteButtonClick = (deepLevel: number, count: number) => {
    const newEditorStructure = recursiveDeleteByDeepLevel(editorStructure, deepLevel, count);
    setEditorStructure(newEditorStructure);
  };

  const renderTextareaElements = (elements: NestedElement[]): JSX.Element[] => {
    return elements.map((element) => {
      if (Array.isArray(element)) {
        return <React.Fragment key={nanoid()}>{renderTextareaElements(element)}</React.Fragment>;
      }

      const elementData = element as Element;
      if (element.status === 'status - start' || element.status === 'status - end') {
        return (
          <div style={{ marginLeft: element.deepLevel * 100 - 100 }} key={element.id}>
            <TextareaAutosize
              id={element.id}
              className={styles.editor__textarea}
              value={element.text}
            />
          </div>
        );
      } else {
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
                    onClick={() =>
                      handleDeleteButtonClick(elementData.deepLevel, elementData.count)
                    }
                  />
                )}
              </div>
              <TextareaAutosize className={styles.condition__textaria} value={elementData.text} />
            </div>
          </div>
        );
      }
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
