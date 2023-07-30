/* eslint-disable react/prop-types */


import { useState } from "react";
import styles from './AuthForm.module.css'



export default function AuthForm({ logginIn, handleClosePopup }) {

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	// const [error, setError] = useState(false);

	// form handlers
	function handleFormSubmit(event) {
		event.preventDefault();
		let URL = "http://localhost:3000/auth/"

		console.log({ email, password });
		const options = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ email: email, password: password })
		}

		logginIn ? URL += "login" : URL += "register";

		fetch(URL, options)
			.then(response => response.json())
			.then(data => {
				const { jwt } = data;
				if (jwt) {
					localStorage.setItem('jwt', jwt);
					console.log("jwt stored", data);
					handleClosePopup();
				} else {
					console.log("error", data);
					// setError(true); 		// TODO: display error message and proper error handling 
				}
			})
			.catch(error => {
				console.log({ error });
			})
	}
	function handleEmailChange(e) {
		setEmail(e.target.value);
	}

	function handlePasswordChange(e) {
		setPassword(e.target.value);
	}

	return (
		<>
			<form className={styles.form} onSubmit={handleFormSubmit}>
				<div className={styles.inputContainer}>
					<label>Email</label>
					<input type="text" className={styles.loginInput} placeholder="Email" value={email} onChange={handleEmailChange} />
				</div>
				<div className={styles.inputContainer}>
					<label>Password</label>
					<input type="password" className={styles.loginInput} placeholder="Password" value={password} onChange={handlePasswordChange} />
				</div>
				<button type="submit" className={styles.loginButton}>Continue</button>
			</form>
		</>
	)
}