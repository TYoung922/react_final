const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// Create a new Yodel
const createYodel = async (req, res) => {
  const { content } = req.body;

  try {
    const yodel = await prisma.yodel.create({
      data: {
        content,
        author: {
          connect: { id: req.user.id },
        },
      },
    });
    res.status(201).json(yodel);
  } catch (error) {
    res.status(500).json({ error: "Unable to create Yodel." });
  }
};

// Get all Yodels
const getAllYodels = async (req, res) => {
  try {
    const yodels = await prisma.yodel.findMany({
      include: { author: true },
    });
    res.json(yodels);
  } catch (error) {
    res.status(500).json({ error: "Unable to fetch Yodels." });
  }
};

// Get Yodel by ID
const getYodelById = async (req, res) => {
  const { id } = req.params;

  try {
    const yodel = await prisma.yodel.findUnique({
      where: { id: parseInt(id) },
      include: { author: true },
    });

    if (!yodel) {
      return res.status(404).json({ error: "Yodel not found." });
    }
    res.json(yodel);
  } catch (error) {
    res.status(500).json({ error: "Unable to fetch Yodel." });
  }
};

// Get Yodels by User ID
const getUsersYodels = async (req, res) => {
  const { userId } = req.params;

  try {
    const yodels = await prisma.yodel.findMany({
      where: { authorId: parseInt(userId) },
      include: { author: true },
    });

    res.json(yodels);
  } catch (error) {
    res.status(500).json({ error: "Unable to fetch Yodels." });
  }
};

// Get Yodels by content search
const searchByContent = async (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ error: "Query parameter is required." });
  }

  try {
    const yodels = await prisma.yodel.findMany({
      where: {
        content: {
          contains: query,
          mode: "insensitive",
        },
      },
      include: { author: true },
    });

    res.json(yodels);
  } catch (error) {
    res.status(500).json({ error: "Unable to search Yodels." });
  }
};

module.exports = {
  createYodel,
  getAllYodels,
  getYodelById,
  getUsersYodels,
  searchByContent,
};
