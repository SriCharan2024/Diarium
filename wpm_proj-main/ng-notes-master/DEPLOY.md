# Quick Deployment to Render

## Before Deploying - Complete These Steps:

### 1. Push to GitHub First

```bash
cd ng-notes-master/ng-notes-master
git add .
git commit -m "Ready for Render deployment"
git push origin main
```

### 2. Get Your MongoDB Atlas Connection String

1. Go to https://www.mongodb.com/cloud/atlas (sign up if needed)
2. Create free cluster (M0 tier)
3. Create database user with password
4. Whitelist IP: `0.0.0.0/0` (Allow from anywhere)
5. Go to Database → Connect → Connect your application
6. Copy connection string and replace `<password>` with your password
7. Add database name: `...mongodb.net/ngn-db?retryWrites=true&w=majority`

### 3. Deploy to Render

1. Go to https://render.com and sign up/login
2. Click "New +" → "Web Service"
3. Connect GitHub and select your repository
4. Configure:
   - **Name:** diarium
   - **Environment:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
5. Add Environment Variables:
   - `NODE_ENV` = `production`
   - `MONGODB_URI` = `your-mongodb-atlas-connection-string`
6. Click "Create Web Service"
7. Wait for deployment (2-5 minutes)

### 4. Your App Will Be Live At:
`https://diarium.onrender.com` (or your custom name)

## Need Help?
See RENDER_DEPLOYMENT.md for detailed step-by-step instructions.

