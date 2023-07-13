import { useState } from 'react';
import { Button } from '../../Button';
import styles from './Preview.module.scss';

const Preview = ({ variablesList, onClose }: { variablesList: string[]; onClose: () => void }) => {
  const handlePreviewClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  const [inputValues, setInputValues] = useState({});

  const handleInputChange = (variable: string, value: string) => {
    setInputValues((prevState) => ({
      ...prevState,
      [variable]: value,
    }));
  };

  console.log(inputValues);
  return (
    <div className={styles['preview-substrate']}>
      <div className={styles.preview} onClick={handlePreviewClick}>
        <h2 className={styles.preview__title}>Message preview</h2>

        <h4 className={styles.preview__subtitle}>Message</h4>
        <textarea className={styles.preview__textarea} defaultValue="abc" />

        <h4 className={styles.preview__subtitle}>Variables</h4>
        <ul className={styles['variables-list-preview']}>
          {variablesList.map((variable) => (
            <li className={styles.variable} key={variable}>
              <label className={styles.variable__label}>{variable} :</label>
              <input
                className={styles.variable__input}
                type="text"
                onChange={(e) => handleInputChange(variable, e.target.value)}
              />
            </li>
          ))}
        </ul>

        <Button title="Close preview" className="button_preview" onClick={onClose} />
      </div>
    </div>
  );
};

export default Preview;
