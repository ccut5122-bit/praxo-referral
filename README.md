# Praxo Referral Auto-Signup Tool

Praxo app me referral ke saath auto-signup karo — bas OTP manually daalna hai.

## Deploy (Free Options)

### Option 1: Render (Recommended)
1. **Fork/Clone** ye repo → GitHub pe push karo
2. [Render.com](https://render.com) pe signup karo (GitHub se connect karo)
3. **New Web Service** → apna repo select karo
4. Settings:
   - **Runtime:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `node index.js`
5. Deploy karo → Render tumhe ek URL dega (e.g. `https://praxo-app.onrender.com`)

### Option 2: Railway
1. [Railway.app](https://railway.app) pe signup karo
2. **New Project** → **Deploy from GitHub repo**
3. Auto-detect karega Node.js, bas deploy karo

### Option 3: Koyeb
1. [Koyeb.com](https://koyeb.com) pe signup karo
2. GitHub repo connect karo aur Node.js app deploy karo

### Option 4: Vercel (Serverless)
1. `vercel.json` banakar deploy kar sakte ho (serverless functions)
2. Lekin Render/Railway zyada easy hai is app ke liye

## Local Run
```bash
npm install
node index.js
# http://localhost:3000
```

## Kaise Kaam Karta Hai?
1. Referral code/link + mobile number daalo
2. OTP bhejega phone pe
3. OTP verify karo
4. Naam/username auto-generate hoga
5. Profile complete hoga referral code ke saath
6. Referral status dikhayega

## Tech Stack
- Backend: Node.js + Express + Axios
- Frontend: Pure HTML/CSS/JS
- API: Praxo API (XOR-decrypted routes)
