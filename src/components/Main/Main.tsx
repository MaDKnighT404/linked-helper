import { useState } from 'react';
import { Button } from '../Button';
import { Editor } from '../Editor';
import { Preview } from '../Preview';
import styles from './Main.module.scss';

const Main = () => {
  const [isOpenEditor, setIsOpenEditor] = useState(false);

  const handleClick = () => {
    setIsOpenEditor((prevStatus) => !prevStatus);
  };

  return (
    <main className={styles.main}>
      <div className={styles.main__wrapper}>
        {isOpenEditor ? (
          <p>This is application for Message Editor</p>
        ) : (
          <>
            <Editor />
            <Preview />
          </>
        )}

        <Button
          title={isOpenEditor ? 'Main' : 'Message Editor'}
          onClick={handleClick}
          className="button_change"
        />
      </div>
    </main>
  );
};

export default Main;
