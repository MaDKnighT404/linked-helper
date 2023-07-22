import classNames from 'classnames';
import styles from './Button.module.scss';

const Button = ({ title, className, onClick }: { title: string; className?: string; onClick?: () => void }) => {
  const buttonClasses = classNames(styles.button, className && styles[className]);

  return (
    <button className={buttonClasses} onClick={onClick}>
      {title}
    </button>
  );
};

export default Button;

// const [editorStructure, setEditorStructure] = useState<NestedElement[]>([
//   [{ text: 'start', id: nanoid(), focused: false, deepLevel: 1, count: 1, status: 'status - start' }],

//   [
//     { text: 'if 1', id: nanoid(), focused: false, deepLevel: 1, count: 1, status: 'if' },
//     { text: 'then 1', id: nanoid(), focused: false, deepLevel: 1, count: 1, status: 'then' },
//     [
//       { text: 'if 2', id: nanoid(), focused: false, deepLevel: 2, count: 1, status: 'if' },
//       { text: 'then 2', id: nanoid(), focused: false, deepLevel: 2, count: 1, status: 'then' },
//       { text: 'else 2', id: nanoid(), focused: false, deepLevel: 2, count: 1, status: 'else' },
//       { text: 'end 2', id: nanoid(), focused: false, deepLevel: 2, count: 1, status: 'status - end' },
//     ],
//     { text: 'else 1', id: nanoid(), focused: false, deepLevel: 1, count: 1, status: 'else' },
//     [
//       { text: 'if 2', id: nanoid(), focused: false, deepLevel: 2, count: 2, status: 'if' },
//       { text: 'then 2', id: nanoid(), focused: false, deepLevel: 2, count: 2, status: 'then' },
//       [
//         { text: 'if 3', id: nanoid(), focused: false, deepLevel: 3, count: 1, status: 'if' },
//         [
//           { text: 'if 4', id: nanoid(), focused: false, deepLevel: 4, count: 1, status: 'if' },
//           { text: 'then 4', id: nanoid(), focused: false, deepLevel: 4, count: 1, status: 'then' },
//           { text: 'else 4', id: nanoid(), focused: false, deepLevel: 4, count: 1, status: 'else' },
//           { text: 'end 4', id: nanoid(), focused: false, deepLevel: 4, count: 1, status: 'status - end' },
//         ],
//         { text: 'then 3', id: nanoid(), focused: false, deepLevel: 3, count: 1, status: 'then' },
//         [
//           { text: 'if 4', id: nanoid(), focused: false, deepLevel: 4, count: 2, status: 'if' },
//           { text: 'then 4', id: nanoid(), focused: false, deepLevel: 4, count: 2, status: 'then' },
//           { text: 'else 4', id: nanoid(), focused: false, deepLevel: 4, count: 2, status: 'else' },
//           { text: 'end 4', id: nanoid(), focused: false, deepLevel: 4, count: 2, status: 'status - end' },
//         ],
//         { text: 'else 3', id: nanoid(), focused: false, deepLevel: 3, count: 1, status: 'else' },
//         [
//           { text: 'if 4', id: nanoid(), focused: false, deepLevel: 4, count: 3, status: 'if' },
//           { text: 'then 4', id: nanoid(), focused: false, deepLevel: 4, count: 3, status: 'then' },
//           [
//             { text: 'if 5', id: nanoid(), focused: false, deepLevel: 5, count: 1, status: 'if' },
//             { text: 'then 5', id: nanoid(), focused: false, deepLevel: 5, count: 1, status: 'then' },
//             { text: 'else 5', id: nanoid(), focused: false, deepLevel: 5, count: 1, status: 'else' },
//             { text: 'end 5', id: nanoid(), focused: false, deepLevel: 5, count: 1, status: 'status - end' },
//           ],
//           { text: 'else 4', id: nanoid(), focused: false, deepLevel: 4, count: 3, status: 'else' },
//           [
//             { text: 'if 6', id: nanoid(), focused: false, deepLevel: 5, count: 2, status: 'if' },
//             { text: 'then 6', id: nanoid(), focused: false, deepLevel: 5, count: 2, status: 'then' },
//             { text: 'else 6', id: nanoid(), focused: false, deepLevel: 5, count: 2, status: 'else' },
//             { text: 'end 6', id: nanoid(), focused: false, deepLevel: 5, count: 2, status: 'status - end' },
//           ],
//           { text: 'end 4', id: nanoid(), focused: false, deepLevel: 4, count: 3, status: 'status - end' },
//         ],
//         { text: 'end 3', id: nanoid(), focused: false, deepLevel: 3, count: 1, status: 'status - end' },
//       ],
//       { text: 'else 2', id: nanoid(), focused: false, deepLevel: 2, count: 2, status: 'else' },
//       { text: 'end 2', id: nanoid(), focused: false, deepLevel: 2, count: 2, status: 'status - end' },
//     ],
//     { text: 'end 1', id: nanoid(), focused: false, deepLevel: 1, count: 1, status: 'status - end' },
//   ],
// ]);