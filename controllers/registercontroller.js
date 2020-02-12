const User = require('../models/user');
const bcrypt = require('bcryptjs');
const createError = require('http-errors');

exports.register = async (req, res, next) => {
  try {
    if (!req.body.password.trim().length)
      throw createError(422, "User validation failed: Password can't be blank");
    let data = {
      name: req.body.name.trim(),
      email: req.body.email,
      password: await bcrypt.hash(req.body.password, 10)
    };
    await User.create(data);

    res.status(200).end();
  } catch (error) {
    next(error);
  }
};
