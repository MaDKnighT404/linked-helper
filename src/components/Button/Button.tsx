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
//   [{ text: 'start', id: nanoid(), deepLevel: 1, count: 1, status: 'status - start' }],
//   [
//     { text: 'if 1-1', id: nanoid(), deepLevel: 1, count: 1, status: 'if' },
//     { text: 'then 1-1', id: nanoid(), deepLevel: 1, count: 1, status: 'then' },
//     [
//       { text: 'if 2-1', id: nanoid(), deepLevel: 2, count: 1, status: 'if' },
//       { text: 'then 2-1', id: nanoid(), deepLevel: 2, count: 1, status: 'then' },
//       [
//         { text: 'if 3-1', id: nanoid(), deepLevel: 3, count: 1, status: 'if' },
//         { text: 'then 3-1', id: nanoid(), deepLevel: 3, count: 1, status: 'then' },
//         [
//           { text: 'if 4-1', id: nanoid(), deepLevel: 4, count: 1, status: 'if' },
//           { text: 'then 4-1', id: nanoid(), deepLevel: 4, count: 1, status: 'then' },
//           { text: 'else 4-1', id: nanoid(), deepLevel: 4, count: 1, status: 'else' },
//           { text: 'end 4-1', id: nanoid(), deepLevel: 4, count: 1, status: 'status - end' },
//         ],
//         { text: 'else 3-1', id: nanoid(), deepLevel: 3, count: 1, status: 'else' },
//         { text: 'end 3-1', id: nanoid(), deepLevel: 3, count: 1, status: 'status - end' },
//       ],
//       { text: 'else 2-1', id: nanoid(), deepLevel: 2, count: 1, status: 'else' },
//       { text: 'end 2-1', id: nanoid(), deepLevel: 2, count: 1, status: 'status - end' },
//     ],
//     { text: 'else 1-1', id: nanoid(), deepLevel: 1, count: 1, status: 'else' },
//     [
//       { text: 'if 2-2', id: nanoid(), deepLevel: 2, count: 2, status: 'if' },
//       { text: 'then 2-2', id: nanoid(), deepLevel: 2, count: 2, status: 'then' },
//       { text: 'else 2-2', id: nanoid(), deepLevel: 2, count: 2, status: 'else' },
//       { text: 'end 2-2', id: nanoid(), deepLevel: 2, count: 2, status: 'status - end' },
//     ],
//     { text: 'end 1-1', id: nanoid(), deepLevel: 1, count: 1, status: 'status - end' },
//   ],
// ]);