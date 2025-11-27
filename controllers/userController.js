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
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedUser) return res.status(404).send("User not found");

    res.send(updatedUser);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Delete User
exports.deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);

    if (!deletedUser) return res.status(404).send("User not found");

    res.send({ message: "User deleted", deletedUser });
  } catch (err) {
    res.status(500).send(err.message);
  }
};
