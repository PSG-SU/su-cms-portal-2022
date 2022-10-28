import { Router } from "express";
import NssStaff from "../models/NssStaff.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const nssStaffs = await NssStaff.find({});
    res.status(200).json(nssStaffs);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const nssStaff = await NssStaff.findOne({
      _id: req.params.id,
    });
    if (!nssStaff) {
      return res.status(404).json({ error: "Not Found" });
    } else {
      res.status(200).json(nssStaff);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

router.post("/add", async (req, res) => {
  try {
    const nssStaff = await NssStaff.create({
      ...req.body,
      scheme: req.body.scheme,
    });
    res.status(201).json({ nssStaff: nssStaff._id });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

router.put("/update/:id", async (req, res) => {
  try {
    const nssStaff = await NssStaff.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!nssStaff) {
      return res.status(404).json({ error: "Not Found" });
    } else {
      res.status(200).json(nssStaff);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});


router.delete("/delete/:id", async (req, res) => {
  try {
    const nssStaff = await NssStaff.findOneAndDelete({
      _id: req.params.id,
    });
    if (!nssStaff) {
      return res.status(404).json({ error: "Not Found" });
    } else {
      res.status(200).json(nssStaff);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});


export default router;
