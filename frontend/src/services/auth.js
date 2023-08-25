
const process = import.meta.env;

/**
 * this function will get the JWT from the backend and store it in local storage
 */
export async function setJWT() {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    if (code) {
        // Parse authorization code from the URL
        fetch(`${process.BASE_URL}auth/oauth/google`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ code }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(
                        `Unable to retrieve JWT from server status: ${response.status}`,
                    );
                } else {
                    return response.json();
                }
            })
            .then((data) => {
                const { token } = data;
                window.location.href = window.location.pathname;
                localStorage.setItem('jwt', token);
                // TO DO: use useContext to set the user state
            })
            .catch(() => false);
    }
}

export async function validateJWT() {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
        // using await here instead of .then() because we want to pause the execution of the function until we get a response from the server
        // To Do: add a try catch block here
        const response = await fetch(`${process.BASE_URL}auth/validate`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${jwt}`,
            },
        });
        if (response.ok) {
            return true;
        }
    }
    return false;
}
