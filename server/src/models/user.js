import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../constants/config.js";
import Joi from "joi";
import pkg from 'joi-password-complexity';
const {JoiPasswordComplexity} = pkg;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 2,
    max: 25,
    unique: false,
  },
  email: {
    type: String,
    required: true,
    max: 255,
    min: 5,
    unique: true,
  },
  password: {
    type: String,
    required: false,
    max: 1024,
    min: 8,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, name: this.name, email: this.email },
    JWT_SECRET,
    { expiresIn: "7d" }
  );
  return token;
};

const User = mongoose.model("user", userSchema);

const validateUser = (user) => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(25).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: JoiPasswordComplexity.string()
      .minOfSpecialCharacters(1)
      .minOfLowercase(1)
      .minOfUppercase(1)
      .minOfNumeric(1)
      .min(8)
      .required(),
  });
  return schema.validate(user);
};

export { User, validateUser };
