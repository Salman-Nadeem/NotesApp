const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/User")

// ✅ User Registration
const register = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({ message: "Sabhi fields ko fill karna zaroori hai." });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Yeh email address pehle se registered hai." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ firstName, lastName, email, password: hashedPassword });

    await newUser.save();

    res.status(201).json({ message: "User successfully registered." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error." });
  }
};

// ✅ User Login
const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email aur password dono dena zaroori hai." });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Yeh email address pe koi user nahi mil raha." });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Password galat hai. Kripya sahi password dijiye." });
    }

    // ✅ Generate JWT Token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    return res.status(200).json({
      message: "Login successful",
      token,
      user: { id: user._id, firstName: user.firstName, lastName: user.lastName, email: user.email }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error." });
  }
};

// ✅ Fetch All Users

// ✅ Exporting the functions for use in routes
module.exports = { register, login };
