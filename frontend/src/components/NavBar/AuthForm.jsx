/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext.jsx';
import styles from './AuthForm.module.css';

export default function AuthForm(props) {
  const {
    loggingIn,
    error,
    setError,
    formEmail,
    setFormEmail,
    formPassword,
    setFormPassword,
    handleClosePopup,
  } = props;

  const {
    nameState, idState, authState, emailState,
  } = useContext(UserContext);
  const [name, setName] = nameState;
  const [id, setId] = idState;
  const [authenticated, setAuthenticated] = authState;
  const [email, setEmail] = emailState;
  const process = import.meta.env;

  // form handlers
  function handleFormSubmit(event) {
    event.preventDefault();
    let URL = `${process.VITE_BASE_URL}auth/`;

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: formEmail, password: formPassword }),
    };

    loggingIn ? URL += 'login' : URL += 'register';

    // use userContext to store usename and id and email
    fetch(URL, {
      method: "POST",
      headers: {
		"Content-Type": "application/json"
      },
      body: JSON.stringify({ email: formEmail, password: formPassword }),
    })
      .then(async (res) => {
        const response = await res.json();
        if (res.ok) {
          return response;
        }
        throw response;
      })
      .then((data) => {
        const {
          username, id, email, token,
        } = data.userJSON;
        // set context variable here for global access
        if (username) setName(username);
        setId(id);
        setEmail(email);
        setAuthenticated(true);
        const userInfo = {
          username,
          id,
          email,
        };
        // then store in localStorage to persist data accross page refresh
        localStorage.setItem('userInfo', JSON.stringify(userInfo));
        localStorage.setItem('jwt', token);
        handleClosePopup();
      })
      .catch((er) => {
        const { error } = er;
        setError(error);
      });
  }

  function handleEmailChange(e) {
    setFormEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setFormPassword(e.target.value);
  }

  return (
    <form className={styles.form} onSubmit={handleFormSubmit}>
      <div className={styles.inputContainer}>
        <label>Email </label>
        <input type="text" className={styles.loginInput} placeholder="Email" value={formEmail} onChange={handleEmailChange} />
      </div>
      <div className={styles.inputContainer}>
        <label>Password</label>
        <input type="password" className={styles.loginInput} placeholder="Password" value={formPassword} onChange={handlePasswordChange} />
      </div>
      {error !== '' && <p className={styles.error}>{error}</p>}
      <button type="submit" className={styles.loginButton}>Continue</button>
    </form>
  );
}
