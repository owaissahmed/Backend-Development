const User = require("../models/user");

// Add User
exports.addUser = async (req, res, next) => {
  try {
    const user = new User(req.body);
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
