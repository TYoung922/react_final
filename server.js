const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const yodelRoutes = require("./routes/yodelRoutes");
const { authenticateJWT } = require("./middleware/authMiddleware"); // Import the JWT authentication middleware

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes); // Auth routes for user registration and login
app.use("/api/yodels", authenticateJWT, yodelRoutes); // Apply authentication middleware to yodel routes

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// const express = require("express");
// const cors = require("cors");
// const { PrismaClient } = require("@prisma/client");
// require("dotenv").config();

// const app = express();
// const prisma = new PrismaClient();

// app.use(cors());
// app.use(express.json());

// // Sample route to get all yodels
// app.get("/yodels", async (req, res) => {
//   const yodels = await prisma.yodel.findMany({
//     include: { user: true },
//   });
//   res.json(yodels);
// });

// app.post("/yodels", async (req, res) => {
//   const { content, userId } = req.body;
//   const newYodel = await prisma.yodel.create({
//     data: {
//       content,
//       user: { connect: { id: userId } },
//     },
//   });
//   res.json(newYodel);
// });

// // Start server
// const PORT = process.env.PORT || 4000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
