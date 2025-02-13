import { VercelRequest, VercelResponse } from '@vercel/node';

// GitHub OAuth Config
const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_REDIRECT_URI = process.env.GITHUB_REDIRECT_URI || 'https://myapp.vercel.app/api/auth/callback';

export default function handler(req, res) {
    const redirectUrl = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${GITHUB_REDIRECT_URI}`;
    res.redirect(redirectUrl);
}
