# MongoDB Setup Guide for Diarium

## Why MongoDB Connection Issues Occur

The application requires MongoDB to store user data, notes, and labels. If you see connection errors, it's likely because MongoDB is not installed or not running on your system.

## Option 1: Install MongoDB Locally (Recommended for Development)

### Windows:

1. **Download MongoDB Community Server:**
   - Go to: https://www.mongodb.com/try/download/community
   - Select Windows x64
   - Download the MSI installer

2. **Install MongoDB:**
   - Run the installer
   - Choose "Complete" installation
   - Install as a Windows Service (recommended)

3. **Verify Installation:**
   - MongoDB should start automatically as a service
   - Or run manually: `mongod` in Command Prompt

4. **Connection String:**
   - Default connection: `mongodb://localhost:27017/ngn-db`
   - The app will automatically use this

### macOS:

1. **Using Homebrew:**
   ```bash
   brew tap mongodb/brew
   brew install mongodb-community
   ```

2. **Start MongoDB:**
   ```bash
   brew services start mongodb-community
   # Or run manually:
   mongod --config /usr/local/etc/mongod.conf
   ```

### Linux:

1. **Install MongoDB:**
   ```bash
   # Ubuntu/Debian
   sudo apt-get install mongodb

   # Or follow official guide:
   # https://docs.mongodb.com/manual/installation/
   ```

2. **Start MongoDB:**
   ```bash
   sudo systemctl start mongod
   # Or run manually:
   mongod
   ```

## Option 2: Use MongoDB Atlas (Cloud - Free)

If you don't want to install MongoDB locally:

1. **Create Free Account:**
   - Go to: https://www.mongodb.com/cloud/atlas
   - Sign up for free

2. **Create Cluster:**
   - Choose free tier (M0)
   - Select your region
   - Create cluster (takes a few minutes)

3. **Get Connection String:**
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string

4. **Update Environment Variable:**
   ```bash
   # Create a .env file in the project root:
   NODE_ENV=production
   MONGODB_URI=your-connection-string-here
   ```

## Option 3: Continue Without MongoDB (Limited Functionality)

The app will still start, but these features won't work:
- User registration/login
- Saving notes
- Storing entries
- User profiles

You can still view the frontend pages (Landing, About, Calendar with sample data).

## Verifying MongoDB Connection

1. **Check if MongoDB is running:**
   ```bash
   # Windows
   net start MongoDB
   
   # macOS/Linux
   brew services list | grep mongodb
   # or
   ps aux | grep mongod
   ```

2. **Test connection:**
   ```bash
   mongo
   # or for newer versions:
   mongosh
   ```

3. **Check app logs:**
   - Look for: `✅ Mongoose connected to mongodb://localhost:27017/ngn-db`
   - If you see error messages, MongoDB is not running

## Troubleshooting

### Error: "Mongoose connection error"

**Solution 1:** Start MongoDB service
```bash
# Windows
net start MongoDB

# macOS
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

**Solution 2:** Check if port 27017 is in use
```bash
# Windows
netstat -ano | findstr :27017

# macOS/Linux
lsof -i :27017
```

**Solution 3:** Check MongoDB logs
```bash
# Usually located at:
# Windows: C:\Program Files\MongoDB\Server\[version]\log\mongod.log
# macOS/Linux: /var/log/mongodb/mongod.log
```

### Error: "ECONNREFUSED"

This means MongoDB is not running. Start the MongoDB service.

### Error: "Authentication failed"

If using MongoDB Atlas, make sure:
- Your IP address is whitelisted in Atlas Network Access
- Username and password are correct in connection string
- Database user has proper permissions

## Quick Start (No Setup Required)

If you just want to see the app working without MongoDB:

1. The app will start even without MongoDB
2. Frontend pages will work (Landing, About, Calendar with sample data)
3. API endpoints will return errors (this is expected)
4. To fix, install and start MongoDB using one of the options above

## Need Help?

- MongoDB Installation: https://docs.mongodb.com/manual/installation/
- MongoDB Atlas Setup: https://docs.atlas.mongodb.com/getting-started/
- Connection String Format: `mongodb://[username:password@]host:port/database`


