import NavBar from "./components/NavBar.jsx"
import Footer from "./components/Footer.jsx"
import { Outlet } from 'react-router-dom'



export default function App() {
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

