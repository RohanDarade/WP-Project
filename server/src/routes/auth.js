import express from "express";
import { User } from "../models/user.js";
import Joi from "joi";
import bcrypt from "bcrypt";
import passwordComplexity from "joi-password-complexity";

const complexityOptions = {
  min: 8,
  max: 30,
  lowerCase: 1,
  upperCase: 1,
  numeric: 1,
  symbol: 1,
};

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { error } = validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).send("Invalid email or password");
    }

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword)
      return res.status(401).send("Invalid email or password");

    const token = user.generateAuthToken();
    res.status(200).send({ data: token, message: "Login successful" });
  } catch (error) {
    res.status(500).send("Something went wrong");
  }
});

const validateUser = (user) => {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).required().email(),
    password: passwordComplexity(complexityOptions).required(),
  });
  return schema.validate(user);
};

export default router;
