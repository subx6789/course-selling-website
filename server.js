const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const adminRoutes = require("./routes/adminRoutes");
const userRoutes = require("./routes/userRoutes");
require("dotenv").config();
const app = express();
connectDB();
app.use(bodyParser.json());
app.use("/admin", adminRoutes);
app.use("/user", userRoutes);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
