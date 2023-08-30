import jwt from 'jsonwebtoken';
import axios from 'axios';
import User from '../models/user.js';


async function getGoogleOAuthTokens(code) {
	const url = 'https://oauth2.googleapis.com/token';
	const values = {
		code: code,
		client_id: process.env.GOOGLE_CLIENT_ID,
		client_secret: process.env.GOOGLE_CLIENT_SECRET,
		redirect_uri: process.env.GOOGLE_OAUTH_REDIRECT_URI,
		grant_type: 'authorization_code'
	};
	const queryParams = new URLSearchParams(values).toString();

	//  the token request parameters should be sent in the POST request body. 
	try {
		const options = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			body: queryParams
		}
		const response = await fetch(url, options);

		const data = await response.json();

		return data;
	} catch (err) {
		console.log(err);
	}
}


async function getAndSaveGoogleUser({ id_token, access_token }) {
	try {
		const url = `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`;
		const userData = await axios({
			url,
			method: 'GET',
			headers: {
				Authorization: `Bearer ${id_token}`,
			}
		});
		console.log('userData: ', userData);
		console.log('given: ', userData.data.given_name);
		console.log('family: ', userData.data.family_name);
		const user = {
			name: { first: userData.data.given_name, last: userData.data.family_name },
			email: userData.data.email,
			provider: 'google',
		}
		await User.createAndUpdateUser(user);
		return userData;

	} catch (err) {
		console.log('error: ', { err });
	}
}




export async function googleOauthHandler(req, res) {
	try {
		const code = req.body.code;

		const { id_token, access_token } = await getGoogleOAuthTokens(code);
		const googleUser = await getAndSaveGoogleUser({ id_token, access_token });
		if (!googleUser.data.verified_email) {
			return res.status(403).json({ message: 'Google account is not verified' });
		}
		const user = await User.findOne({ email: googleUser.data.email });
		const userJSON = user.toAuthJSON();
		res.status(200).send({ userJSON });
	} catch (err) {
		console.log(err);
		res.status(500).json({
			success: false,
			message: 'Internal server error'
		});
	}
}