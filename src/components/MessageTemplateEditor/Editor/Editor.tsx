import React, { useEffect } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import useEditorHooks from '../../../Hooks/useEditorHooks';
import { Button } from '../../Button';
import { Element, NestedElement } from '../../../types';
import { concatenateTexts } from '../../../helpers';
import styles from './Editor.module.scss';

const Editor = ({ variablesList, setCompletedTemplate }: { variablesList: string[]; setCompletedTemplate: (value: string) => void }) => {
  const { editorStructure, handleSetFocus, handleDeleteButtonClick, handleTextareaChange, handleVariableButtonClick, handleCursorPositionChange, handleAddNewBlock } = useEditorHooks();

  useEffect(() => {
    const newPreviewText = concatenateTexts(editorStructure);
    setCompletedTemplate(newPreviewText);
  }, [editorStructure, setCompletedTemplate]);

  const renderTextareaElements = (elements: NestedElement[]): JSX.Element[] => {
    return elements.map((element, index) => {
      if (Array.isArray(element)) {
        return <React.Fragment key={index}>{renderTextareaElements(element)}</React.Fragment>;
      }

      const elementData = element as Element;
      if (element.status === 'start' || element.status === 'end') {
        return (
          <div style={{ marginLeft: element.deepLevel * 100 - 100 }} key={element.id}>
            <TextareaAutosize
              id={`(${element.deepLevel})(${element.count})(${element.status})|${element.id}`}
              className={styles.editor__textarea}
              value={element.text}
              onFocus={(e) => handleSetFocus(e.target)}
              onChange={(e) => handleTextareaChange(e.target.value)}
              onClick={(e) => handleCursorPositionChange(e.currentTarget.selectionStart)}
              onKeyUp={(e) => handleCursorPositionChange(e.currentTarget.selectionStart)}
            />
          </div>
        );
      } else {
        return (
          <div className={styles.condition__part} style={{ marginLeft: elementData.deepLevel * 100 }} key={elementData.id}>
            <div className={styles.condition__label}>
              <div className={styles['condition__state-wrapper']}>
                <span className={styles.condition__state}>{elementData.status.toUpperCase()}</span>
                {elementData.status === 'if' && <Button title="Delete" className="button_delete" onClick={() => handleDeleteButtonClick(elementData.deepLevel, elementData.count)} />}
              </div>
              <TextareaAutosize
                id={`(${element.deepLevel})(${element.count})(${element.status})|${element.id}`}
                className={styles.condition__textaria}
                value={elementData.text}
                onFocus={(e) => handleSetFocus(e.target)}
                onChange={(e) => handleTextareaChange(e.target.value)}
                onClick={(e) => handleCursorPositionChange(e.currentTarget.selectionStart)}
                onKeyUp={(e) => handleCursorPositionChange(e.currentTarget.selectionStart)}
              />
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
            <Button className="button_variable" title={`{${variable}}`} onClick={() => handleVariableButtonClick(`{${variable}}`)} />
          </li>
        ))}
      </ul>

      <Button title="Click to add: IF [{some variable} or expression] THEN [then_value] ELSE [else_value]" className="button_condition" onClick={handleAddNewBlock} />

      <h4 className={styles.editor__subtitle}>Message template</h4>
      <div className={styles['editor__message-wrapper']}>{renderTextareaElements(editorStructure)}</div>
    </div>
  );
};

export default Editor;
