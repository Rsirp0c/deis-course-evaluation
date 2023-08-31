/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from 'react';
import { setJWT, validateJWT } from '../services/auth.js';
import fetchLikedCourses from '../services/fetchLikedCourses.js';


export const UserContext = createContext(null);
/**
 * This sets thhe global state for user info
 * TO DO: split up api calls and context into separate files
 * @param {*} param0
 * @returns UserContext.Provider component
 */
export default function UserProvider({ children }) {
    const [error, setError] = useState(false);
    const [authenticated, setAuthenticated] = useState(false);
    const [id, setId] = useState(null);
    const [name, setName] = useState(null);
    const [email, setEmail] = useState(null);
	// should i store liked courses ids in local storage or in userContext
	// const [likedCoursesIds, setLikedCoursesIds] = useState([])
    const [loggingIn, setLoggingIn] = useState(false); // state for login popup, use this when user clicks on login button or functionalities that require login
    const [loading, setLoading] = useState(true);


	useEffect(() => {
		if (authenticated) {
			fetchLikedCourses(id)
			console.log('fetching liked courses')
		}
	}, [authenticated])

    useEffect(() => {
        // setJWT(setName, setId, setEmail, setAuthenticated).then((success) => {
        //     if (success === false) {
        //         setError(true);
        //     }
        // });
        validateJWT()
            .then((validated) => {
				const userInfo = JSON.parse(
					localStorage.getItem('userInfo'),
				);
                // retrieve info from localstorage is user is already authenticated to persist login accross page refreshes
                if (validated && userInfo) {
                    // TO DO: parse localstorage data correctly
                    const { name } = userInfo;
                    const { id } = userInfo;
                    const { email } = userInfo;
                    setName(name);
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


	
    // if (loading) {
    //     return (
	// 		<div style={{ width: '100%', height: '100vh' }}>
	// 			<p style={{ marginTop: '100px', textAlign: 'center' }}>
	// 				Loading...
	// 			</p>
	// 		</div>
	// 	);
    // }

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
