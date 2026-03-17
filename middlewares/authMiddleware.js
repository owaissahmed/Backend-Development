const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).send({
        success: false,
        message: "No token provided"
      });
    }

    // Split "Bearer <token>"
    const token = authHeader.split(" ")[1];  
    if (!token) {
      return res.status(401).send({
        success: false,
        message: "Invalid Token"
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    next();

  } catch (error) {
    res.status(401).send({
      success: false,
      message: "Invalid Token"
    });
  }
};

module.exports = authMiddleware;