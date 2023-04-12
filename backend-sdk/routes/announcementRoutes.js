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


export default router;
