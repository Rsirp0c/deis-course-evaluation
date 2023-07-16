
import NavBar from "./NavBar.jsx"
// eslint-disable-next-line react/prop-types
export default function Layout({ children }) {
	return (
		<>
			<NavBar />
			<main>

				{children}
			</main>
			<footer>
				<p>© 2023</p>
			</footer>
		</>
	)
}