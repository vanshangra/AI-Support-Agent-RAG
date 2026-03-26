# Quick Start Guide - AI Support Agent

## ⚡ 5-Minute Setup

### Prerequisites Check
```bash
# Check Node.js version (need 18+)
node --version

# Check npm
npm --version

# Check Python (need 3.10+)
python --version

# Check MongoDB is running (or have Atlas connection string ready)
# Check Ollama is running on localhost:11434
```

## 🚀 Start All Services

### Terminal 1 - Frontend
```bash
cd client/ai-agent
npm install
npm run dev
```
✅ Frontend runs at `http://localhost:5173`

### Terminal 2 - Backend
```bash
cd server
npm install

# Create .env file with:
MONGODB_URI=mongodb://localhost:27017/ai-agent
JWT_SECRET=your_dev_secret_key_12345
PORT=5000
RAG_SERVICE_URL=http://localhost:8000

npm start
```
✅ Backend runs at `http://localhost:5000`

### Terminal 3 - RAG Service
```bash
cd rag-service
python -m venv venv
# Windows:
venv\Scripts\activate
# Mac/Linux:
source venv/bin/activate

pip install -r requirements.txt

# Create .env file with:
LLM_MODEL=llama2
OLLAMA_URL=http://localhost:11434
PORT=8000

uvicorn main:app --reload --port 8000
```
✅ RAG Service runs at `http://localhost:8000`

### Terminal 4 - Ollama (Keep Running)
```bash
ollama run llama2
```
✅ LLM ready at `http://localhost:11434`

---

## 🎯 Testing the App

### Create Test Account
1. Go to `http://localhost:5173/login`
2. Create account or click "Contact Administrator"
3. Or modify backend to auto-create test user

### Test Chat
1. Login successfully (redirect to chat)
2. Type a question
3. Should see: Loading → Response → Sources

### Test Admin (if admin)
1. Navigate to `/admin`
2. Upload a PDF
3. See it appear in list
4. Ask questions about the PDF content

---

## 🔧 Troubleshooting

### Frontend Won't Start
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Backend Connection Error
```bash
# Check MongoDB
# Local: mongod
# Cloud: Add MongoDB Atlas connection string to .env

# Check port not in use
lsof -i :5000
```

### RAG Service Issues
```bash
# Check Ollama running
curl http://localhost:11434/api/tags

# Check Python dependencies
pip list | grep fastapi

# Reinstall if needed
pip install -r requirements.txt
```

### Ollama Not Working
```bash
# Ensure ollama process is running
ollama run llama2

# Check connectivity
curl http://localhost:11434/api/tags
```

---

## 📝 Environment Setup

### .env Files

**Frontend** (optional - can use defaults)
```env
# client/ai-agent/.env
VITE_API_URL=http://localhost:5000
```

**Backend** (required)
```env
# server/.env
MONGODB_URI=mongodb://localhost:27017/ai-agent
JWT_SECRET=your_jwt_secret_key_here
GOOGLE_CLIENT_ID=your_google_id
GOOGLE_CLIENT_SECRET=your_google_secret
RAG_SERVICE_URL=http://localhost:8000
PORT=5000
```

**RAG Service** (optional - has defaults)
```env
# rag-service/.env
LLM_MODEL=llama2
OLLAMA_URL=http://localhost:11434
PORT=8000
```

---

## 🎨 UI Customization

### Change Colors
Edit: `client/ai-agent/tailwind.config.js`
```js
theme: {
  extend: {
    colors: {
      primary: {
        500: '#your-color',
      }
    }
  }
}
```

### Change Fonts
Edit: `client/ai-agent/src/index.css`

### Change Component Styles
Edit: `client/ai-agent/src/components/UI.jsx`

---

## 📚 Key Files to Know

### Most Important Frontend Files
```
src/pages/Chat.jsx          - Main chat interface
src/pages/Login.jsx         - Authentication
src/components/UI.jsx       - Component library
tailwind.config.js          - Design tokens
```

### Most Important Backend Files
```
routes/chatRoutes.js        - Chat endpoints
controllers/chatController.js - Chat logic
services/ragService.js      - RAG integration
models/User.js              - User schema
```

### Most Important RAG Files
```
main.py                     - FastAPI app
services/llm_service.py     - LLM integration
services/retrieval_service.py - Vector search
```

---

## 🧪 Testing Workflows

### Test Authentication
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

### Test Chat
```bash
curl -X POST http://localhost:5000/api/chat/ask \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"question":"What is this document about?"}'
```

### Test RAG Service
```bash
curl http://localhost:8000/docs
# Opens interactive Swagger docs
```

---

## 📊 Monitoring

### View Logs
```bash
# Backend logs
tail -f logs/app.log

# Frontend console
Open DevTools (F12) → Console tab
```

### Check Services Health
```bash
# Frontend
curl http://localhost:5173

# Backend
curl http://localhost:5000/api/auth/status

# RAG
curl http://localhost:8000/docs

# Ollama
curl http://localhost:11434/api/tags
```

---

## 🚀 Production Build

### Frontend Production Build
```bash
cd client/ai-agent
npm run build
npm run preview
```
Creates optimized bundle in `dist/` folder

### Backend Production
```bash
cd server
NODE_ENV=production npm start
```

### RAG Production
```bash
cd rag-service
gunicorn main:app --workers 4
```

---

## 📱 Responsive Testing

### Test on Mobile
```bash
# Get your local IP
ipconfig getifaddr en0  # Mac
ipconfig             # Windows (look for IPv4)

# Open in mobile browser
http://YOUR_IP:5173
```

### Test in DevTools
```
Press F12 → Toggle device toolbar (Ctrl+Shift+M)
Test different screen sizes
```

---

## 🔐 Security Checklist

Before deploying:
- [ ] Change JWT_SECRET to strong random string
- [ ] Configure MongoDB with authentication
- [ ] Set up HTTPS/SSL certificates
- [ ] Add CORS whitelist specific domains
- [ ] Enable rate limiting
- [ ] Set up secure headers
- [ ] Validate all user inputs
- [ ] Hide sensitive data in .env

---

## 💾 Database Commands

### MongoDB (Local)
```bash
# Start MongoDB
mongod

# Connect to database
mongo

# View collections
show collections

# View users
db.users.find()

# Clear all data (careful!)
db.users.deleteMany({})
```

### MongoDB Atlas (Cloud)
```
1. Create account at mongodb.com
2. Create cluster
3. Get connection string
4. Add to JWT_SECRET
5. Use in MongoDB URI
```

---

## 📞 Getting Help

### Common Issues & Solutions

**Issue: "Cannot find module"**
```bash
# Fix: Reinstall dependencies
npm install
```

**Issue: "Connection refused"**
```bash
# Check service is running
# Make sure port is correct
# Check firewall settings
```

**Issue: "MongoDB connection timeout"**
```bash
# MongoDB local not running
mongod

# Or check Atlas connection string
# Add IP to whitelist on Atlas
```

**Issue: "LLM not responding"**
```bash
# Ollama not running
ollama run llama2

# Or check OLLAMA_URL in .env
```

---

## 🎓 Learning Resources

### Documentation Files to Read
1. `readme.md` - Project overview
2. `UI_DOCUMENTATION.md` - Component guide
3. `DESIGN_SYSTEM.md` - Design specs
4. `PROJECT_STRUCTURE.md` - File organization
5. `PORTFOLIO_GUIDE.md` - Interview prep

### Key Concepts to Understand
- JWT authentication
- Vector databases & embeddings
- React hooks & context
- Express middleware
- MongoDB schemas
- REST API design

---

## ✅ Verification Checklist

After starting all services:

- [ ] Frontend loads at localhost:5173
- [ ] Backend API responds at localhost:5000
- [ ] RAG service docs at localhost:8000/docs
- [ ] Ollama tags visible at localhost:11434/api/tags
- [ ] Can see login page
- [ ] Can create/login account
- [ ] Can navigate to chat page
- [ ] Can type questions
- [ ] Can see AI responses
- [ ] Can access admin panel (if admin)
- [ ] Can upload documents (if admin)

---

## 🎯 Next Steps

After getting it running:
1. **Explore the code** - Read through components
2. **Make changes** - Customize colors, fonts, text
3. **Add a feature** - Try adding a new page or API
4. **Deploy** - Push to Vercel, Render, etc.
5. **Share** - Show on portfolio/GitHub

---

## 📞 Support

Having issues?
1. Check the troubleshooting section above
2. Review error messages carefully
3. Check all environment variables
4. Verify all services are running
5. Check firewall/antivirus settings

---

**Ready to go?** 🚀

Start the services and enjoy building!

**Last Updated**: March 2026
