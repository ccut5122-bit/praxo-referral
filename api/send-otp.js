const axios = require('axios');
const crypto = require('crypto');

const BASE = 'https://api.praxoapp.com/api';
const HEADERS = { Accept: 'application/json', 'User-Agent': 'okhttp/4.12.0', 'Content-Type': 'application/json' };

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    const { mobile, referralCode } = req.body;
    const deviceToken = crypto.randomUUID();

    // 1. Guest login to get JWT
    const guestRes = await axios.post(BASE + '/user-service/users/guest-user', {
      deviceToken, deviceType: 'Android', appVersion: '3.65',
    }, { headers: HEADERS });

    const guestData = guestRes.data;
    if (guestData.status !== '200') {
      return res.json({ status: 'error', message: 'Guest login failed: ' + (guestData.message || '') });
    }

    const jwtToken = guestData.data.jwtToken;
    const deviceAuthToken = guestData.data.deviceAuthToken;

    // 2. Send OTP via resent-signup-init (bypasses version check)
    const otpRes = await axios.get(BASE + '/user-service/users/resent-signup-init', {
      params: { mobile, promo: false, deviceAuthToken },
      headers: { ...HEADERS, Authorization: `Bearer ${jwtToken}` },
    });

    const otpData = otpRes.data;

    res.json({
      status: otpData.status === '200' ? '200' : 'error',
      message: otpData.message || 'OTP sent successfully',
      jwtToken,
      deviceAuthToken,
      deviceToken,
      referralCode,
    });
  } catch (e) {
    res.status(500).json({ status: 'error', message: e.message });
  }
};
