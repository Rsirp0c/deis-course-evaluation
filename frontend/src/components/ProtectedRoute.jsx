import { useNavigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { UserContext } from '../contexts/UserContext';

export default function ProtectedRoute({ children }) {
    const { loggingInState } = useContext(UserContext);
    const [loggingIn, setLoggingIn] = loggingInState;
    const navigate = useNavigate();

	const authenticated = localStorage.getItem('authenticated');
	
    useEffect(() => {
        if (!authenticated) {
            setLoggingIn(true);
            navigate('/');
        }
    }, [authenticated]);

    return children;
}
