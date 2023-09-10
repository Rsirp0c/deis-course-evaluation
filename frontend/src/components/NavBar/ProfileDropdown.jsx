/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import styles from './ProfileDropdown.module.css';
import { UserContext } from '../../contexts/UserContext.jsx';

export default function ProfileDropdown({ handleLogout, handleOnClick }) {
    const { emailState, nameState } = useContext(UserContext);
    const [email, setEmail] = emailState;
    const [name, setName] = nameState;

    return (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
        <div className={styles.background} onClick={handleOnClick}>
            <div className={styles.container}>
                <div className={styles.content}>
                    <p className={styles.title}>
                        {name ? `Welcome ${name}!` : 'Welcome!'}
                    </p>
                    <p className={styles.email}>{email}</p>
                    <div className={styles.links}>
                        <Link to='/saved-courses' className={styles.link}>
                            <span className={styles.text}>
                                My Saved Courses
                            </span>
                        </Link>
                        <Link to='/my-reviews' className={styles.link}>
                            <span className={styles.text}>My reviews</span>
                        </Link>
                    </div>
                    <button
                        to='/'
                        type='button'
                        className={styles.signout}
                        onClick={handleLogout}
                    >
                        <span className={styles.text}>Sign Out</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
