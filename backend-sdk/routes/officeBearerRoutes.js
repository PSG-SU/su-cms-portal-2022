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

router.get("/:role", async (req, res) => {
  try {
    const officeBearer = await OfficeBearer.findOne({
      role: req.params.role,
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
    const officeBearer = await OfficeBearer.create({
      ...req.body,
      role: req.body.role.toLowerCase(),
    });
    res.status(201).json({ officeBearer: officeBearer._id });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

router.put("/update/:role", async (req, res) => {
  try {
    const officeBearer = await OfficeBearer.findOneAndUpdate(
      { role: req.params.role },
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

router.delete("/delete/:role", async (req, res) => {
  try {
    const officeBearer = await OfficeBearer.findOneAndDelete({
      role: req.params.role,
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

export default router;
