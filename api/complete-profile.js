const axios = require('axios');
const FormData = require('form-data');
const BASE = 'https://api.praxoapp.com/api';

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method === 'OPTIONS') return res.status(200).end();
  try {
    const { jwtToken, fullName, userName, referralCode, dateOfBirth, gender } = req.body;
    const form = new FormData();
    form.append('fullName', fullName);
    form.append('userName', userName);
    form.append('referralCode', referralCode);
    form.append('countryId', '+91');
    form.append('dateOfBirth', dateOfBirth);
    form.append('gender', gender);
    const { data } = await axios.post(BASE + '/user-service/users/signup-complete', form, {
      headers: { ...form.getHeaders(), Authorization: `Bearer ${jwtToken}`, Accept: 'application/json' }
    });
    res.json(data);
  } catch (e) { res.status(500).json({ error: e.message }); }
};
