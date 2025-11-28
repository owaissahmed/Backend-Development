const User = require("../models/user");

// Add User
exports.addUser = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.send({ message: "User added successfully", user });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Get All Users
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Get Single User
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).send("User not found");
    res.send(user);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Update User
exports.updateUser = async (req, res) => {
  try {
    const id = req.params.id
    const body = req.body

    if (!id || id.length !== 24) {
      return res.status(400).send({
        success: false,
        message: "Invalid user ID",
      });
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      body,
      { new: true }
    );

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
    // ⚠ Server error
    res.status(500).send({
      success: false,
      message: "Server error",
      error: err.message,
    });
  }
};

// DELETE User

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    // 🔒 Validate MongoDB ID
    if (!id || id.length !== 24) {
      return res.status(400).send({
        success: false,
        message: "Invalid user ID",
      });
    }

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
    // ⚠ Server error
    res.status(500).send({
      success: false,
      message: "Server error",
      error: err.message,
    });
  }
};
