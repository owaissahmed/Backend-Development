const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const validateUser = require("../middlewares/validateUser");
// Routes
router.post("/add", validateUser, userController.addUser);
router.get("/", userController.getUsers);
router.get("/:id", userController.getUserById);
router.put("/update/:id", userController.updateUser);
router.delete("/delete/:id", userController.deleteUser);

module.exports = router;
