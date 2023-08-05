/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import styles from './ProfileDropdown.module.css';
import { useContext } from "react";
import { UserContext } from "../../contexts/userContext.jsx";
import { Link } from "react-router-dom"

export default function ProfileDropdown({ handleLogout }) {

	const { emailState, nameState } = useContext(UserContext)
	const [email, setEmail] = emailState
	const [name, setName] = nameState

	return (
		<>
			<div className={styles.container}>
				<div className={styles.content}>
					<p className={styles.title}>
						{name ? `Welcome ${name}!` : "Welcome!"}
					</p>
					<p className={styles.email}>
						{email} email
					</p>
					<div className={styles.links}>
						<Link className={styles.link}><span className={styles.text}>My Saved Courses</span></Link>
						<Link className={styles.link}><span className={styles.text}>My Profile</span></Link>
					</div>
					<button to="/" className={styles.signout} onClick={handleLogout}><span className={styles.text}>Sign Out</span></button>
				</div>
			</div>
		</>
	)
}