const axios = require('axios');
const BASE = 'https://api.praxoapp.com/api';
const HEADERS = { Accept: 'application/json', 'User-Agent': 'okhttp/4.12.0' };

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method === 'OPTIONS') return res.status(200).end();
  try {
    const { jwtToken, referralCode } = req.query;
    const { data } = await axios.get(BASE + '/user-service/users/check-referral', {
      params: { referralCode },
      headers: { ...HEADERS, Authorization: `Bearer ${jwtToken}` }
    });
    res.json(data);
  } catch (e) { res.status(500).json({ error: e.message }); }
};
