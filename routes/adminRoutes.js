const express = require("express");
const { authenticateToken } = require("../middleware/auth");
const {
  adminSignUp,
  adminSignIn,
  createCourse,
  getCourses,
  updateCourse,
  deleteCourse,
  getUsers,
} = require("../controllers/adminController");
const router = express.Router();
router.post("/signup", adminSignUp);
router.post("/signin", adminSignIn);
router.post("/createCourse", authenticateToken, createCourse);
router.get("/courses", authenticateToken, getCourses);
router.put("/updateCourse/:courseId", authenticateToken, updateCourse);
router.delete("/deleteCourse/:courseId", authenticateToken, deleteCourse);
router.get("/showUsers", authenticateToken, getUsers);
module.exports = router;
