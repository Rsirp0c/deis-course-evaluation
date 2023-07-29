import jwt from 'jsonwebtoken';
import axios from 'axios';
import qs from 'qs';
import User from '../models/user';

async function getGoogleOAuthTokens(code) {
	const url = 'https://oauth2.googleapis.com/token';
	const values = {
		code: code,
		client_id: process.env.GOOGLE_CLIENT_ID,
		client_secret: process.env.GOOGLE_CLIENT_SECRET,
		redirect_uri: process.env.GOOGLE_OAUTH_REDIRECT_URI,
		grant_type: 'authorization_code'
	};


	try {
		const options = {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            }
          };
      
        const response = await axios.post(url, qs.stringify(values), options);
        const data = response.data;
        return data;
	} catch (err) {
		console.log(err);
        throw new Error('Failed to fetch Google OAuth tokens');
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
		const body = {
			name: { first: userData.given_name, last: userData.family_name },
      		email: userData.data.email,
      		provider: 'google',
		}
		await User.createAndUpdateUser(body);
		return userData;

	} catch (err) {
		console.log(err);
	}
}




export async function googleOauthHandler(req, res) {
    try {
	const code = req.body.code;

	const { id_token, access_token } = await getGoogleOAuthTokens(code);

	const googleUser = await getAndSaveGoogleUser({ id_token, access_token });
    console.log({ googleUser });
	if (!googleUser.verified_email) {
		return res.status(403).json({ message: 'Google account is not verified' });
	}

	const token = jwt.encode(body);
	return res.status(200).json({ 
		sucess: true,
		token: token
	 })
    } catch (err) {
        console.log(err);
        res.status(500).json({ 
			success: false,
			message: 'Internal server error' 
		});
    }
}