import { Router } from "express";
import SuTeam from "../models/SUTeam.js";
import Log from "../models/Log.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const suTeams = await SuTeam.find({});
    res.status(200).json(suTeams);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const suTeam = await SuTeam.findById(req.params.id);
    if (!suTeam) {
      return res.status(404).json({ error: "Not Found" });
    } else {
      res.status(200).json(suTeam);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

router.post("/add", async (req, res) => {
  try {
    const suTeam = await SuTeam.create({
      ...req.body,
    });
    res.status(201).json({ suTeam: suTeam._id });

    const log = await Log.create({
      user: req.body.login,
      action: "Added",
      section: "SU Team Staff",
      item: req.body.name,
      timestamp: new Date(),
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

router.put("/update/:id", async (req, res) => {
  try {
    const suTeam = await SuTeam.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!suTeam) {
      return res.status(404).json({ error: "Not Found" });
    } else {
      res.status(200).json(suTeam);

      const log = await Log.create({
        user: req.body.login,
        action: "Updated",
        section: "SU Team Staff",
        item: req.body.name,
        timestamp: new Date(),
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const suTeam = await SuTeam.findByIdAndDelete(req.params.id);
    if (!suTeam) {
      return res.status(404).json({ error: "Not Found" });
    } else {
      res.status(200).json(suTeam);

      const log = await Log.create({
        user: req.body.login,
        action: "Deleted",
        section: "SU Team Staff",
        item: suTeam.name,
        timestamp: new Date(),
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
