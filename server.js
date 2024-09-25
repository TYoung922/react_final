const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const yodelRoutes = require("./routes/yodelRoutes");
const followRoutes = require("./routes/followRoutes");
const { authenticateJWT } = require("./middleware/authMiddleware");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/yodels", authenticateJWT, yodelRoutes);
app.use("/api/user", authenticateJWT, followRoutes);

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
