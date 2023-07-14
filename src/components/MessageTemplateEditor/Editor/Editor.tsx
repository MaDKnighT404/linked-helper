import { useRef } from 'react';
import { Button } from '../../Button';
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
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleVariableButtonClick = (variable: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const startPos = textarea.selectionStart || 0;
    const endPos = textarea.selectionEnd || 0;

    const newTemplate =
      template.substring(0, startPos) +
      `{${variable}}` +
      template.substring(endPos, template.length);

    setTemplate(newTemplate);
    textarea.blur();
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

      <h4 className={styles.editor__subtitle}>Message template</h4>
      <textarea
        ref={textareaRef}
        className={styles.editor__textarea}
        value={template}
        onChange={(event) => setTemplate(event.target.value)}
      />
    </div>
  );
};

export default Editor;
