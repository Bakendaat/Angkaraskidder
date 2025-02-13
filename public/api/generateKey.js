import fs from 'fs';

const KEYS_FILE = './data/keys.json';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        const keysData = JSON.parse(fs.readFileSync(KEYS_FILE, 'utf-8'));
        return res.status(200).json({ keys: keysData.keys });
    }

    if (req.method === 'POST') {
        const { key } = req.body;
        const keysData = JSON.parse(fs.readFileSync(KEYS_FILE, 'utf-8'));
        keysData.keys.push(key);
        fs.writeFileSync(KEYS_FILE, JSON.stringify(keysData, null, 2));
        return res.status(200).json({ message: 'Key added' });
    }

    if (req.method === 'DELETE') {
        const { delete: keyToDelete } = req.query;
        const keysData = JSON.parse(fs.readFileSync(KEYS_FILE, 'utf-8'));
        keysData.keys = keysData.keys.filter(key => key !== keyToDelete);
        fs.writeFileSync(KEYS_FILE, JSON.stringify(keysData, null, 2));
        return res.status(200).json({ message: 'Key deleted' });
    }

    return res.status(405).json({ message: 'Method Not Allowed' });
}
