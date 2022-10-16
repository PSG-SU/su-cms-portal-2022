import { Router } from "express";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = Router();

export const SECRET = "sucms.psgtech";

router.post("/signup", async (req, res) => {
  const { userId, password, rights, associationName } = req.body;
  try {
    const user = await User.create({
      userId: userId,
      password: bcrypt.hashSync(password, 10),
      rights: rights,
      associationName: associationName,
    });
    res.status(201).json({ user: user._id });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

router.post("/login", async (req, res) => {
  const { userId, password } = req.body;
  try {
    const user = await User.findOne({ userId: userId });
    if (user) {
      const auth = bcrypt.compareSync(password, user.password);
      if (auth) {
        res
          .status(200)
          .json({
            token: jwt.sign({ _id: user._id }, SECRET),
            rights: user.rights,
          });
      } else {
        res.status(401).json({ error: "Invalid credentials" });
      }
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

router.get("/login", async (req, res) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, SECRET, (err, decoded) => {
      if (err) {
        res.status(401).json({ error: "Not Authorized" });
      } else {
        res.status(200).json({ token: token, message: "Authorized" });
      }
    });
  } else {
    res.status(401).json({ error: "Token not provided" });
  }
});

export const isLoggedIn = (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, SECRET, (err, decoded) => {
      if (err) {
        res.status(401).json({ error: "Not Authorized" });
      } else {
        req.user = decoded;
        next();
      }
    });
  } else {
    res.status(401).json({ error: "Token not provided" });
  }
};

export default router;
