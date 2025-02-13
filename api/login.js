import fs from 'fs';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { username, password } = req.body;
        const accountData = JSON.parse(fs.readFileSync('./data/account.json', 'utf-8'));

        const account = accountData.find(acc => acc.username === username && acc.password === password);
        if (account) {
            return res.status(200).json({ success: true });
        } else {
            return res.status(401).json({ success: false });
        }
    } else {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }
}
