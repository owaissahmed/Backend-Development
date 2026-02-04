const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const validateUser = require("../middlewares/validateUser");
const validateObjectId = require("../middlewares/validateObjectId");
// Routes
router.post("/add", validateUser, userController.addUser);
router.post("/signup", userController.signup);
router.get("/", userController.getUsers);
router.get("/:id", validateObjectId, userController.getUserById);
router.put("/update/:id", validateObjectId, userController.updateUser);
router.delete("/delete/:id", validateObjectId, userController.deleteUser);

module.exports = router;
