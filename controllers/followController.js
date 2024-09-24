const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// Follow a user
const followUser = async (req, res) => {
  const { userId } = req.params; // User ID to follow
  const followerId = req.user.id; // Current user ID (from the JWT)

  try {
    // Check if the user to follow exists
    const userToFollow = await prisma.user.findUnique({
      where: { id: parseInt(userId) },
    });

    if (!userToFollow) {
      return res.status(404).json({ error: "User not found." });
    }

    // Create a relationship in the following table
    await prisma.user.update({
      where: { id: followerId },
      data: {
        following: {
          connect: { id: parseInt(userId) },
        },
      },
    });

    res.status(200).json({ message: `User ${userId} followed.` });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ error: "Unable to follow user." });
  }
};

// Unfollow a user
const unfollowUser = async (req, res) => {
  const { userId } = req.params; // User ID to unfollow
  const followerId = req.user.id; // Current user ID (from the JWT)

  try {
    // Check if the user to unfollow exists
    const userToUnfollow = await prisma.user.findUnique({
      where: { id: parseInt(userId) },
    });

    if (!userToUnfollow) {
      return res.status(404).json({ error: "User not found." });
    }

    // Remove the relationship in the following table
    await prisma.user.update({
      where: { id: followerId },
      data: {
        following: {
          disconnect: { id: parseInt(userId) },
        },
      },
    });

    res.status(200).json({ message: `User ${userId} unfollowed.` });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ error: "Unable to unfollow user." });
  }
};

module.exports = { followUser, unfollowUser };
