const axios = require('axios');
const BASE = 'https://api.praxoapp.com/api';
const HEADERS = { Accept: 'application/json', 'User-Agent': 'okhttp/4.12.0', 'Content-Type': 'application/json' };

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method === 'OPTIONS') return res.status(200).end();
  try {
    const { mobile, otp, referralCode } = req.body;
    const { data } = await axios.post(BASE + '/user-service/users/verify-signup-init', {
      mobile, otp, referralCode, countryId: '+91',
      deviceData: JSON.stringify({ deviceId: require('crypto').randomUUID(), deviceName: 'Pixel 7', osVersion: 'Android 14', appVersion: '3.65' }),
      deviceToken: 'fcm_' + require('crypto').randomUUID().replace(/-/g,''),
      deviceType: 'ANDROID', appVersion: '3.65',
      latitude: '28.6139', longitude: '77.2090', address: 'India',
    }, { headers: HEADERS });
    res.json(data);
  } catch (e) { res.status(500).json({ error: e.message }); }
};
