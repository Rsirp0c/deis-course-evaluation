import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

export default function ProtectedRoute({ children }){
	const { authState, loggingInState } = useContext(UserContext);
	const [authenticated, setAuthenticated] = authState;
	const [loggingIn, setLoggingIn] = loggingInState;
 
	if (authenticated){
		return children;
	}
	setLoggingIn(true);
	return <Navigate to="/" />;
};
