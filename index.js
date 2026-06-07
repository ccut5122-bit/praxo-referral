const express = require('express');
const app = express();
app.use(express.json());
app.use(express.static(__dirname));

const sendOtp = require('./api/send-otp');
const verifyOtp = require('./api/verify-otp');
const completeProfile = require('./api/complete-profile');
const checkReferral = require('./api/check-referral');
const rewardSummary = require('./api/reward-summary');

app.post('/api/send-otp', (req, res) => { req.method='POST'; sendOtp(req, res); });
app.post('/api/verify-otp', (req, res) => { req.method='POST'; verifyOtp(req, res); });
app.post('/api/complete-profile', (req, res) => { req.method='POST'; completeProfile(req, res); });
app.get('/api/check-referral', (req, res) => { req.method='GET'; checkReferral(req, res); });
app.get('/api/reward-summary', (req, res) => { req.method='GET'; rewardSummary(req, res); });

const PORT = 3003;
app.listen(PORT, () => console.log('Server running on http://localhost:' + PORT));
