const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");
require("dotenv").config();

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// Sample route to get all yodels
app.get("/yodels", async (req, res) => {
  const yodels = await prisma.yodel.findMany({
    include: { user: true },
  });
  res.json(yodels);
});

app.post("/yodels", async (req, res) => {
  const { content, userId } = req.body;
  const newYodel = await prisma.yodel.create({
    data: {
      content,
      user: { connect: { id: userId } },
    },
  });
  res.json(newYodel);
});

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
