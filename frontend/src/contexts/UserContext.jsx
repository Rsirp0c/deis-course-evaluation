/* eslint-disable react/prop-types */
import { createContext, } from "react";
import { setJWT, checkLogin } from '../utils/auth.js';
import { useEffect, useState } from "react";

export const UserContext = createContext(null);

export default function UserProvider({ children }) {

	const [error, setError] = useState(false);
	const [authenticated, setAuthenticated] = useState(false);
	const [name, setName] = useState("")

	useEffect(() => {

		setJWT()
			.then((success) => {
				if (success === false) {
					setError(true)
				}
			})
		if (!authenticated) {
			const response = checkLogin()
			if (response) {
				setAuthenticated(true)
				setName("")
				console.log({ response })
			}
		}

	}, [authenticated]);


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
		<UserContext.Provider value={[name, authenticated]}>
			{children}
		</UserContext.Provider>
	)
}