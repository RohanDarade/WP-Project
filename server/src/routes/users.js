import express from "express";
import { User, validateUser } from "../models/user.js";
import bcrypt from "bcrypt";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { error } = validateUser(req.body);
    
    if (error) return res.status(400).send(error.details[0].message);
    
    const user = await User.findOne({ email: req.body.email });
    
    if (user) return res.status(409).send("User already registered.");

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });

    await newUser.save();

  } catch (error) {
    console.log(error);
    return res.status(500).send("Something went wrong.");
  }
});

export default router;