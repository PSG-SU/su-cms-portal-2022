import { Router } from "express";
import General from "../../models/Club/General.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const general = await General.find({});
    res.status(200).json(general);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

router.get("/:user", async (req, res) => {
  try {
    const general = await General.findOne({
      user: req.params.user,
    });
    if (!general) {
      return res.status(404).json({ error: "Not Found" });
    } else {
      res.status(200).json(general);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

router.post("/add", async (req, res) => {
  try {
    const general = await General.create({
      ...req.body,
    });
    res.status(201).json({ general: general._id });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

router.put("/update/:user", async (req, res) => {
  try {
    const general = await General.findOneAndUpdate(
      { user: req.params.user },
      req.body,
      { new: true }
    );
    if (!general) {
      // return res.status(404).json({ error: "Not Found" });
      try {
        const general = await General.create({
          ...req.body,
        });
        res.status(201).json({ general: general._id });
      } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
      }
    } else {
      res.status(200).json(general);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

export default router;