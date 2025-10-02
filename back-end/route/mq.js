const express = require("express");
const { publishEvent } = require("../utlis/RabbitMQ");
const router = express.Router();

router
  .route("/auth")
  .get(async (req, res, next) => {})
  .post(async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    try {

      publishEvent({ to:email , subject:'Sign-up successfully', username } ,'sign-up');

      res.status(201).json({ message: "User created successfully" });

    } catch (err) {

      console.error(err);
      res.status(500).json({ error: "Internal server error" });
      
    }
  });

module.exports = router;
