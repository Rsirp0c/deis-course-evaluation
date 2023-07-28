/* eslint-disable react/prop-types */
import { Link, useLocation } from 'react-router-dom';
import getGoogleUrl from '../utils/getGoogleUrl';
import styles from './NavBar.module.css';

// icon imports
import { HiLanguage } from 'react-icons/hi2';
import { GoSearch } from 'react-icons/go';
import Logo from './Logo';

function SearchBar() {
	return (
		<form action="" className={styles.searchBar}>
			<input type="text" className={styles.searchInput} placeholder="Search" />
			<button type="submit" className={styles.searchButton}><GoSearch className={styles.searchIcon} /></button>
		</form>
	)
}


export default function NavBar() {

	const location = useLocation();
	// const excludeNavbarPaths = ["/register"]; // Add paths here where you don't want to show navbar
	// if (excludeNavbarPaths.includes(location.pathname)) {
	// 	return null;
	// }

	const pathIsHome = location.pathname === "/";

	return (
		<>
			<nav className={styles.navBar}>
				{!pathIsHome && <SearchBar />}
				<Link to="/" className={styles.linkLogo}>
					<Logo />
				</Link>
				<Link to="/rating-form" className={styles.link}>Rate a course</Link>
				<Link to={getGoogleUrl()} className={styles.link}>Login</Link>
				<Link to="/register" className={styles.linkRegister}>Register</Link>
				<Link to="" className={styles.link}><HiLanguage className={styles.languageIcon} /></Link>
			</nav>
		</>
	)
}