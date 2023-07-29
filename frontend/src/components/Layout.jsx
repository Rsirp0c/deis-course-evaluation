import NavBar from "./NavBar.jsx"
import Footer from "./Footer.jsx"
import { Outlet } from 'react-router-dom'
import styles from './Layout.module.css'
import { useEffect, useState } from 'react';
import { getJWT } from '../utils/auth.js';


export default function Layout() {

	const [error, setError] = useState(false);

	useEffect(() => {
		const urlParams = new URLSearchParams(window.location.search);
		const code = urlParams.get('code');
		if (code) {
			// setLoading(true);
			getJWT(code)
				.then((result) => {
					console.log(result);
					if (result) {
						// setLoading(false);
					} else {
						setError(true);
					}
				})
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
		<>
			<NavBar />
			<main className={styles.main}>
				<Outlet />
			</main>
			<Footer />
		</>
	);
}

