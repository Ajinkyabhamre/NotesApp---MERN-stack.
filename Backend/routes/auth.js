const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");

//Create a User using POST: "/api/auth/createuser" No login required
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
      //create a new user
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });

      res.json(user);

      //catch errors
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Some Error Ocuured !");
    }
  }
);

module.exports = router;
