const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");
const validateUser = require("../middlewares/validateUser");
const validateObjectId = require("../middlewares/validateObjectId");
const upload = require("../middlewares/uploads");
// Routes
/**
 * @swagger
 * /api/users/add-user:
 *   post:
 *     consumes:
 *       - multipart/form-data
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               profileImage:
 *                 type: string
 *                 format: binary
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               age:
 *                 type: number
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User added successfully
 */
router.post("/add-user", upload.single("profileImage"), validateUser, userController.addUser);
/**
 * @swagger
 * /api/users/signup:
 *   post:
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *               - age
 *             properties:
 *               name:
 *                 type: string
 *                 example: Owais
 *               email:
 *                 type: string
 *                 example: owais@example.com
 *               password:
 *                 type: string
 *                 example: 123456
 *               age:
 *                 type: number
 *                 example: 22
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: User registered successfully
 *               data:
 *                 userId: 1
 *                 id: 65f123abc123
 *                 name: Owais
 *                 email: owais@example.com
 *                 age: 22
 *       400:
 *         description: Validation error or email already exists
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Name, email, age and password are required
 *       500:
 *         description: Server error
 */
router.post("/signup", userController.signup);
/**
 * @swagger
 * /api/users/login:
 *   post:
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: owais@example.com
 *               password:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *               user:
 *                 id: 65f123abc123
 *                 name: Owais
 *                 email: owais@example.com
 *       400:
 *         description: User not found or invalid password
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: User not found
 *       500:
 *         description: Server error
 */
router.post("/login", userController.loginUser);
/**
 * @swagger
 * /api/users:
 *   get:
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of users
 *       401:
 *         description: Unauthorized
 */
router.get("/", authMiddleware, userController.getUsers);
/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: User ID (MongoDB ObjectId)
 *         schema:
 *           type: string
 *           example: 65f123abc123
 *     responses:
 *       200:
 *         description: User fetched successfully
 *         content:
 *           application/json:
 *             example:
 *               _id: 65f123abc123
 *               name: Owais
 *               email: owais@example.com
 *               age: 22
 *       400:
 *         description: User not found
 *         content:
 *           text/plain:
 *             example: User not found
 *       500:
 *         description: Server error
 */
router.get("/:id", validateObjectId, userController.getUserById);
/**
 * @swagger
 * /api/users/update/{id}:
 *   put:
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: User ID
 *         schema:
 *           type: string
 *           example: 65f123abc123
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Owais Updated
 *               email:
 *                 type: string
 *                 example: owais@gmail.com
 *               age:
 *                 type: number
 *                 example: 25
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: User updated successfully
 *               user:
 *                 _id: 65f123abc123
 *                 name: Owais Updated
 *                 email: owais@gmail.com
 *                 age: 25
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
router.put("/update/:id", validateObjectId, userController.updateUser);
/**
 * @swagger
 * /api/users/delete/{id}:
 *   delete:
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: User ID
 *         schema:
 *           type: string
 *           example: 65f123abc123
 *     responses:
 *       200:
 *         description: User deleted successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: User deleted successfully
 *               user:
 *                 _id: 65f123abc123
 *                 name: Owais
 *                 email: owais@example.com
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
router.delete("/delete/:id", validateObjectId, userController.deleteUser);

module.exports = router;
