import styles from './Header.module.scss';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.header__wrapper}>
        <img src="../assets/logo.svg" className={styles.header__logo} alt="logo" />
        <h1 className={styles.header__title}>Message Template Editor</h1>
      </div>
    </header>
  );
};

export default Header;
