import { Router } from "express";
import Announcement from "../models/Announcement.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const announcement = await Announcement.find({});
    res.status(200).json(announcement);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const announcement = await Announcement.findOne({
      _id: req.params.id,
    });
    if (!announcement) {
      return res.status(404).json({ error: "Not Found" });
    } else {
      res.status(200).json(announcement);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

router.post("/add", async (req, res) => {
  try {
    const announcement = await Announcement.create({
      ...req.body,
    });
    res.status(201).json({ announcement: announcement._id });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

router.put("/update/:id", async (req, res) => {
  try {
    const announcement = await Announcement.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!announcement) {
      return res.status(404).json({ error: "Not Found" });
    } else {
      res.status(200).json(announcement);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const announcement = await Announcement.findByIdAndDelete(req.params.id);
    if (!announcement) {
      return res.status(404).json({ error: "Not Found" });
    } else {
      res.status(200).json(announcement);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
