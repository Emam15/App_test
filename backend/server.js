// server.js
require("dotenv").config({ path: __dirname + "/../config/.env" });
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const announcementRoutes = require("./routes/announcement");
const classesRoutes = require("./routes/classes");
const attendanceRoutes = require("./routes/attendance");
const mobileRoutes = require("./routes/mobile");  // 👈 استدعاء الـ mobile routes

const app = express();  // ✅ لازم يكون قبل ما تستخدم app

// ============================================
// MIDDLEWARE CONFIGURATION
// ============================================
app.use(
  cors({
    origin: function (origin, callback) {
      callback(null, true);
    },
    credentials: true,
  }),
);
app.use(express.json());

// ============================================
// API ROUTES
// ============================================
app.use("/api/auth", authRoutes);
app.use("/api/announcements", announcementRoutes);
app.use("/api/classes", classesRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/mobile", mobileRoutes);  // ✅ بعد ما عرفت app

// ============================================
// DATABASE CONNECTION & SERVER INITIALIZATION
// ============================================
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("[INFO] Database connection established successfully");

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`[SUCCESS] Server initialized on port ${PORT}`);

      // عرض الـ IP عشان الموبايل يتصل
      const { networkInterfaces } = require('os');
      const nets = networkInterfaces();
      for (const name of Object.keys(nets)) {
        for (const net of nets[name]) {
          if (net.family === 'IPv4' && !net.internal) {
            console.log(`[INFO] Mobile app connect to: http://${net.address}:${PORT}`);
          }
        }
      }
    });
  })
  .catch((err) => {
    console.error("[ERROR] Database connection failed:", err.message);
    process.exit(1);
  });