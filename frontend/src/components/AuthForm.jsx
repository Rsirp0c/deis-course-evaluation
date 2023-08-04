/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */


import { useState, useContext } from "react";
import { UserContext } from "../contexts/userContext";
import styles from './AuthForm.module.css'



export default function AuthForm({ loggingIn, handleClosePopup }) {

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const { nameState, idState, authState } = useContext(UserContext);
	const [name, setName] = nameState;
	const [id, setId] = idState;
	const [authenticated, setAuthenticated] = authState;

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

		loggingIn ? URL += "login" : URL += "register";


		// use userContext to store usename and id and email 
		fetch(URL, options)
			.then(res => res.json())
			.then(data => {
				const { username, id, token } = data.userJSON;
				console.log({ username, id, token })

				if (username) setName(username);
				if (token) {
					setId(id);
					setAuthenticated(true);
					const userInfo = {
						username: username,
						id: id,
					}
					localStorage.setItem('userInfo', userInfo)
					localStorage.setItem('jwt', token);
					// console.log("jwt stored", data);
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