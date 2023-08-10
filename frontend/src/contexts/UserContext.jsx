/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from 'react';
import { setJWT, validateJWT } from '../utils/auth.js';

export const UserContext = createContext(null);

export default function UserProvider({ children }) {
    const [error, setError] = useState(false);
    const [authenticated, setAuthenticated] = useState(false);
    const [id, setId] = useState(null);
    const [name, setName] = useState(null);
    const [email, setEmail] = useState(null);
    const [loggingIn, setLoggingIn] = useState(false); // state for login popup, use this when user clicks on login button or functionalities that require login
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setJWT().then((success) => {
            if (success === false) {
                setError(true);
            }
        });
        validateJWT()
            .then((validated) => {
                // retrieve info from localstorage is user is already authenticated to persist login accross page refreshes
                if (validated) {
                    // TO DO: parse localstorage data correctly
                    const userInfo = JSON.parse(
                        localStorage.getItem('userInfo'),
                    );
                    const { username } = userInfo;
                    const { id } = userInfo;
                    const { email } = userInfo;
                    setName(username);
                    setId(id);
                    setEmail(email);
                    setAuthenticated(true);
                } else {
                    setAuthenticated(false);
                }
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setError(true);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return;
    }

    if (error) {
        return (
            <div style={{ width: '100%', height: '100vh' }}>
                <p style={{ marginTop: '100px', textAlign: 'center' }}>
                    Oops login request unsuccessful :( check console for more
                    info
                </p>
            </div>
        );
    }

    return (
        <UserContext.Provider
            value={{
                nameState: [name, setName],
                authState: [authenticated, setAuthenticated],
                idState: [id, setId],
                emailState: [email, setEmail],
                loggingInState: [loggingIn, setLoggingIn],
            }}
        >
            {children}
        </UserContext.Provider>
    );
}
