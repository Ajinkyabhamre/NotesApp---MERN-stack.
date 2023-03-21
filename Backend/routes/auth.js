const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
var fetchuser = require("../middleware/fetchuser");

const JWT_SECRET = "!@#$%secretkey!@#$%";

// ROUTE.1 : Create a User using POST: "/api/auth/createuser" No login required
router.post(
  "/createuser",
  [
    body("name", "Enter a valid name...").isLength({ min: 3 }),
    body("email", "Enter a valid email...").isEmail(),
    body("password", "Enter a valid password...").isLength({ min: 5 }),
  ],
  async (req, res) => {
    //If there are errors, return Bad requests and errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      let user = await User.findOne({ email: req.body.email });
      //console.log(user);
      if (user) {
        return res.status(400).json({
          error: "Sorry a user wth this email id is already registered.",
        });
      }
      //using salt & bcript.js
      const salt = await bcrypt.genSalt(10);
      const securePass = await bcrypt.hash(req.body.password, salt);

      //create a new user
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: securePass,
      });

      const data = {
        user: {
          id: user.id,
        },
      };
      const AuthToken = jwt.sign(data, JWT_SECRET);
      console.log(AuthToken);

      //res.json(user);

      res.json({ AuthToken });

      //catch errors
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Some Error Ocuured !");
    }
  }
);

//ROUTE.2 : Authenticate  a User using POST: "/api/auth/login"

router.post(
  "/login",
  [
    body("email", "Enter a valid email...").isEmail(),
    body("password", "password cannot be blank").exists(),
  ],
  async (req, res) => {
    //If there are errors, return Bad requests and errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      //pulling email from database to authenticate
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ errors: "Please try to login with correct credentials " });
      }

      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res
          .status(400)
          .json({ errors: "Please try to login with correct credentials " });
      }

      const data = {
        user: {
          id: user.id,
        },
      };
      const AuthToken = jwt.sign(data, JWT_SECRET);
      res.json({ AuthToken });
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Some Error Ocuured !");
    }
  }
);

//ROUTE.3 : Get loggedin User Details using POST: "/api/auth/getUser". LOGIN REQUIRED
router.post("/getUser", fetchuser, async (req, res) => {
  try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Some Error Ocuured !");
  }
});

module.exports = router;
