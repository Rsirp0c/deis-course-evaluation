/* eslint-disable react/prop-types */
import { createContext, } from "react";
import { setJWT, validateJWT } from '../utils/auth.js';
import { useEffect, useState } from "react";
export const UserContext = createContext(null);

export default function UserProvider({ children }) {

	const [error, setError] = useState(false);
	const [authenticated, setAuthenticated] = useState(false);
	const [id, setId] = useState(null)
	const [name, setName] = useState(null)
	const [loggingIn, setLoggingIn] = useState(false);

	useEffect(() => {

		setJWT()
			.then((success) => {
				if (success === false) {
					setError(true)
				}
			})
		const validated = validateJWT()
		console.log("validated", validated)
		// retrieve info from localstorage is user is already authenticated to persist login accross page refreshes
		if (validated) {
			console.log("validated")
			const { username, id } = localStorage.getItem('userInfo');
			setName(username);
			setId(id);
			setAuthenticated(true);
		} else {
			console.log("not validated")
			setAuthenticated(false);
		}



	}, []);


	if (error) {
		return (
			<>
				<div style={{ width: '100%', height: '100vh' }}>
					<p style={{ marginTop: '100px', textAlign: 'center' }}>Oops login request unsuccessful :( check console for more info</p>
				</div>
			</>
		)
	}


	return (
		<UserContext.Provider value={
			{
				nameState: [name, setName],
				authState: [authenticated, setAuthenticated],
				idState: [id, setId],
				loggingInState: [loggingIn, setLoggingIn]
			}}>
			{children}
		</UserContext.Provider>
	)
}