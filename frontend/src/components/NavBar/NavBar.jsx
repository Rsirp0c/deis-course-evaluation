/* eslint-disable react/prop-types */
import { Link, useLocation } from 'react-router-dom';
import { useState, useContext } from 'react';
// icon imports
import { HiLanguage } from 'react-icons/hi2';
import { GoSearch } from 'react-icons/go';
import { AiOutlineUser } from 'react-icons/ai';
import { UserContext } from '../../contexts/UserContext';
import styles from './NavBar.module.css';
// component imports
import Logo from '../Logo';
import AuthPopup from './AuthPopup';
import ProfileDropdown from './ProfileDropdown';

/**
 * NavBar sub components
 * */
function SearchBar() {
  return (
    <form action="" className={styles.searchBar}>
      <input type="text" className={styles.searchInput} placeholder="Search" />
      <button type="submit" className={styles.searchButton}><GoSearch className={styles.searchIcon} /></button>
    </form>
  );
}
// set the state of the login popup to true, which shows the popup
function LoggedOutLinks({
  handleLogin, handleRegister, loginButtonStyle, registerButtonStyle,
}) {
  return (
    <>
      <button type="button" className={loginButtonStyle} onClick={handleLogin}>Log in</button>
      <button type="button" className={registerButtonStyle} onClick={handleRegister}>Register</button>
    </>
  );
}

function LoggedInLinks({ handleOnClick }) {
  return (
    <>
      <button type="button" className={styles.navButton} onClick={handleOnClick}><AiOutlineUser className={styles.profileIcon} /></button>
      <div className={styles.divider} />
    </>
  );
}

/**
 * NavBar component
 * */
export default function NavBar() {
  const location = useLocation();
  const [registering, setRegistering] = useState(false);
  const [clicked, setClicked] = useState(false);

  const { authState, loggingInState, idState} = useContext(UserContext);
  const [authenticated, setAuthenticated] = authState;
  const [loggingIn, setLoggingIn] = loggingInState;
  const [id, setId] = idState;

  const renderLoginRegister = loggingIn || registering;
  // pathIsHome is true if the current path is the home page, this is for conditionally rendering the main search bar
  const pathIsHome = location.pathname === '/';

  function handleOnClick() {
    setClicked(!clicked);
  }

  function handleLogin() {
    setLoggingIn(true);
  }

  function handleLogout() {
    localStorage.removeItem('userInfo');
    localStorage.removeItem('jwt');
	const likedCoursesIds = JSON.parse(localStorage.getItem('likedCourses'));
	fetch('http://localhost:3000/api/liked-courses/add', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			likedCoursesIds,
			userId: id,
		}),
	}).then((res) => res.json()).then((res) => {
		if (!res.error) {
			console.log(res);
			localStorage.removeItem('likedCourses');
		} else {
			console.log(res.error);
		}
	}).catch((err) => {
		console.log(err);
	});
    setAuthenticated(false);
	
  }

  function handleRegister() {
    setRegistering(true);
  }

  let navStyle;
  let loginButtonStyle;
  let registerButtonStyle;

  if (pathIsHome) {
    navStyle = styles.navBarMain;
    loginButtonStyle = styles.loginButtonMain;
    registerButtonStyle = styles.registerButtonMain;
  } else {
    navStyle = styles.navBar;
    loginButtonStyle = styles.loginButton;
    registerButtonStyle = styles.registerButton;
  }

  return (
    <>
      {/* conditionally render popup components login/register and profile dropdown */}
      {renderLoginRegister && <AuthPopup setLoggingIn={setLoggingIn} loggingIn={loggingIn} setRegistering={setRegistering} registering={registering} />}
      {clicked && <ProfileDropdown handleLogout={handleLogout} handleOnClick={handleOnClick} />}

      <nav className={navStyle}>
        {!pathIsHome && <SearchBar />}
        <Link to="/" className={styles.linkLogo}>
          <Logo />
        </Link>
        {authenticated
          ? <LoggedInLinks handleOnClick={handleOnClick} />
          : (
            <LoggedOutLinks
              handleLogin={handleLogin}
              handleRegister={handleRegister}
              loginButtonStyle={loginButtonStyle}
              registerButtonStyle={registerButtonStyle}
            />
          )}
        <Link to="/" className={styles.link}><HiLanguage className={styles.languageIcon} /></Link>
      </nav>
    </>
  );
}
