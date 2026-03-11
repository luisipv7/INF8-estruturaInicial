import styles from './Layout.module.css';

/**
 * Main Layout — top nav + page content area
 */
export default function Layout({ children }) {
  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <div className={styles.brand}>
            <span className={styles.brandIcon}>✦</span>
            <span className={styles.brandName}>TodoFlow</span>
          </div>
          <p className={styles.tagline}>Stay focused. Get things done.</p>
        </div>
      </header>

      <main className={styles.main}>{children}</main>

      <footer className={styles.footer}>
        <p>INF8 · Full-Stack Todo App · {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}
