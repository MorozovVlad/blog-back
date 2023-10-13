import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import { validationResult } from "express-validator";

import { registerValidation } from "./validations/auth.js";

import UserModel from "./models/User.js";
import checkAuth from "./utils/checkAuth.js";
import User from "./models/User.js";

import * as UserController from "./controllers/UserController.js";

mongoose
  .connect(
    "mongodb+srv://admin:1239@myblog.mjftcns.mongodb.net/blog?retryWrites=true&w=majority"
  )
  .then(() => console.log("DB ok"))
  .catch((err) => console.log("DB error ", err));

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello world!!!");
});

app.post("/auth/login", UserController.login);

app.post("/auth/register", registerValidation, UserController.register);

app.post("/auth/me", checkAuth, UserController.getMe);

app.listen(4444, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log("The server has started ");
});
