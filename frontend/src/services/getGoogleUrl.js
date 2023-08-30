export default function getGoogleUrl() {
    const rootUrl = 'https://accounts.google.com/o/oauth2/v2/auth';

    const process = import.meta.env;

	console.log(process.VITE_GOOGLE_OAUTH_REDIRECT_URI)
	
    const options = {
        redirect_uri: process.VITE_GOOGLE_OAUTH_REDIRECT_URI,
        client_id: process.VITE_GOOGLE_CLIENT_ID,
        access_type: 'offline',
        response_type: 'code',
        prompt: 'consent',
        scope: [
            'https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email',
        ].join(' '),
    };
    const qs = new URLSearchParams(options).toString();

    const url = `${rootUrl}?${qs}`;

    return url;
}
