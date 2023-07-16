
import NavBar from "./NavBar"
// eslint-disable-next-line react/prop-types
export default function Layout({ children }) {
	return (
		<>
			<header>
				<h1>My App</h1>
			</header>
			<main>
				<NavBar />
				{children}
			</main>
			<footer>
				<p>© 2023</p>
			</footer>
		</>
	)
}