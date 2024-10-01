const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const prisma = new PrismaClient();

// Register a new User
const register = async (req, res) => {
  const { username, email, password, profileImage } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        profileImage: profileImage || null,
      },
    });
    res.status(201).json(newUser);
  } catch (error) {
    if (error.code === "P2002") {
      res.status(400).json({ error: "Username or email already exists." });
    } else {
      console.error(error);
      res.status(400).json({ error: "Unable to register." });
    }
  }
};

// Login a User
const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { username } });

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      res.json({ token, userId: user.id });
    } else {
      res.sendStatus(401);
    }
  } catch (error) {
    res.sendStatus(500);
  }
};

const deleteUser = async (req, res) => {
  const userId = req.user.id;

  try {
    const user = await prisma.user.delete({
      where: { id: userId },
    });
    res.status(200).json({ message: "User deleted successfully", user });
  } catch (error) {
    console.error(error);
    if (error.code === "P2025") {
      res.status(400).json({ error: "User not found" });
    } else {
      res.status(500).json({ error: "Unable to delete user" });
    }
  }
};

module.exports = { register, login, deleteUser };
