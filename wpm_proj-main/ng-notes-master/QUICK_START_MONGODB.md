# Quick Start: Connecting to MongoDB

## ✅ Your MongoDB Status
Based on the check, **MongoDB Server is installed** on your system!

## Step-by-Step Connection Guide

### Step 1: Verify MongoDB is Running

**Option A: Check Windows Services**
1. Press `Windows Key + R`
2. Type `services.msc` and press Enter
3. Look for "MongoDB Server (MongoDB)" or "MongoDB"
4. Make sure it says "Running" (Status column)
5. If it says "Stopped", right-click → Start

**Option B: Command Line Check**
```powershell
# Check if MongoDB service is running
net start | findstr /i mongo

# If not running, start it:
net start MongoDB
```

### Step 2: Test MongoDB Connection

**Test using MongoDB Shell:**
```powershell
# Open a new Command Prompt or PowerShell
mongosh
# OR (for older versions)
mongo

# If it connects, you'll see:
# Current Mongoose Version: X.X.X
# Connecting to: mongodb://127.0.0.1:27017
# ✓ Connected to MongoDB

# Type this to test:
show dbs

# Exit with:
exit
```

### Step 3: Start Your Application

1. **Navigate to your project:**
   ```powershell
   cd ng-notes-master\ng-notes-master
   ```

2. **Start the server:**
   ```powershell
   npm start
   # OR
   node .\bin\www
   ```

3. **Look for this success message:**
   ```
   ✅ Mongoose connected to mongodb://localhost:27017/ngn-db
   Database: ngn-db
   ```

### Step 4: If Connection Fails

**If you see: "Mongoose connection error"**

1. **Start MongoDB Service:**
   ```powershell
   # Run as Administrator
   net start MongoDB
   ```

2. **Or start MongoDB manually:**
   ```powershell
   # Navigate to MongoDB bin folder (usually):
   cd "C:\Program Files\MongoDB\Server\[version]\bin"
   
   # Start MongoDB:
   mongod
   ```
   Leave this window open - MongoDB will run here.

3. **Check if port 27017 is in use:**
   ```powershell
   netstat -ano | findstr :27017
   ```
   If you see output, MongoDB is running on that port.

## Connection String Info

Your app is configured to connect to:
- **Host:** `localhost`
- **Port:** `27017` (MongoDB default)
- **Database:** `ngn-db`

Connection String: `mongodb://localhost:27017/ngn-db`

## Alternative: MongoDB Atlas (Cloud)

If local MongoDB isn't working, use **MongoDB Atlas** (free cloud option):

1. **Sign up:** https://www.mongodb.com/cloud/atlas (Free account)
2. **Create cluster:** Choose free M0 tier
3. **Get connection string:**
   - Click "Connect" → "Connect your application"
   - Copy the connection string
4. **Update your app:**
   - Create a `.env` file in project root:
     ```
     NODE_ENV=production
     MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ngn-db
     ```
   - Replace with your actual Atlas connection string

## Troubleshooting Quick Fixes

| Problem | Solution |
|---------|----------|
| "MongoDB is not recognized" | MongoDB not in PATH. Start service instead: `net start MongoDB` |
| "Connection refused" | MongoDB not running. Start service: `net start MongoDB` |
| "Port 27017 already in use" | Another MongoDB instance is running. Good! |
| "Access denied" | Run PowerShell/CMD as Administrator |

## Verify Everything Works

After starting your app, you should see:
```
✅ Mongoose connected to mongodb://localhost:27017/ngn-db
Database: ngn-db
Listening on port 7000
```

Then visit: **http://localhost:7000**

## Still Having Issues?

1. **Check MongoDB installation:**
   - Default location: `C:\Program Files\MongoDB\Server\[version]\bin`
   - Look for `mongod.exe` and `mongo.exe` (or `mongosh.exe`)

2. **Check logs:**
   - MongoDB logs: `C:\Program Files\MongoDB\Server\[version]\log\mongod.log`

3. **Reinstall MongoDB:**
   - Download: https://www.mongodb.com/try/download/community
   - Choose Windows x64 → MSI installer
   - Install as Windows Service

---

**Quick Command Reference:**
```powershell
# Start MongoDB (as Administrator)
net start MongoDB

# Stop MongoDB (as Administrator)
net stop MongoDB

# Check if running
net start | findstr mongo

# Test connection
mongosh
```


