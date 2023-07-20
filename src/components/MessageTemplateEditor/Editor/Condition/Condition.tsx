import TextareaAutosize from 'react-textarea-autosize';
import { Button } from '../../../Button';
import styles from './Condition.module.scss';

const Condition = ({
  // onDelete,
  setFocusedTextarea,
}: {
  // onDelete: () => void;
  setFocusedTextarea: (element: HTMLTextAreaElement | null) => void;
}) => {
  return (
    <div className={styles.condition}>
      <div className={styles.condition__part}>
        <div className={styles.condition__label}>
          <div className={styles['condition__state-wrapper']}>
            <span className={styles.condition__state}>IF</span>
            <Button title="Delete" className="button_delete" />
          </div>
          <TextareaAutosize
            className={styles.condition__textaria}
            onFocus={(e) => setFocusedTextarea(e.target)}
            id="0-0-if"
          />
        </div>
      </div>

      <div className={styles.condition__part}>
        <div className={styles.condition__label}>
          <div className={styles['condition__state-wrapper']}>
            <span className={styles.condition__state}>THEN</span>
          </div>
          <TextareaAutosize
            className={styles.condition__textaria}
            onFocus={(e) => setFocusedTextarea(e.target)}
            id="0-0-then"
          />
        </div>
      </div>

      <div className={styles.condition__part}>
        <div className={styles.condition__label}>
          <div className={styles['condition__state-wrapper']}>
            <span className={styles.condition__state}>ELSE</span>
          </div>
          <TextareaAutosize
            className={styles.condition__textaria}
            onFocus={(e) => setFocusedTextarea(e.target)}
            id="0-0-else"
          />
        </div>
      </div>
    </div>
  );
};

export default Condition;

// import TextareaAutosize from 'react-textarea-autosize';
// import { Button } from '../../../Button';
// import styles from './Condition.module.scss';

// const Condition = ({
//   onDelete,
//   setFocusedTextAria,
// }: {
//   onDelete: () => void;
//   setFocusedTextAria: (element: HTMLTextAreaElement | null) => void;
// }) => {
//   return (
//     <div className={styles.condition}>
//       <div className={styles.condition__part}>
//         <div className={styles.condition__label}>
//           <div className={styles['condition__state-wrapper']}>
//             <span className={styles.condition__state}>IF</span>
//             <Button title="Delete" className="button_delete" onClick={onDelete} />
//           </div>
//           <TextareaAutosize
//             className={styles.condition__textaria}
//             onFocus={(e) => setFocusedTextAria(e.target)}
//           />
//         </div>
//       </div>

//       <div className={styles.condition__part}>
//         <div className={styles.condition__label}>
//           <div className={styles['condition__state-wrapper']}>
//             <span className={styles.condition__state}>THEN</span>
//           </div>
//           <TextareaAutosize
//             className={styles.condition__textaria}
//             onFocus={(e) => setFocusedTextAria(e.target)}
//           />
//         </div>
//       </div>

//       <div className={styles.condition__part}>
//         <div className={styles.condition__label}>
//           <div className={styles['condition__state-wrapper']}>
//             <span className={styles.condition__state}>ELSE</span>
//           </div>
//           <TextareaAutosize
//             className={styles.condition__textaria}
//             onFocus={(e) => setFocusedTextAria(e.target)}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Condition;
