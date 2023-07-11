import styles from './Button.module.scss';

const Button = ({
  title,
  className,
  onClick,
}: {
  title: string;
  className?: string;
  onClick: () => void;
}) => {
  return (
    <button className={`${styles.button} ${className}`} onClick={onClick}>
      {title}
    </button>
  );
};

export default Button;
