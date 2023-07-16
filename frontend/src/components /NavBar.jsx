import { Link } from 'react-router-dom';
import getGoogleUrl from '../utils/getGoogleUrl';

export default function NavBar() {
	return (
		<>
			<nav>
				<Link to="/">Home</Link>
				<Link to={getGoogleUrl()}>Login</Link>
			</nav>
		</>
	)
}