const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// Routes
router.post("/add", userController.addUser);
router.get("/", userController.getUsers);
router.get("/:id", userController.getUserById);
router.put("/update/:id", userController.updateUser);
router.delete("/delete/:id", userController.deleteUser);

module.exports = router;
