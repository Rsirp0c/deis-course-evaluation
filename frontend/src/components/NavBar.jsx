import { Link } from 'react-router-dom';
// import getGoogleUrl from '../utils/getGoogleUrl';

export default function NavBar() {
	return (
		<>
			<nav className='navBar'>
				<Link to="/">Logo</Link>
				<Link to="">Login</Link>
			</nav>
		</>
	)
}