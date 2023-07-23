import NavBar from "./components/NavBar.jsx"
import { Outlet } from 'react-router-dom'


function App() {
	return (
		<>

			<NavBar />
			<main>
				<Outlet />
			</main>
			<footer>
				<p>© 2023</p>
			</footer>

		</>
	);
}

export default App;
