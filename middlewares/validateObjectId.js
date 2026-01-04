const mongoose = require("mongoose");

const validateObjectId = (req, res, next) => {
  const { id } = req.params;

  // 🔒 Check: ID exist karti hai?
  if (!id) {
    return res.status(400).send({
      success: false,
      message: "ID is required",
    });
  }

  // 🔍 Check: Valid MongoDB ObjectId?
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      success: false,
      message: "Invalid ID format",
    });
  }
  next();
};

module.exports = validateObjectId;