import { Link } from 'react-router-dom';
import getGoogleUrl from '../utils/getGoogleUrl';
import styles from './NavBar.module.css';

import { HiLanguage } from 'react-icons/hi2';
import { GoSearch } from 'react-icons/go';
export default function NavBar() {
	return (
		<>

			<nav className={styles.navBar}>
				<form action="" method="GET" className={styles.searchBar}>
					<input type="text" className={styles.searchInput} placeholder="Search" />
					<button type="submit" className={styles.searchButton}><GoSearch className={styles.searchIcon} /></button>
				</form>
				<Link to="/" className={styles.linkLogo}>Logo</Link>
				<Link to={getGoogleUrl()} className={styles.link}>Login</Link>
				<Link to="/register" className={styles.linkRegister}>Register</Link>
				<Link to="" className={styles.link}><HiLanguage className={styles.languageIcon} /></Link>
			</nav>
		</>
	)
}