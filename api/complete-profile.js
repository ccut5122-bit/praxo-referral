const axios = require('axios');
const FormData = require('form-data');
const BASE = 'https://api.praxoapp.com/api';

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method === 'OPTIONS') return res.status(200).end();
  try {
    const { jwtToken, fullName, userName, referralCode, dateOfBirth, gender, mobile, otp, deviceAuthToken } = req.body;
    const crypto = require('crypto');
    const form = new FormData();
    form.append('mobile', mobile || '9999999999');
    form.append('otp', otp || '000000');
    form.append('fullName', fullName);
    form.append('userName', userName);
    form.append('referralCode', referralCode || '');
    form.append('countryId', '+91');
    form.append('dateOfBirth', dateOfBirth);
    form.append('gender', gender);
    form.append('appVersion', '3.65');
    form.append('deviceType', 'ANDROID');
    form.append('deviceToken', deviceAuthToken || crypto.randomUUID());
    form.append('deviceData', JSON.stringify({ deviceId: crypto.randomUUID(), deviceName: 'Pixel 7', osVersion: 'Android 14', appVersion: '3.65' }));
    const { data } = await axios.post(BASE + '/user-service/users/signup-complete', form, {
      headers: { ...form.getHeaders(), Authorization: `Bearer ${jwtToken}`, Accept: 'application/json' },
      timeout: 20000,
    });
    res.json(data);
  } catch (e) { 
    if (e.response) res.status(e.response.status).json(e.response.data);
    else res.status(500).json({ error: e.message });
  }
};
