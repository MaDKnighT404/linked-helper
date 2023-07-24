import { useState } from 'react';
import { MessageTemplateEditor } from '../MessageTemplateEditor';
import { Button } from '../Button';
import styles from './Main.module.scss';
import { NestedElement } from '../../types';

// Захардкоженные аргументы для параметров виджета MessageTemplateEditor
export const arrVarNames = localStorage.arrVarNames
  ? JSON.parse(localStorage.arrVarNames)
  : ['firstname', 'lastname', 'company', 'position'];

export const template = localStorage.getItem('template')
  ? JSON.parse(localStorage.getItem('template')!)
  : [
      [
        {
          text: 'Hello! You can added here any message!',
          id: `START-TEXT-AREA`,
          deepLevel: 1,
          count: 1,
          status: 'start',
        },
      ],
    ];

export const callbackSave = (widgetStructure: NestedElement[] | null): Promise<void> => {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      localStorage.setItem('template', JSON.stringify(widgetStructure));
      resolve();
    }, 500);
  });
};

const Main = () => {
  const [isOpenMessageTemplateEditor, setIsOpenMessageTemplateEditor] = useState(false);

  const toggleMessageTemplateEditor = () => {
    setIsOpenMessageTemplateEditor((prevStatus) => !prevStatus);
  };

  return (
    <main className={styles.main}>
      <div className={styles.main__wrapper}>
        {!isOpenMessageTemplateEditor ? (
          <div className={styles.main__text}>
            <h2 style={{ textAlign: 'center' }}>Welcome to Message Template Editor!</h2>
            <h3 style={{ textAlign: 'center' }}>
              This application is a system for generating a message based on a template structure
            </h3>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cupiditate velit mollitia
              perspiciatis quis dolorem! Voluptatem laborum, minus quibusdam at quisquam ipsam,
              dolores, odit nisi assumenda ut asperiores architecto magnam totam. Quo assumenda
              vitae aut quia accusamus non explicabo dolore officia ipsum vero. Illo unde quaerat
              exercitationem cum porro ut aspernatur, blanditiis earum nisi perspiciatis. Incidunt
              molestias numquam autem rerum soluta? Aliquam molestias voluptates commodi
              voluptatibus obcaecati placeat culpa, mollitia cumque quae tenetur fugit illum alias
              sequi exercitationem recusandae, aliquid omnis esse? Dolore nesciunt cumque minima
              delectus suscipit saepe iusto totam! Hic quis tempore perspiciatis, maxime quibusdam
              veritatis ipsum, praesentium voluptatibus obcaecati minima minus in accusantium. Harum
              cum accusamus, autem repellendus inventore, provident eum fuga quaerat a perferendis
              quidem quisquam est? Consectetur natus eius obcaecati temporibus eaque aut dicta iste
              fugiat ut amet labore, quis laudantium et excepturi! Voluptatem itaque, necessitatibus
              dignissimos, eveniet veritatis error, architecto ratione eius quaerat obcaecati natus?
              Quod repudiandae odit porro velit quis qui dolore assumenda recusandae consectetur
              deleniti, quae laborum itaque corporis. Totam recusandae cum rem, explicabo harum
              repudiandae, beatae ipsum mollitia earum illum possimus accusamus? Sit cum fugiat,
              quia,
            </p>
            <h3 style={{ textAlign: 'center' }}>
              You can trying this application by clicking 'Message Editor' button!
            </h3>
          </div>
        ) : (
          <MessageTemplateEditor
            arrVarNames={arrVarNames}
            template={template}
            callbackSave={callbackSave}
            onClose={toggleMessageTemplateEditor}
          />
        )}

        {!isOpenMessageTemplateEditor && (
          <Button
            title="Message Editor"
            onClick={toggleMessageTemplateEditor}
            className="button_change"
          />
        )}
      </div>
    </main>
  );
};

export default Main;
