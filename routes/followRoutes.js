const express = require("express");
const { followUser, unfollowUser } = require("../controllers/followController");
const { authenticateJWT } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/:userId/follow", authenticateJWT, followUser);
router.post("/:userId/unfollow", authenticateJWT, unfollowUser);

module.exports = router;
