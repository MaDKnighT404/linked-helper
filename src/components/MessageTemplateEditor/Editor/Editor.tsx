import TextareaAutosize from 'react-textarea-autosize';
import { ChangeEvent, useState } from 'react';
import { nanoid } from 'nanoid';
import { Button } from '../../Button';

import styles from './Editor.module.scss';


const Editor = ({ variablesList }: { variablesList: string[] }) => {
  const abc = [
    [{ text: 'start', id: nanoid(), focused: true, deepLevel: 1, status: 'status - text' }],
    [
      { text: 'if', id: nanoid(), focused: true, deepLevel: 1, status: 'if' },
      { text: 'then', id: nanoid(), focused: true, deepLevel: 1, status: 'then' },
      [
        { text: 'if', id: nanoid(), focused: true, deepLevel: 2, status: 'if' },
        { text: 'then', id: nanoid(), focused: true, deepLevel: 2, status: 'then' },
        [
          { text: 'if', id: nanoid(), focused: true, deepLevel: 3, status: 'if' },
          { text: 'then', id: nanoid(), focused: true, deepLevel: 3, status: 'then' },
          { text: 'else', id: nanoid(), focused: true, deepLevel: 3, status: 'else' },
          { text: 'end', id: nanoid(), focused: true, deepLevel: 3, status: 'status - text' },
        ],
        { text: 'else', id: nanoid(), focused: true, deepLevel: 2, status: 'else' },
        { text: 'end', id: nanoid(), focused: true, deepLevel: 2, status: 'status - text' },
      ],
      { text: 'else', id: nanoid(), focused: true, deepLevel: 1, status: 'else' },
      { text: 'end', id: nanoid(), focused: true, deepLevel: 1, status: 'status - text' },
    ],
  ];
  const [editorStructure, setEditorStructure] = useState(abc);
  console.log(editorStructure);

  const renderTextareaElements = (elements: any[]): any[] => {
    return elements.map((element) => {
      if (!Array.isArray(element)) {
        if (element.status === 'status - text') {
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
              style={{ marginLeft: element.deepLevel * 100 }}
              key={element.id}
            >
              <div className={styles.condition__label}>
                <div className={styles['condition__state-wrapper']}>
                  <span className={styles.condition__state}>{element.status.toUpperCase()}</span>
                  {element.status === 'if' && <Button title="Delete" className="button_delete" />}
                </div>
                <TextareaAutosize className={styles.condition__textaria} />
              </div>
            </div>
          );
        }
      } else {
        return renderTextareaElements(element);
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
