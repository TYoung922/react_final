const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const prisma = new PrismaClient();

// Register a new User
const register = async (req, res) => {
  const { username, email, password, profileImage } = req.body; // Add profileImage

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        profileImage: profileImage || null,
      }, // Handle profileImage
    });
    res.status(201).json(newUser);
  } catch (error) {
    // Check for unique constraint violation
    if (error.code === "P2002") {
      res.status(400).json({ error: "Username or email already exists." });
    } else {
      console.error(error); // Add console logging for better debugging
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
      res.json({ token });
    } else {
      res.sendStatus(401);
    }
  } catch (error) {
    res.sendStatus(500);
  }
};

module.exports = { register, login };
