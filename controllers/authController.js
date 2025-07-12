const passport = require("passport");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");

// LOGIN
const loginLocal = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.status(401).json({ error: info.message });

    req.login(user, (err) => {
      if (err) return next(err);
      const userCopy = { ...user.toObject(), password: undefined };
      return res.status(200).json({
        message: "Login successful",
        data: { user: userCopy },
        statusCode: 200,
      });
    });
  })(req, res, next);
};

// LOGOUT
const logoutRequest = (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    req.session.destroy(() => {
      res.clearCookie("connect.sid");
      res.status(200).json({ message: "Logout successful", statusCode: 200 });
    });
  });
};

// SIGNUP
const signupRequest = async (req, res, next) => {
  const { firstName, lastName, username, password, googleId, githubId } =
    req.body;
  if (!firstName || !username || !password) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      firstName,
      lastName,
      username,
      password: hashedPassword,
      googleId,
      githubId,
    });

    await newUser.save();

    req.login(newUser, (err) => {
      if (err) return next(err);
      newUser.password = undefined;
      res.status(201).json({
        message: "Signup successful",
        data: { user: newUser },
        statusCode: 201,
      });
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  loginLocal,
  logoutRequest,
  signupRequest,
};
