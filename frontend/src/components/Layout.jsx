import NavBar from "./NavBar.jsx"
import Footer from "./Footer.jsx"
import { Outlet } from 'react-router-dom'
import styles from './Layout.module.css'


export default function Layout() {


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

