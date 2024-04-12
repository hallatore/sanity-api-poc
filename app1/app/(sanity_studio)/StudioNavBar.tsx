'use client';

import { useEffect } from 'react';
import styles from './StudioNavBar.module.css';

const adjustSanityStudioHeight = (timeout: number) : void => {    
    setTimeout(() => {
        const sanityStudio = document.querySelector('#sanity') as HTMLDivElement;

        if (sanityStudio) {
            sanityStudio.style.height = 'calc(100vh - 30px)';
        }
    }, timeout);
};

function StudioNavBar() {
    
    useEffect(() => {
        adjustSanityStudioHeight(0);
        adjustSanityStudioHeight(500);
        adjustSanityStudioHeight(1000);
        adjustSanityStudioHeight(5000);
    }, []);

    return (
        <div className={styles.navbar}>
            <a href="http://localhost:3000/studio" className={`${styles.link} ${styles.active}`}>Produktkatalog</a>
            <a href="http://localhost:3001/studio" className={styles.link}>Demo app</a>
        </div>
    );
}

export default StudioNavBar;