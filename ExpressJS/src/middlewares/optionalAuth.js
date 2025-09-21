const jwt = require("jsonwebtoken");

const optionalAuth = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = {
        userId: decoded.userId,
        email: decoded.email,
        name: decoded.name,
      };
    } catch (error) {
      console.log("Token không hợp lệ (bỏ qua):", error.message);
    }
  }
  next(); // luôn cho đi
};

module.exports = optionalAuth;