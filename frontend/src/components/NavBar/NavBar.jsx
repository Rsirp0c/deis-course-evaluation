/* eslint-disable react/prop-types */
import { Link, useLocation, useNavigate } from 'react-router-dom';
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
import storeLikedCourses from '../../services/storeLikedCourse';

/**
 * NavBar sub components 
 * TO DO: implement advanced search function, dropdown menu when user types in search bar
 * */
function SearchBar() {
	const [text, setText] = useState("");
	const navigate = useNavigate();
	function handleOnChange(event) {
		setText(event.target.value);
	}
	function handleSubmit(event) {
		event.preventDefault();
		navigate(`/search?course=${text}`);
	}
  return (
    <form action="" className={styles.searchBar}>
      <input type="text" className={styles.searchInput} onChange={handleOnChange} placeholder="Search" />
      <button type="submit" className={styles.searchButton} onClick={handleSubmit}><GoSearch className={styles.searchIcon} /></button>
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
      <div className={styles.divider} />
      <button type="button" className={styles.navButton} onClick={handleOnClick}><AiOutlineUser className={styles.profileIcon} /></button>
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
  const [formEmail, setFormEmail] = useState('');
  const [formPassword, setFormPassword] = useState('');
  const [error, setError] = useState('');


  const { authState, loggingInState, idState, nameState } = useContext(UserContext);
  const [authenticated, setAuthenticated] = authState;
  const auth = localStorage.getItem('authenticated');
  const [loggingIn, setLoggingIn] = loggingInState;
  const [name, setName] = nameState;
  const [id, setId] = idState;

  const renderLoginRegister = loggingIn || registering;
  // pathIsHome is true if the current path is the home page, this is for conditionally rendering the main search bar
  const pathIsHome = location.pathname === '/';
  const loading = location.pathname === '/loading';

  function handleOnClick() {
    setClicked(!clicked);
  }

  function handleLogout() {
    localStorage.removeItem('userInfo');
    localStorage.removeItem('jwt');
	localStorage.removeItem('authenticated');
	storeLikedCourses(id)
    setAuthenticated(false);
	setName(null);
	
  }

  function handleSwitch() {
    if (loggingIn) {
      setLoggingIn(false);
      setRegistering(true);
    } else {
      setLoggingIn(true);
      setRegistering(false);
    }
    setError('');
    setFormEmail('');
    setFormPassword('');
  }

  function handleLogin() {
	setLoggingIn(true);
	setRegistering(false);
  }

  function handleRegister() {
	setRegistering(true);
	setLoggingIn(false);
  }

  let navStyle;
  let loginButtonStyle;
  let registerButtonStyle;

  // If the current path is the home page, render the main navbar, else render the normal navbar
  // If the page is loading, hide navbar
  if (loading) {
	navStyle = styles.none;
  }else if (pathIsHome) {
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
      {renderLoginRegister && 
	  	<AuthPopup 
	  		setLoggingIn={setLoggingIn} 
	  		loggingIn={loggingIn} 
	  		setRegistering={setRegistering} 
	  		registering={registering} 
			handleSwitch={handleSwitch}
			error={error}
			setError={setError}
			formEmail={formEmail}
			setFormEmail={setFormEmail}
			formPassword={formPassword}
			setFormPassword={setFormPassword}

	 />}
      {clicked && <ProfileDropdown handleLogout={handleLogout} handleOnClick={handleOnClick} />}

      <nav className={navStyle}>
        {!pathIsHome && <SearchBar />}
        <Link to="/" className={styles.linkLogo}>
          <Logo />
        </Link>
        {auth
          ? <LoggedInLinks handleOnClick={handleOnClick} />
          : (
            <LoggedOutLinks
              handleLogin={handleLogin}
              handleRegister={handleRegister}
              loginButtonStyle={loginButtonStyle}
              registerButtonStyle={registerButtonStyle}
            />
          )}
        {/* <Link to="/" className={styles.link}><HiLanguage className={styles.languageIcon} /></Link> */}
      </nav>
    </>
  );
}
