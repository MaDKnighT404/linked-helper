import TextareaAutosize from 'react-textarea-autosize';
import { ChangeEvent, useState } from 'react';
import { nanoid } from 'nanoid';
import { Button } from '../../Button';

import styles from './Editor.module.scss';

const a = [{text: 'start', id: nanoid(), deepLevel: 1, status: 'text' }]

const Editor = ({ variablesList }: { variablesList: string[] }) => {
  const abc = [
    [['start', nanoid(), 'focused', 1, 'status - text']],
    [
      ['if', nanoid(), 'focused', 1, 'if'],
      ['then', nanoid(), 'focused', 1, 'then'],
      [
        ['if', nanoid(), 'focused', 2, 'if'],
        ['then', nanoid(), 'focused', 2, 'then'],
        ['else', nanoid(), 'focused', 2, 'else'],
        ['end', nanoid(), 'focused', 2, 'status - text'],
      ],
      ['else', nanoid(), 'focused', 1, 'else'],
      ['end', nanoid(), 'focused', 1, 'status - text'],
    ],
  ];
  const [editorStructure, setEditorStructure] = useState(abc);
  console.log(editorStructure);

  const renderTextareaElements = (elements: any[]): any[] => {
    return elements.map((element) => {
      if (!Array.isArray(element[0])) {
        if (element[4] === 'status - text') {
          return (
            <div style={{ marginLeft: element[3] * 100 - 100 }} key={element[1]}>
              <TextareaAutosize
                id={element[1]}
                className={styles.editor__textarea}
                value={element[0]}
              />
            </div>
          );
        } else {
          return (
            <div
              className={styles.condition__part}
              style={{ marginLeft: element[3] * 100 }}
              key={element[1]}
            >
              <div className={styles.condition__label}>
                <div className={styles['condition__state-wrapper']}>
                  <span className={styles.condition__state}>{element[4].toUpperCase()}</span>
                  {element[4] === 'if' && <Button title="Delete" className="button_delete" />}
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
