import styles from './Logo.module.css';

import { BiEdit } from 'react-icons/bi';

export default function Logo() {
	return (
		<>
			<BiEdit className={styles.logoIcon} />
			<span className={styles.logoText}>Deis <span className={styles.logoTextBold}>Evaluation</span></span>
		</>
	)
}