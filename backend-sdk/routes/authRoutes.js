import { Router } from "express";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = Router();

export const SECRET = "sucms.psgtech";

router.post("/add", async (req, res) => {
  const { userId, password, rights, caID } = req.body;
  try {
    const user = await User.create({
      userId: userId,
      // password: bcrypt.hashSync(password, 10),
      password: password,
      rights: rights,
      caID: caID,
    });
    res.status(201).json({ user: user._id });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

router.get("/unique/:id", async (req, res) => {
  try {
    const user = await User.findOne({
      _id: req.params.id,
    });
    if (!user) {
      return res.status(404).json({ error: "Not Found" });
    } else {
      res.status(200).json(user);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

router.get("/id/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({ userId: id });
    if (user) {
      return res.status(200).json(user);
    }
    res.status(404).json({ message: "User not found!" });
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
      // const auth = bcrypt.compareSync(password, user.password);
      const auth = password === user.password;
      if (auth) {
        res.status(200).json({
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

router.put("/update/:id", async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.params.id },
      // req.body.password ? { ...req.body, password: bcrypt.hashSync(req.body.password, 10) } : req.body,
      req.body,
      {}
    );
    if (!user) return res.status(404).json({ error: "User not found" });
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const user = await User.findOneAndDelete({ _id: req.params.id });
    if (!user) return res.status(404).json({ error: "User not found" });
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
