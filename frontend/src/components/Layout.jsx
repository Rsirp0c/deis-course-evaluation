import NavBar from "./NavBar.jsx"
import Footer from "./Footer.jsx"
import { Outlet } from 'react-router-dom'



export default function Layout() {
	return (
		<>
			<NavBar />
			<main>
				<Outlet />
			</main>
			<Footer />
		</>
	);
}

