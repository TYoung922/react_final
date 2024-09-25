const express = require("express");
const {
  createYodel,
  getAllYodels,
  getYodelById,
  getUsersYodels,
  searchByContent,
} = require("../controllers/yodelController");
const { authenticateJWT } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authenticateJWT, createYodel);
router.get("/", getAllYodels);
router.get("/search", searchByContent); // Search Yodels by content
router.get("/:id", getYodelById); // Get a single Yodel by ID
router.get("/user/:userId", getUsersYodels); // get all of a single user's Yodels

module.exports = router;
