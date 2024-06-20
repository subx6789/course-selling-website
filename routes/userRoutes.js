const express = require("express");
const { authenticateToken } = require("../middleware/auth");
const {
  userSignUp,
  userSignIn,
  getCourses,
  purchaseCourse,
  getPurchasedCourses,
} = require("../controllers/usercontroller");
const router = express.Router();
router.post("/signup", userSignUp);
router.post("/signin", userSignIn);
router.get("/courses", authenticateToken, getCourses);
router.post("/courses/:courseId", authenticateToken, purchaseCourse);
router.get("/purchasedCourses", authenticateToken, getPurchasedCourses);
module.exports = router;
