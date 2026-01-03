const validateUser = (req, res, next) => {
  const { email, age } = req.body;

  if (!email) {
    return res.status(400).send({
      success: false,
      message: "Email is required",
    });
  }

  if (!age || age < 18) {
    return res.status(400).send({
      success: false,
      message: "Age must be 18+",
    });
  }

  // sab sahi hai → controller pe jao
  next();
};

module.exports = validateUser;
