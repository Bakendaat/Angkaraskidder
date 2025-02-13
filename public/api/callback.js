import axios from 'axios';

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;
const GITHUB_REDIRECT_URI = process.env.GITHUB_REDIRECT_URI || 'https://myapp.vercel.app/api/auth/callback';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        const code = req.query.code;

        try {
            // Exchange the code for an access token
            const response = await axios.post('https://github.com/login/oauth/access_token', null, {
                params: {
                    client_id: GITHUB_CLIENT_ID,
                    client_secret: GITHUB_CLIENT_SECRET,
                    code,
                },
                headers: {
                    accept: 'application/json',
                },
            });

            const accessToken = response.data.access_token;

            // Use the access token to get user info from GitHub
            const userResponse = await axios.get('https://api.github.com/user', {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            res.status(200).json({
                message: 'GitHub OAuth successful!',
                user: userResponse.data,
            });
        } catch (error) {
            res.status(500).json({ message: 'Error during OAuth process', error });
        }
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}
