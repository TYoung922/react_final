const express = require("express");
const {
  followUser,
  unfollowUser,
  getUserFollowing,
} = require("../controllers/followController");
const { authenticateJWT } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/:userId/follow", followUser);
router.post("/:userId/unfollow", unfollowUser);
router.get("/:userId/followList", getUserFollowing);

module.exports = router;
