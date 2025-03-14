const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // "Bearer token"
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Store decoded user in request
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid or Expired Token" });
  }
};

module.exports = authMiddleware;
