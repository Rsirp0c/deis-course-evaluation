import NavBar from "./NavBar.jsx"
import Footer from "./Footer.jsx"
import { Outlet } from 'react-router-dom'
import styles from './Layout.module.css'
import { useEffect, useState } from 'react';
import { setJWT, checkLogin } from '../utils/auth.js';


export default function Layout() {

	const [error, setError] = useState(false);

	useEffect(() => {
		setJWT(setError)
		checkLogin()
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

