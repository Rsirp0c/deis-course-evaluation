/* eslint-disable react/prop-types */
import { Link, useLocation } from 'react-router-dom';
import { useState, useContext } from 'react';
import { UserContext } from '../contexts/userContext';
import styles from './NavBar.module.css';

// icon imports
import { HiLanguage } from 'react-icons/hi2';
import { GoSearch } from 'react-icons/go';

import Logo from './Logo';
import LoginRegisterPopup from './LoginRegisterPopup';

function SearchBar() {
	return (
		<form action="" className={styles.searchBar}>
			<input type="text" className={styles.searchInput} placeholder="Search" />
			<button type="submit" className={styles.searchButton}><GoSearch className={styles.searchIcon} /></button>
		</form>
	)
}

export default function NavBar() {
	const user = useContext(UserContext);
	const location = useLocation();
	const [logginIn, setLogginIn] = useState(false);
	const [registering, setRegistering] = useState(false);

	// set the state of the login popup to true, which shows the popup
	function handleLogin() {
		setLogginIn(true);
	}

	function handleRegister() {
		setRegistering(true);
	}

	const renderLoginRegister = logginIn || registering;
	const pathIsHome = location.pathname === "/";

	return (
		<>
			{renderLoginRegister && <LoginRegisterPopup setLogginIn={setLogginIn} logginIn={logginIn} setRegistering={setRegistering} registering={registering} />}
			<nav className={styles.navBar}>
				{!pathIsHome && <SearchBar />}
				<Link to="/" className={styles.linkLogo}>
					<Logo />
				</Link>
				<Link to="/rating-form" className={styles.link}>Rate a course</Link>
				<button className={styles.loginButton} onClick={handleLogin}>Login</button>
				<button className={styles.registerButton} onClick={handleRegister}>Register</button>
				<Link to="" className={styles.link}><HiLanguage className={styles.languageIcon} /></Link>
			</nav>
		</>
	)
}