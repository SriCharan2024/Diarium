# 🚀 Deploy Diarium to Render - Complete Guide

## ✅ Quick Steps Overview

1. Push code to GitHub
2. Set up MongoDB Atlas (cloud database)
3. Deploy to Render
4. Configure environment variables
5. Done! Get your Render URL

---

## Step 1: Push Code to GitHub

### If you don't have a GitHub repo:

1. **Create GitHub Repository:**
   - Go to https://github.com/new
   - Name: `diarium` (or any name)
   - Make it Public or Private
   - **Don't** initialize with README
   - Click "Create repository"

2. **Push your code:**
   ```bash
   cd ng-notes-master\ng-notes-master
   git add .
   git commit -m "Ready for Render deployment"
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   git branch -M main
   git push -u origin main
   ```
   Replace `YOUR_USERNAME` and `YOUR_REPO_NAME` with your actual values.

### If you already have a GitHub repo:
```bash
cd ng-notes-master\ng-notes-master
git add .
git commit -m "Ready for Render deployment"
git push origin main
```

---

## Step 2: Set Up MongoDB Atlas (Required for Login to Work)

Render doesn't include MongoDB, so use MongoDB Atlas (free):

### A. Create Account & Cluster
1. Go to: https://www.mongodb.com/cloud/atlas
2. Click "Try Free"
3. Sign up (use Google/GitHub or email)
4. Choose "M0 FREE" cluster
5. Choose a region (closest to you)
6. Click "Create"

### B. Create Database User
1. Go to "Database Access" (left sidebar)
2. Click "Add New Database User"
3. Authentication: Password
4. Username: `diarium-user` (or your choice)
5. Password: Create a strong password (SAVE THIS!)
6. Database User Privileges: "Atlas admin"
7. Click "Add User"

### C. Whitelist IP Address
1. Go to "Network Access" (left sidebar)
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" button (sets 0.0.0.0/0)
4. Click "Confirm"

### D. Get Connection String
1. Go to "Database" → "Browse Collections" or "Clusters"
2. Click "Connect" button on your cluster
3. Choose "Connect your application"
4. Driver: Node.js, Version: 3.6 or later
5. Copy the connection string (looks like):
   ```
   mongodb+srv://diarium-user:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
6. Replace `<password>` with your actual password
7. Add database name: Change `...mongodb.net/?retry...` to `...mongodb.net/ngn-db?retry...`
8. Final string should look like:
   ```
   mongodb+srv://diarium-user:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/ngn-db?retryWrites=true&w=majority
   ```

**SAVE THIS CONNECTION STRING** - You'll need it for Render!

---

## Step 3: Deploy to Render

### A. Sign Up/Login to Render
1. Go to: https://render.com
2. Click "Get Started for Free"
3. Sign up (you can use GitHub to sign in)
4. Verify your email if needed

### B. Create New Web Service
1. Click "New +" button (top right)
2. Click "Web Service"
3. Connect GitHub if not already connected:
   - Click "Connect GitHub"
   - Authorize Render
   - Select repositories to give access
4. Select your repository (`diarium` or your repo name)

### C. Configure Web Service

Fill in these settings:

**Basic Settings:**
- **Name:** `diarium` (or your choice - this becomes your URL)
- **Environment:** `Node`
- **Region:** Choose closest to you
- **Branch:** `main` (or your branch)

**Build & Deploy:**
- **Root Directory:** Leave **empty** (or if code is in subfolder, use: `ng-notes-master/ng-notes-master`)
- **Build Command:** `npm install`
- **Start Command:** `npm start`

**Advanced Settings:**
- Click "Advanced"
- Scroll to "Environment Variables"
- Click "Add Environment Variable"
- Add these two variables:

  **Variable 1:**
  - **Key:** `NODE_ENV`
  - **Value:** `production`

  **Variable 2:**
  - **Key:** `MONGODB_URI`
  - **Value:** Paste your MongoDB Atlas connection string from Step 2D
  - (Example: `mongodb+srv://diarium-user:password@cluster0.xxxxx.mongodb.net/ngn-db?retryWrites=true&w=majority`)

### D. Deploy
1. Click "Create Web Service" at the bottom
2. Render will start building your app
3. Watch the build logs - it takes 2-5 minutes
4. You'll see logs like:
   ```
   Installing dependencies...
   Building...
   Starting service...
   ✅ Your service is live
   ```

---

## Step 4: Access Your Application

Once deployment is complete:

- **Your URL:** `https://diarium.onrender.com` (or your custom name)
- Render provides a free subdomain automatically
- The URL format: `https://YOUR_SERVICE_NAME.onrender.com`

**Share this URL** - Your app is now live! 🎉

---

## Troubleshooting

### Build Fails
- ✅ Check build logs in Render dashboard
- ✅ Ensure all dependencies in `package.json`
- ✅ Verify Node.js version compatibility (Render auto-detects)

### App Crashes
- ✅ Check service logs in Render dashboard
- ✅ Verify `MONGODB_URI` environment variable is set correctly
- ✅ Check MongoDB Atlas connection string format

### MongoDB Connection Fails
- ✅ Verify `MONGODB_URI` in Render environment variables
- ✅ Check MongoDB Atlas network access (IP whitelist)
- ✅ Verify database user password is correct
- ✅ Make sure database name is in connection string (`/ngn-db`)

### Port Errors
- ✅ Render sets `PORT` automatically - don't override it
- ✅ Your code already uses `process.env.PORT || '7000'` - that's correct!

---

## Environment Variables Checklist

Make sure these are set in Render:
- ✅ `NODE_ENV` = `production`
- ✅ `MONGODB_URI` = `mongodb+srv://username:password@cluster.mongodb.net/ngn-db?retryWrites=true&w=majority`

---

## Important Notes

### Free Tier Limitations:
- ⚠️ Render free tier spins down after 15 minutes of inactivity
- ⚠️ First request after spin-down takes ~30 seconds (cold start)
- ⚠️ Perfect for development/testing
- 💰 Consider upgrading for production use

### MongoDB Atlas Free Tier:
- ✅ 512 MB storage (enough for development)
- ✅ Shared resources
- ✅ Free forever for M0 tier

---

## Quick Commands Reference

```bash
# Push to GitHub
git add .
git commit -m "Deploy to Render"
git push origin main

# Check git status
git status

# View Render logs
# Go to Render dashboard → Your service → Logs tab
```

---

## Need Help?

1. **Check Render Logs:**
   - Dashboard → Your Service → Logs tab
   - Look for error messages

2. **Check Build Logs:**
   - Dashboard → Your Service → Events tab
   - See what happened during build

3. **Verify Environment Variables:**
   - Dashboard → Your Service → Environment tab
   - Make sure `MONGODB_URI` is set

---

## Success Checklist

- [ ] Code pushed to GitHub
- [ ] MongoDB Atlas cluster created
- [ ] Database user created
- [ ] IP address whitelisted (0.0.0.0/0)
- [ ] Connection string copied and formatted
- [ ] Render account created
- [ ] Web service created
- [ ] Environment variables set (NODE_ENV, MONGODB_URI)
- [ ] Deployment successful
- [ ] App is live and accessible!

---

**Your app URL will be:** `https://diarium.onrender.com` 🚀

Good luck with your deployment!

