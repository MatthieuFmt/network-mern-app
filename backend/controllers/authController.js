import UserModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import { logInErrors, signUpErrors } from "./utils/errorsUtils.js";

const maxAge = 3600000;
//  1 * 24 * 60 * 60 * 1000;

const createToken = (id) => {
  return jwt.sign({ id }, process.env.TOKEN_SECRET, {
    expiresIn: maxAge,
  });
};

export const signUp = async (req, res) => {
  const { pseudo, password } = req.body;
  try {
    const user = await UserModel.create({ pseudo, password });

    //
    const userLog = await UserModel.login(pseudo, password);
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge });
    res.status(201).send({ user: user._id });

    //
    // res.status(201).send({ user: user._id });
  } catch (err) {
    const errors = signUpErrors(err);

    res.status(200).send({ errors });
  }
};

export const logIn = async (req, res) => {
  const { pseudo, password } = req.body;

  try {
    const user = await UserModel.login(pseudo, password);
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge });
    res.status(201).send({ user: user._id });
  } catch (err) {
    const errors = logInErrors(err);
    res.status(200).send({ errors });
  }
};

export const logOut = async (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/");
};
