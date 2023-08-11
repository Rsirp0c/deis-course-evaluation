import { useNavigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { UserContext } from '../contexts/UserContext';

export default function ProtectedRoute({ children }) {
    const { authState, loggingInState } = useContext(UserContext);
    const [authenticated, setAuthenticated] = authState;
    // const [loggingIn, setLoggingIn] = loggingInState;
    const navigate = useNavigate();

    useEffect(() => {
        if (!authenticated) {
            // setLoggingIn(true);
            navigate('/');
        }
    }, [authenticated]);
    return children;
}
