import { Router } from "express";
import Log from "../models/Log.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const log = await Log.find({});
    res.status(200).json(log);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const log = await Log.findOne({
      _id: req.params.id,
    });
    if (!log) {
      return res.status(404).json({ error: "Not Found" });
    } else {
      res.status(200).json(log);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

router.post("/add", async (req, res) => {
  try {
    const log = await Log.create({
      ...req.body,
    });
    res.status(201).json({ log: log._id });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

router.put("/update/:id", async (req, res) => {
  try {
    const log = await Log.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!log) {
      return res.status(404).json({ error: "Not Found" });
    } else {
      res.status(200).json(log);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const log = await Log.findByIdAndDelete(req.params.id);
    if (!log) {
      return res.status(404).json({ error: "Not Found" });
    } else {
      res.status(200).json(log);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
