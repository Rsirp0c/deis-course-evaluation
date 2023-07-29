
/**
 * this function will get the JWT from the backend and store it in local storage
 */
export async function getJWT(code) {
	// Parse authorization code from the URL 
	fetch('http://localhost:3000/auth/oauth/google', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ code }),
	})
		.then((response) => {
			if (!response.ok) {
				throw new Error(`Unable to retrieve JWT from server status: ${response.status}`);
			} else {
				return response.json()
			}
		})
		.then((data) => {
			const { token } = data
			window.location.href = window.location.pathname;
			localStorage.setItem('jwt', token);
			return true
		})
		.catch((error) => {
			return error.toString()
		});


}