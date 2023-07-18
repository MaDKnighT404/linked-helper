import TextareaAutosize from 'react-textarea-autosize';
import { Dispatch, useState } from 'react';
import { nanoid } from 'nanoid';
import { Button } from '../../Button';
import { Condition } from './Condition';

import styles from './Editor.module.scss';
import { CompletedTemplateItem, FocusedItem } from '../../../types';

const Editor = ({
  variablesList,
  completedTemplate,
  setCompletedTemplate,
}: {
  variablesList: string[];
  completedTemplate: CompletedTemplateItem[];
  setCompletedTemplate: Dispatch<React.SetStateAction<CompletedTemplateItem[]>>;
}) => {
  const [conditions, setConditions] = useState<string[]>([]);
  const [focusedItem, setFocusedItem] = useState<FocusedItem | null>(null);

  const handleVariableButtonClick = (variable: string) => {};

  const handleAddCondition = () => {
    setConditions((prevConditions) => [...prevConditions, nanoid()]);

    // Add a new empty CompletedTemplateItem to the completedTemplate array
    setCompletedTemplate((prevCompletedTemplate) => [
      ...prevCompletedTemplate,
      { if: '', then: '', else: '', end: '' },
    ]);
  };

  const handleDeleteCondition = (index: number) => {
    setConditions((prevConditions) => {
      const updatedConditions = [...prevConditions];
      updatedConditions.splice(index, 1);
      return updatedConditions;
    });

    setCompletedTemplate((prevCompletedTemplate) =>
      prevCompletedTemplate.filter((_, i) => i !== index + 1)
    );
  };

  const handleTextareaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
    property: keyof CompletedTemplateItem,
    index: number
  ) => {
    const updatedCompletedTemplate = completedTemplate.map((item, i) =>
      i === index ? { ...item, [property]: event.target.value } : item
    );
    setCompletedTemplate(updatedCompletedTemplate);
  };

  const handleTextareaFocus = (
    event: React.FocusEvent<HTMLTextAreaElement>,
    property: keyof CompletedTemplateItem,
    deepLevel: number
  ) => {
    setFocusedItem({ focusedTextaria: event.target, deepLevel });
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
          value={completedTemplate[0].start}
          onChange={(event) => handleTextareaChange(event, 'start', 0)}
          onFocus={(event) => handleTextareaFocus(event, 'start', 0)}
        />
        {conditions.map((condition, index) => (
          <div key={condition}>
            <Condition
              onDelete={() => handleDeleteCondition(index)}
              onTextareaChange={handleTextareaChange}
              conditionData={completedTemplate[index + 1]}
              index={index + 1}
            />
            <TextareaAutosize
              className={styles.editor__textarea}
              value={completedTemplate[index + 1].end}
              onChange={(event) => handleTextareaChange(event, 'end', index + 1)}
              onFocus={(event) => handleTextareaFocus(event, 'end', index + 1)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Editor;
