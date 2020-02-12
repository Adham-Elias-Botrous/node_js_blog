const createError = require('http-errors');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const bcrypt = require('bcryptjs');

exports.login = async (req, res, next) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (!user) throw createError(401, 'incorrect email or password!');
    let comparePassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!comparePassword)
      throw createError(401, 'incorrect email or password!!');
    let data = {
      id: user._id,
      name: user.name,
      email: user.email
    };
    let token = jwt.sign(data, process.env.JWT_SECRET);
    res.json({ token: token, id: user._id });
  } catch (error) {
    next(error);
  }
};
