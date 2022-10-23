import { Router } from "express";
import OfficeBearer from "../models/OfficeBearer.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const officeBearers = await OfficeBearer.find({});
    res.status(200).json(officeBearers);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const officeBearer = await OfficeBearer.findOne({
      _id: req.params.id,
    });
    if (!officeBearer) {
      return res.status(404).json({ error: "Not Found" });
    } else {
      res.status(200).json(officeBearer);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

router.post("/add", async (req, res) => {
  try {
    const officeBearer = await OfficeBearer.create(req.body);
    res.status(201).json({ officeBearer: officeBearer._id });
  } catch (err) {
    console.log(err);
    if (err.code === 11000) {
      res.status(409).json({ error: "Already exists" });
    } else {
      res.status(500).json({ error: err.message });
    }
  }
});

router.put("/update/:id", async (req, res) => {
  try {
    const officeBearer = await OfficeBearer.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    if (!officeBearer) {
      return res.status(404).json({ error: "Not Found" });
    } else {
      res.status(200).json(officeBearer);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const officeBearer = await OfficeBearer.findOneAndDelete({
      _id: req.params.id,
    });
    if (!officeBearer) {
      return res.status(404).json({ error: "Not Found" });
    } else {
      res.status(200).json(officeBearer);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

router.delete("/deleteAll", async (req, res) => {
  try {
    const officeBearers = await OfficeBearer.deleteMany({});
    res.status(200).json(officeBearers);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
