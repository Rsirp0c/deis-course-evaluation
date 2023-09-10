/* eslint-disable no-unused-vars */
import { useEffect, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { setJWT } from '../../services/auth.js';
import { UserContext } from '../../contexts/UserContext.jsx';
import styles from './loading.module.css';

export default function Loading() {
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);
    const { nameState, idState, authState, emailState } =
        useContext(UserContext);
    const [name, setName] = nameState;
    const [id, setId] = idState;
    const [authenticated, setAuthenticated] = authState;
    const [email, setEmail] = emailState;
    const navigate = useNavigate();

    useEffect(() => {
        setJWT(setName, setId, setEmail, setAuthenticated).then((success) => {
            if (success === false) {
                setError(true);
            }
            setTimeout(() => {
                navigate('/');
            }, 5000);
        });
    }, [loading]);

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
        <>
            <div className={styles.loadingText}>Loggin In ....</div>
            <div className={styles.loadingMessage}>
                Currently on the free tier of render, so it might take a couple
                minutes for the server to load
            </div>
        </>
    );
}
