const { hashPassword, comparePassword } = require("../helpers/auth");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

//register endpoint
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existName = await User.findOne({ name });
    if (existName) {
      return res.json({
        error: "Name is already taken",
      });
    }
    if (!name) {
      return res.json({
        error: "name is required",
      });
    }
    if (!password || password.length < 6) {
      return res.json({
        error: "Password is required and should be atleast 6 characters long.",
      });
    }
    if (!email) {
      return res.json({
        error: "Email is required",
      });
    }
    const exist = await User.findOne({ email });
    if (exist) {
      return res.json({
        error: "email is already in use.",
      });
    }
    const hashedPass = await hashPassword(password);

    const user = await User.create({
      name,
      email,
      password: hashedPass,
    });

    return res.json(user);
  } catch (error) {
    console.log(error);
  }
};

//login endpoint

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    //check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({
        error: "No user found",
      });
    }
    const isvalidPass = await comparePassword(password, user.password);
    if (!isvalidPass) {
      return res.json({
        error: "Enter the correct password",
      });
    } else {
    }

    //check if password matches

    const match = await comparePassword(password, user.password);
    if (match) {
      jwt.sign(
        { email: user.email, id: user._id, name: user.name },
        "234234558260",
        {},
        (err, token) => {
          if (err) throw err;
          res.cookie("token", token).json(user);
        }
      );
    }
    if (!match) {
      res.json({
        error: "Password do not match",
      });
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  registerUser,
  loginUser,
};
