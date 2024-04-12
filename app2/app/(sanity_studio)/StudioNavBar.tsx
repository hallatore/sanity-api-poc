import styles from './StudioNavBar.module.css';

function StudioNavBar() {

    return (
        <div className={styles.navbar}>
            <a href="http://localhost:3000/studio" className={styles.link}>Produktkatalog</a>
            <a href="http://localhost:3001/studio" className={`${styles.link} ${styles.active}`}>Demo app</a>
        </div>
    );
}

export default StudioNavBar;