const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Admin = require("../models/admin");
const User = require("../models/user");
const Course = require("../models/course");
exports.adminSignUp = async (req, res) => {
  const { username, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = new Admin({
      username,
      password: hashedPassword,
    });
    await admin.save();
    res.status(201).json({
      message: "Admin created successfully",
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};
exports.adminSignIn = async (req, res) => {
  const { username, password } = req.body;
  try {
    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    } else {
      const isMatch = await bcrypt.compare(password, admin.password);
      if (!isMatch) {
        return res.status(400).json({
          message: "Invalid credentials",
        });
      } else {
        const token = jwt.sign(
          { id: admin._id, role: "admin" },
          process.env.JWT_PASSWORD
        );
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

exports.createCourse = async (req, res) => {
  const { title, description, price, imageLink } = req.body;
  try {
    const course = new Course({
      title,
      description,
      price,
      imageLink,
      published: true,
    });
    await course.save();
    res.status(201).json({
      message: "Course created successfully",
      couseId: course._id,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

exports.getCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.json({
      courses,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

exports.updateCourse = async (req, res) => {
  const { courseId } = req.params;
  const { title, description, price, imageLink } = req.body;
  try {
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        message: "Course not found",
      });
    } else {
      course.title = title || course.title;
      course.description = description || course.description;
      course.price = price || course.price;
      course.imageLink = imageLink || course.imageLink;
      await course.save();
      res.json({
        message: "Course updated successfully",
      });
    }
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};
exports.deleteCourse = async (req, res) => {
  const { courseId } = req.params;
  try {
    const course = await Course.findByIdAndDelete(courseId);
    if (!course) {
      return res.status(404).json({
        message: "Course not found",
      });
    } else {
      res.json({
        message: "Course deleted successfully",
      });
    }
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({}, "-password").populate(
      "purchasedCourses",
      "title description price imageLink"
    );
    res.json({ users });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};
