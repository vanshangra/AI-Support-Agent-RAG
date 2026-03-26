require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

const documentRoutes = require("./routes/documentRoutes");
const chatRoutes = require("./routes/chatRoutes");
const authRoutes = require("./routes/authRoutes");

const chatHistoryRoutes = require("./routes/chatHistoryRoutes");
const adminRoutes = require("./routes/adminRoutes");

const errorHandler = require("./middleware/errorHandler");
const limiter = require("./middleware/rateLimiter");

const session = require("express-session");
const passport = require("./config/passport");

const app = express();


// 🔹 1. Connect DB FIRST
connectDB();


// 🔹 2. Global Middlewares
app.use(cors());
app.use(express.json());


// 🔹 3. Rate Limiter (VERY IMPORTANT — early placement)
app.use(limiter);


// 🔹 4. Session Middleware (must come BEFORE passport)
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));


// 🔹 5. Passport Init (after session)
app.use(passport.initialize());


// 🔹 6. Routes
app.use("/api/auth", authRoutes);
app.use("/api/docs", documentRoutes);
app.use("/api/chat", chatRoutes);

app.use("/api/history", chatHistoryRoutes);
app.use("/api/admin", adminRoutes);

app.get(
  "/api/protected",
  require("./middleware/authMiddleware").protect,
  (req, res) => {
    res.json({
      message: "Protected route accessed",
      user: req.user
    });
  }
);

// 🔹 7. Health Check Route
app.get("/", (req, res) => {
  res.send("API is running...");
});


// 🔹 8. Error Handler (ALWAYS LAST)
app.use(errorHandler);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});