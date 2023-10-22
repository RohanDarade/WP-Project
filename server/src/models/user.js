import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../constants/config.js";
import Joi from "joi";
import passwordComplexity from 'joi-password-complexity';

const complexityOptions = {
  min: 8,
  max: 30,
  lowerCase: 1,
  upperCase: 1,
  numeric: 1,
  symbol: 1,
};

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
    password: passwordComplexity(complexityOptions).required(),
  });
  return schema.validate(user);
};

export { User, validateUser };
