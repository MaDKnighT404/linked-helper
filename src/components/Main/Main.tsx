import { useState } from 'react';
import { MessageTemplateEditor } from '../MessageTemplateEditor';
import { Button } from '../Button';
import styles from './Main.module.scss';

const Main = () => {
  const [isOpenMessageTemplateEditor, setIsOpenMessageTemplateEditor] = useState(false);

  const toggleMessageTemplateEditor = () => {
    setIsOpenMessageTemplateEditor((prevStatus) => !prevStatus);
  };

  return (
    <main className={styles.main}>
      <div className={styles.main__wrapper}>
        {!isOpenMessageTemplateEditor ? (
          <p className={styles.main__text}>
            This is application for Message Editor Lorem ipsum dolor, sit amet consectetur
            adipisicing elit. Cupiditate velit mollitia perspiciatis quis dolorem! Voluptatem
            laborum, minus quibusdam at quisquam ipsam, dolores, odit nisi assumenda ut asperiores
            architecto magnam totam. Quo assumenda vitae aut quia accusamus non explicabo dolore
            officia ipsum vero. Illo unde quaerat exercitationem cum porro ut aspernatur, blanditiis
            earum nisi perspiciatis. Incidunt molestias numquam autem rerum soluta? Aliquam
            molestias voluptates commodi voluptatibus obcaecati placeat culpa, mollitia cumque quae
            tenetur fugit illum alias sequi exercitationem recusandae, aliquid omnis esse? Dolore
            nesciunt cumque minima delectus suscipit saepe iusto totam! Hic quis tempore
            perspiciatis, maxime quibusdam veritatis ipsum, praesentium voluptatibus obcaecati
            minima minus in accusantium. Harum cum accusamus, autem repellendus inventore, provident
            eum fuga quaerat a perferendis quidem quisquam est? Consectetur natus eius obcaecati
            temporibus eaque aut dicta iste fugiat ut amet labore, quis laudantium et excepturi!
            Voluptatem itaque, necessitatibus dignissimos, eveniet veritatis error, architecto
            ratione eius quaerat obcaecati natus? Quod repudiandae odit porro velit quis qui dolore
            assumenda recusandae consectetur deleniti, quae laborum itaque corporis. Totam
            recusandae cum rem, explicabo harum repudiandae, beatae ipsum mollitia earum illum
            possimus accusamus? Sit cum fugiat, quia, aspernatur quaerat laudantium ipsum sapiente
            sint cumque error voluptatibus saepe delectus enim placeat quidem architecto, vitae
            repellendus temporibus suscipit dolorum ea dolorem voluptatem magni facere. Perferendis!
            Autem eaque, ut ducimus vel vero sit aliquam quidem dicta atque architecto ipsa eius
            impedit sed cupiditate asperiores aliquid sequi eveniet tempore. Quia corporis quo
            aperiam ipsam impedit! Ab, quia! Temporibus voluptatibus labore vitae illum debitis
            accusamus nulla, laborum modi amet consequuntur accusantium nisi perspiciatis quis neque
            alias doloribus commodi fugit tempora nihil rem quibusdam perferendis vero ab unde?
            Molestias. Doloribus adipisci ex illo, cum velit aliquam. Ipsum quidem, dolores in eum
            reprehenderit aut repellendus quas nobis veritatis, reiciendis tempore earum dolorem ea?
            Facilis minus perferendis esse accusamus fugit nam? At inventore esse rem alias autem.
            Distinctio laudantium, rem facilis doloribus cupiditate suscipit pariatur reiciendis
            nemo voluptatum laboriosam maiores voluptatibus asperiores sequi itaque obcaecati culpa
            aliquid porro, blanditiis eligendi adipisci! Voluptas, consectetur. Voluptas, quis.
            Repudiandae error quaerat corrupti molestias, perspiciatis explicabo atque reiciendis
            accusamus consequatur, distinctio incidunt eum illo laboriosam inventore earum voluptas!
            Amet optio quo laudantium facere omnis eligendi. Nostrum, eligendi? Deserunt debitis
            voluptate totam beatae perferendis atque amet. Esse nesciunt impedit harum possimus
            corrupti atque aut, at dolore praesentium laboriosam. Consequuntur error, expedita quas
            ducimus asperiores suscipit in. Qui quaerat corrupti nam sed alias illo iure quibusdam
            repellat laudantium fuga debitis dolore maxime error odio ratione nostrum eligendi
          </p>
        ) : (
          <MessageTemplateEditor onClose={toggleMessageTemplateEditor} />
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
