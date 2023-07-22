import { Link, useLocation } from 'react-router-dom';
import getGoogleUrl from '../utils/getGoogleUrl';
import styles from './NavBar.module.css';

// icon imports
import { HiLanguage } from 'react-icons/hi2';
import { GoSearch } from 'react-icons/go';



function SearchBar() {
	return (
		<form action="" method="GET" className={styles.searchBar}>
			<input type="text" className={styles.searchInput} placeholder="Search" />
			<button type="submit" className={styles.searchButton}><GoSearch className={styles.searchIcon} /></button>
		</form>
	)
}

function MainSearchBar() {
	return (
		<>
			<div className={styles.mainSearchBarContainer}>
				<form action="" method="GET" className={styles.mainSearchBar}>
					<div className={styles.wrapper}>
						<label>Deparment</label>
						<select name="" className={styles.select} >
							<option value="">Select department</option>
							<option value="">Option 1</option>
							<option value="">Option 2</option>
						</select>
					</div>
					<div className={styles.wrapper}>
						<label>Course</label>
						<select name="" className={styles.select} >
							<option value="">Select course</option>
							<option value="">Option 1</option>
							<option value="">Option 2</option>
						</select>
					</div>
					<div className={styles.wrapper}>
						<label>Semester</label>
						<select name="" className={styles.select} >
							<option value="">Select semester</option>
							<option value="">Option 1</option>
							<option value="">Option 2</option>
						</select>
					</div>

					<button type="submit" className={styles.goButton}>GO</button>
				</form>
			</div>

		</>
	)
}

export default function NavBar() {

	const location = useLocation();
	const excludeNavbarPaths = ["/register"]; // Add paths here where you don't want to show navbar

	if (excludeNavbarPaths.includes(location.pathname)) {
		return null;
	}



	const searchBar = location.pathname === "/" ? <MainSearchBar /> : <SearchBar />;


	return (


		<>

			<nav className={styles.navBar}>
				{searchBar}
				<Link to="/" className={styles.linkLogo}>Logo</Link>
				<Link to={getGoogleUrl()} className={styles.link}>Login</Link>
				<Link to="/register" className={styles.linkRegister}>Register</Link>
				<Link to="" className={styles.link}><HiLanguage className={styles.languageIcon} /></Link>
			</nav>
		</>
	)
}