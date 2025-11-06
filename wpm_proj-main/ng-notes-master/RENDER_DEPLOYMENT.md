# Deploy Diarium to Render - Step by Step Guide

## Prerequisites
1. A GitHub account
2. Your code pushed to a GitHub repository
3. A Render account (free tier available at https://render.com)

## Step 1: Push Code to GitHub

### Option A: If you don't have a GitHub repo yet

1. **Create a new repository on GitHub:**
   - Go to https://github.com/new
   - Name it: `diarium` or `diarium-app`
   - Make it public (or private)
   - Don't initialize with README

2. **Push your code:**
   ```bash
   cd ng-notes-master/ng-notes-master
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   git branch -M main
   git push -u origin main
   ```

### Option B: If you already have a GitHub repo
```bash
cd ng-notes-master/ng-notes-master
git add .
git commit -m "Ready for Render deployment"
git push origin main
```

## Step 2: Set Up MongoDB Atlas (Cloud Database)

Since Render doesn't include MongoDB, use MongoDB Atlas:

1. **Create MongoDB Atlas Account:**
   - Go to https://www.mongodb.com/cloud/atlas
   - Sign up for free (M0 cluster is free forever)

2. **Create a Cluster:**
   - Click "Build a Database"
   - Choose FREE (M0) tier
   - Select a region close to you
   - Name your cluster (e.g., "diarium-cluster")
   - Click "Create"

3. **Create Database User:**
   - Go to "Database Access" (left sidebar)
   - Click "Add New Database User"
   - Choose "Password" authentication
   - Username: `diarium-user` (or your choice)
   - Password: Create a strong password (SAVE THIS!)
   - Database User Privileges: "Atlas admin" or "Read and write"
   - Click "Add User"

4. **Whitelist IP Address:**
   - Go to "Network Access" (left sidebar)
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (0.0.0.0/0) for development
   - Click "Confirm"

5. **Get Connection String:**
   - Go to "Database" → "Connect"
   - Click "Connect your application"
   - Copy the connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net/?retryWrites=true&w=majority`)
   - Replace `<password>` with your actual password
   - Add database name at the end: `...mongodb.net/ngn-db?retryWrites=true&w=majority`

## Step 3: Deploy to Render

1. **Sign in to Render:**
   - Go to https://render.com
   - Sign up/Sign in (you can use GitHub to sign in)

2. **Create New Web Service:**
   - Click "New +" → "Web Service"
   - Connect your GitHub account if not already connected
   - Select your repository (`diarium` or your repo name)

3. **Configure Web Service:**
   - **Name:** `diarium` (or your choice)
   - **Environment:** `Node`
   - **Region:** Choose closest to you
   - **Branch:** `main` (or your branch name)
   - **Root Directory:** Leave blank or `ng-notes-master/ng-notes-master` if your code is in a subfolder
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`

4. **Add Environment Variables:**
   - Click "Advanced" → "Add Environment Variable"
   - Add these variables:
     ```
     NODE_ENV = production
     MONGODB_URI = mongodb+srv://diarium-user:YOUR_PASSWORD@cluster.mongodb.net/ngn-db?retryWrites=true&w=majority
     ```
     (Replace with your actual MongoDB Atlas connection string)

5. **Deploy:**
   - Click "Create Web Service"
   - Render will automatically start building and deploying

6. **Wait for Deployment:**
   - Build takes 2-5 minutes
   - Watch the build logs for any errors
   - Once deployed, you'll see "Live" status

## Step 4: Access Your Application

- Your app will be available at: `https://diarium.onrender.com` (or your custom name)
- Render provides a free subdomain automatically

## Troubleshooting

### Build Fails
- Check build logs in Render dashboard
- Ensure all dependencies are in `package.json`
- Verify Node version compatibility

### MongoDB Connection Fails
- Verify MONGODB_URI is set correctly in Render
- Check MongoDB Atlas network access (IP whitelist)
- Verify database user credentials
- Make sure password in connection string doesn't have special characters (URL encode if needed)

### App Crashes
- Check logs in Render dashboard
- Verify PORT environment variable (Render sets this automatically)
- Check MongoDB connection string format

## Important Notes

1. **Free Tier Limitations:**
   - Render free tier spins down after 15 minutes of inactivity
   - First request after spin-down takes ~30 seconds to wake up
   - Consider upgrading for production use

2. **MongoDB Atlas Free Tier:**
   - 512 MB storage
   - Shared RAM
   - Perfect for development/testing

3. **Environment Variables:**
   - Never commit MONGODB_URI to GitHub
   - Always use Render's environment variables for sensitive data

## Quick Checklist

- [ ] Code pushed to GitHub
- [ ] MongoDB Atlas cluster created
- [ ] Database user created
- [ ] IP address whitelisted
- [ ] Connection string copied
- [ ] Render web service created
- [ ] Environment variables set
- [ ] App deployed and live

## Support

If you encounter issues:
1. Check Render build logs
2. Check Render service logs
3. Verify MongoDB Atlas connection
4. Ensure all environment variables are set correctly

