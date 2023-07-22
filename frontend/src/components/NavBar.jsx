import { Link } from 'react-router-dom';
import getGoogleUrl from '../utils/getGoogleUrl';
import styles from './NavBar.module.css';

export default function NavBar() {
	return (
		<>
			<nav className={styles.navBar}>
				<Link to="/" className={styles.link}>Logo</Link>
				<Link to={getGoogleUrl()} className={styles.link}>Login</Link>
			</nav>
		</>
	)
}