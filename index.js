const express = require("express");
const app = express();

const userRoutes = require("./routes/User");
const profileRoutes = require("./routes/Profile");
const paymentRoutes = require("./routes/Payments");
const courseRoutes = require("./routes/Course");
const contactUsRoute = require("./routes/Contact");

const database = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { cloudinaryConnect } = require("./config/cloudinary");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");

dotenv.config();

// ================== PORT ==================
const PORT = process.env.PORT || 4000;

// ================== DATABASE ==================
database.connect();

// ================== CORS CONFIG ==================
const allowedOrigins = [
	"https://edtech-frontend.vercel.app",
  "http://localhost:5173",
  "http://localhost:3000",
  ""
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true); // allow Postman
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("CORS not allowed"), false);
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// VERY IMPORTANT for preflight requests
app.options("*", cors());

// ================== MIDDLEWARES ==================
app.use(express.json());
app.use(cookieParser());

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp",
  })
);

// ================== CLOUDINARY ==================
cloudinaryConnect();

// ================== ROUTES ==================
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/reach", contactUsRoute);

// ================== DEFAULT ROUTE ==================
app.get("/", (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Server is running successfully 🚀",
  });
});

// ================== ERROR HANDLER ==================
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});


app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
