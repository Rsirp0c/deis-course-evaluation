/* eslint-disable react/prop-types */
import styles from './LoginRegisterPopup.module.css';

import getGoogleUrl from '../utils/getGoogleUrl';
import { FcGoogle } from 'react-icons/fc';
import { HiOutlineXMark } from 'react-icons/hi2';
import { useNavigate } from 'react-router-dom';
import AuthForm from './AuthForm.jsx';

// This is the login and register popup, which shows login or user depending on which button is clicked
export default function Test({ authType }) {

	const navigate = useNavigate();



	let containerStyle;
	let title;
	let bottomText;

	function handleSwitch() {
		if (authType === "login") {
			navigate('/register');
		} else {
			navigate('/login');
		}
	}

	function handleClosePopup() {
		navigate(-1) || navigate('/');
	}

	// modifies the popup component depending on whether it is login or register
	if (authType === "login") {
		// setComponent = setLogginIn;
		containerStyle = styles.loginContainer;
		title = <p className={styles.loginTitle}>Login to Deis Evaluation</p>
		bottomText = <p className={styles.loginText}>{"Don't have an account?"} <button className={styles.switchButton} onClick={handleSwitch}>Sign up</button></p>
	} else {
		// setComponent = setRegistering;
		containerStyle = styles.registerContainer;
		title =
			<>
				<p className={styles.loginTitle}>Create your account</p>
				<p className={styles.description}>Access exclusive rating & review about your courses, and more.</p>
			</>
		bottomText = <p className={styles.loginText}>{"Already have an account?"} <button className={styles.switchButton} onClick={handleSwitch}>Login</button></p>
	}

	function Title() {
		return title;
	}

	function BottomText() {
		return bottomText;
	}

	return (
		<>
			<div className={styles.background} onClick={() => handleClosePopup()}>
				<div className={containerStyle} onClick={(event) => event.stopPropagation()} >	{/*event stopPropagation prevents clicking on the root div from closing the popup*/}
					<div className={styles.loginContent}>
						<HiOutlineXMark className={styles.closeIcon} onClick={() => handleClosePopup()} />
						<Title />
						<AuthForm authType={authType} handleClosePopup={() => handleClosePopup()} />
						<div className={styles.divider}>
							<div className={styles.dividerLine}></div>
							<p className={styles.dividerText}>or</p>
							<div className={styles.dividerLine}></div>
						</div>
						<a href={getGoogleUrl()} className={styles.googleButton}>
							<FcGoogle className={styles.googleIcon} />
							Continue with Google
						</a>
						<BottomText />

					</div>
				</div>
			</div>
		</>
	)
}
