import { Router } from "express";
import Bug from "../models/Bugs.js";
import Log from "../models/Log.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const bugs = await Bug.find({});
    res.status(200).json(bugs);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const bug = await Bug.findOne({
      _id: req.params.id,
    });
    if (!bug) {
      return res.status(404).json({ error: "Not Found" });
    } else {
      res.status(200).json(bug);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

router.post("/add", async (req, res) => {
  try {
    const bug = await Bug.create(req.body);
    res.status(201).json({ bug: bug._id });

    const log = await Log.create({
      user: req.body.login,
      action: "Added",
      section: "Bugs",
      item: req.body.title,
      timestamp: new Date(),
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

router.put("/update/:id", async (req, res) => {
  try {
    const bug = await Bug.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    if (!bug) {
      return res.status(404).json({ error: "Not Found" });
    } else {
      res.status(200).json(bug);

      const log = await Log.create({
        user: req.body.login,
        action: "Updated",
        section: "Bugs",
        item: req.body.title,
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
    const bug = await Bug.findOneAndDelete({
      _id: req.params.id,
    });
    if (!bug) {
      return res.status(404).json({ error: "Not Found" });
    } else {
      res.status(200).json(bug);

      const log = await Log.create({
        user: req.body.login,
        action: "Deleted",
        section: "Bugs",
        item: bug.title,
        timestamp: new Date(),
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
