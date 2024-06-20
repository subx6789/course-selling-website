const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const Course = require("../models/course");
exports.userSignUp = async (req, res) => {
  const { username, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      username,
      password: hashedPassword,
    });
    await user.save();
    res.status(201).json({
      message: "User created successfully",
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};
exports.userSignIn = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({
        message: "Invalid Credentials",
      });
    } else {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({
          message: "Invalid Credentials",
        });
      } else {
        const token = jwt.sign({ id: user._id }, process.env.JWT_PASSWORD);
        res.json({
          token,
        });
      }
    }
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};
exports.getCourses = async (req, res) => {
  try {
    const courses = await Course.find({ published: true });
    res.json({
      courses,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};
exports.purchaseCourse = async (req, res) => {
  const courseId = req.params.courseId;
  try {
    const user = await User.findById(req.user.id);
    user.purchasedCourses.push(courseId);
    await user.save();
    res.json({
      message: "Course purchased successfully",
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

exports.getPurchasedCourses = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("purchasedCourses");
    res.json({
      purchasedCourses: user.purchasedCourses,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};
