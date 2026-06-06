const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const BASE = 'https://api.praxoapp.com/api';
const PATHS = {
  init: '/user-service/users/signup-init',
  verify: '/user-service/users/verify-signup-init',
  complete: '/user-service/users/signup-complete',
  checkReferral: '/user-service/users/check-referral',
  rewardMe: '/user-service/users/referral-reward/me',
  rewardSummary: '/user-service/users/referral-reward/summary',
  rewardInvites: '/user-service/users/referral-reward/invites',
};

const headers = {
  'Accept': 'application/json',
  'User-Agent': 'okhttp/4.12.0',
  'Content-Type': 'application/json',
};

app.post('/api/send-otp', async (req, res) => {
  try {
    const { mobile, referralCode } = req.body;
    const { data } = await axios.post(BASE + PATHS.init, {
      mobile, referralCode, countryId: '+91',
      deviceData: JSON.stringify({ deviceId: require('crypto').randomUUID(), deviceName: 'Pixel 7', osVersion: 'Android 14', appVersion: '3.65' }),
      latitude: '28.6139', longitude: '77.2090', address: 'India',
    }, { headers });
    res.json(data);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.post('/api/verify-otp', async (req, res) => {
  try {
    const { mobile, otp, referralCode } = req.body;
    const { data } = await axios.post(BASE + PATHS.verify, {
      mobile, otp, referralCode, countryId: '+91',
      deviceData: JSON.stringify({ deviceId: require('crypto').randomUUID(), deviceName: 'Pixel 7', osVersion: 'Android 14', appVersion: '3.65' }),
      deviceToken: 'fcm_' + require('crypto').randomUUID().replace(/-/g,''),
      deviceType: 'ANDROID', appVersion: '3.65',
      latitude: '28.6139', longitude: '77.2090', address: 'India',
    }, { headers });
    res.json(data);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.post('/api/complete-profile', async (req, res) => {
  try {
    const { jwtToken, fullName, userName, referralCode, dateOfBirth, gender } = req.body;
    const FormData = require('form-data');
    const form = new FormData();
    form.append('fullName', fullName);
    form.append('userName', userName);
    form.append('referralCode', referralCode);
    form.append('countryId', '+91');
    form.append('dateOfBirth', dateOfBirth);
    form.append('gender', gender);
    const { data } = await axios.post(BASE + PATHS.complete, form, {
      headers: { ...form.getHeaders(), Authorization: `Bearer ${jwtToken}`, Accept: 'application/json' }
    });
    res.json(data);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.get('/api/check-referral', async (req, res) => {
  try {
    const { jwtToken, referralCode } = req.query;
    const { data } = await axios.get(BASE + PATHS.checkReferral, {
      params: { referralCode },
      headers: { ...headers, Authorization: `Bearer ${jwtToken}` }
    });
    res.json(data);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.get('/api/reward-summary', async (req, res) => {
  try {
    const { jwtToken } = req.query;
    const { data } = await axios.get(BASE + PATHS.rewardSummary, {
      headers: { ...headers, Authorization: `Bearer ${jwtToken}` }
    });
    res.json(data);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
