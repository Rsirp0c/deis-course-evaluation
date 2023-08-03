/**
 * this function will get the JWT from the backend and store it in local storage
 */
export async function setJWT() {

	const urlParams = new URLSearchParams(window.location.search);
	const code = urlParams.get('code');
	if (code) {
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
			})
			.catch(() => {
				return false
			});
	}


}

export function validateJWT() {
	const jwt = localStorage.getItem('jwt');
	if (jwt) {
		fetch('http://localhost:3000/auth/validate', {
			method: 'GET',
			headers: {
				'Authorization': `Bearer ${jwt}`,
			},
		})
			.then((response) => {
				if (response.ok) {
					return response.json()
				} else {
					throw new Error(`Unable to authentciate user status: ${response.status}`)
				}
			})
			.then((data) => {
				const { username, id } = data
				return {
					authenticated: true,
					username: username,
					id: id
				}
			})
			.catch(() => {
				return {
					authenticated: false,
					username: null,
					id: null
				}
			});
	}
	return false
}
