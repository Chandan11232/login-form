const express = require("express");
const router = express.Router();
const cors = require("cors");
const { registerUser, loginUser } = require("../controllers/authController");

router.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

router.get("/", (req, res) => {
  res.send("test is working");
});
router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;
