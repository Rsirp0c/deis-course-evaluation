import { BiEdit } from 'react-icons/bi';
import styles from './Logo.module.css';

export default function Logo() {
    return (
        <>
            <BiEdit className={styles.logoIcon} />
            <span className={styles.logoText}>
                Deis
                <span className={styles.logoTextBold}>Evaluation</span>
            </span>
        </>
    );
}
