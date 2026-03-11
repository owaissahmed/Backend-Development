const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Counter = require("../models/counter");
const sendEmail = require("../config/email");
// signup

exports.signup = async (req, res, next) => {
  try {
    const { name, email, password, age } = req.body;
    if (!name || !email || !password || !age) {
      return res.status(400).send({
        success: false,
        message: "Name, email, age and password are required",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).send({
        success: false,
        message: "email already exist",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const counter = await Counter.findOneAndUpdate(
      { name: "userId" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true },
    );
    const user = new User({
      ...req.body,
      userId: counter.seq,
    });

    await user.save();

    await sendEmail(
      user.email,
      "Welcome to our App",
      `Hello ${user.name}, your account has been created successfully`
    );
    res.status(201).send({
      success: true,
      message: "User registered successfully",
      data: {
        userId: user.userId,
        id: user._id,
        name: user.name,
        email: user.email,
        age: user.age,
      },
    });
  } catch (err) {
    next(err);
  }
};

// Add User

exports.loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid password",
      });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.addUser = async (req, res, next) => {
  try {

    const user = new User({
      ...req.body,
      profileImage: req.file ? req.file.filename : null
    });

    await user.save();

    res.status(201).send({
      success: true,
      message: "User added successfully",
      data: user,
    });
  } catch (err) {
    next(err);
  }
};

// Get All Users
exports.getUsers = async (req, res, next) => {
  try {
    let { age, search, page = 1, limit = 10 } = req.query;

    // 🔍 Filter
    const filter = {};
    if (age) {
      filter.age = Number(age);
    }
    if (search) {
      filter.name = { $regex: search, $options: "i" };
    }
    // 🔢 Pagination values
    page = Number(page);
    limit = Number(limit);
    const skip = (page - 1) * limit;

    // 📦 Data
    const users = await User.find(filter).skip(skip).limit(limit);

    const totalDocs = await User.countDocuments(filter);

    res.status(200).send({
      success: true,
      message: "Users Fetch Successfully",
      totalDocs,
      currentPage: page,
      totalPages: Math.ceil(totalDocs / limit),
      users,
    });
  } catch (err) {
    next(err);
  }
};

// Get Single User
exports.getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(400).send("User not found");
    res.status(200).send(user);
  } catch (err) {
    next(err);
  }
};

// Update User
exports.updateUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const body = req.body;
    const updatedUser = await User.findByIdAndUpdate(id, body, { new: true });

    if (!updatedUser) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).send({
      success: true,
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (err) {
    next(err);
  }
};

// DELETE User

exports.deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const deletedUser = await User.findByIdAndDelete(id);

    // 🔍 If user not found
    if (!deletedUser) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    // ✅ Success
    res.status(200).send({
      success: true,
      message: "User deleted successfully",
      user: deletedUser,
    });
  } catch (err) {
    next(err);
  }
};
