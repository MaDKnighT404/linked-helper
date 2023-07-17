import { useState, useEffect, useRef } from 'react';
import { Button } from '../../Button';
import { adjustTextareaHeight } from '../../../helpers/adjustTextareaHeight';
import { createNewTemplate } from '../../../helpers/createNewTemplate';
import styles from './Editor.module.scss';
import { Condition } from './Condition';

const Editor = ({
  variablesList,
  template,
  setTemplate,
}: {
  variablesList: string[];
  template: string;
  setTemplate: (newTemplate: string) => void;
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [conditions, setConditions] = useState<number[]>([]);

  useEffect(() => {
    adjustTextareaHeight(textareaRef);
  }, [template]);

  const handleVariableButtonClick = (variable: string) => {
    const newTemplate = createNewTemplate(textareaRef, template, variable);
    setTemplate(newTemplate);
    adjustTextareaHeight(textareaRef);
  };

  const handleConditionClick = () => {
    setConditions((prevConditions) => [...prevConditions, Date.now()]);
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
        onClick={handleConditionClick}
      />

      <h4 className={styles.editor__subtitle}>Message template</h4>
      <div className={styles['editor__message-wrapper']}>
        <textarea
          ref={textareaRef}
          className={styles.editor__textarea}
          value={template}
          onChange={(event) => {
            setTemplate(event.target.value);
            adjustTextareaHeight(textareaRef);
          }}
        />
        {conditions.map((condition, index) => (
          <Condition key={condition} />
        ))}
      </div>
    </div>
  );
};

export default Editor;
