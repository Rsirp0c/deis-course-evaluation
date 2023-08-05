/* eslint-disable react/prop-types */
import { Link, useLocation } from 'react-router-dom';
import styles from './NavBar.module.css';
import { useState, useContext } from "react";
import { UserContext } from "../../contexts/userContext";
// icon imports
import { HiLanguage } from 'react-icons/hi2';
import { GoSearch } from 'react-icons/go';
import { AiOutlineUser } from 'react-icons/ai';
import Logo from '../Logo';
import AuthPopup from './AuthPopup';

/**
 * NavBar sub components 
 * */
function SearchBar() {
	return (
		<form action="" className={styles.searchBar}>
			<input type="text" className={styles.searchInput} placeholder="Search" />
			<button type="submit" className={styles.searchButton}><GoSearch className={styles.searchIcon} /></button>
		</form>
	)
}
// set the state of the login popup to true, which shows the popup
function LoggedOutLinks({ handleLogin, handleRegister }) {
	return (
		<>
			<button className={styles.loginButton} onClick={handleLogin}>Login</button>
			<button className={styles.registerButton} onClick={handleRegister}>Register</button>
		</>
	)
}

function LoggedInLinks({ handleLogout }) {
	return (
		<>
			<Link to="" className={styles.link}><AiOutlineUser className={styles.profileIcon} /></Link>
			<Link to="/" className={styles.link} onClick={handleLogout}>Logout</Link>
		</>
	)
}

/**
 * NavBar component
 * */
export default function NavBar() {
	const location = useLocation();
	// const [loggingIn, setLoggingIn] = useState(false);
	const [registering, setRegistering] = useState(false);
	const { authState, loggingInState } = useContext(UserContext);
	const [authenticated, setAuthenticated] = authState;
	const [loggingIn, setLoggingIn] = loggingInState;

	const renderLoginRegister = loggingIn || registering;
	// pathIsHome is true if the current path is the home page, this is for conditionally rendering the main search bar 
	const pathIsHome = location.pathname === "/";


	function handleLogin() {
		setLoggingIn(true);
	}

	function handleLogout() {
		localStorage.removeItem('userInfo');
		localStorage.removeItem('jwt');
		setAuthenticated(false);
	}

	function handleRegister() {
		setRegistering(true);
	}

	return (
		<>
			{renderLoginRegister && <AuthPopup setLoggingIn={setLoggingIn} loggingIn={loggingIn} setRegistering={setRegistering} registering={registering} />}
			<nav className={styles.navBar}>
				{!pathIsHome && <SearchBar />}
				<Link to="/" className={styles.linkLogo}>
					<Logo />
				</Link>
				<Link to="/rating-form" className={styles.link}>Rate a course</Link>
				{authenticated ? <LoggedInLinks handleLogout={handleLogout} /> : <LoggedOutLinks handleLogin={handleLogin} handelRegister={handleRegister} />}
				<Link to="" className={styles.link}><HiLanguage className={styles.languageIcon} /></Link>
			</nav>
		</>
	)
}