import { Router } from 'express';
import TeamMember from '../../models/Club/TeamMember.js';
import Log from '../../models/Log.js';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const teamMember = await TeamMember.find();
    res.status(200).json(teamMember);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const teamMember = await TeamMember.findOne({
      _id: req.params.id,
    });
    if (!teamMember) {
      return res.status(404).json({ error: "Not Found" });
    } else {
      res.status(200).json(teamMember);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

router.get("/user/:user", async (req, res) => {
  try {
    const teamMember = await TeamMember.find({
      user: req.params.user,
    });
    if (!teamMember) {
      return res.status(404).json({ error: "Not Found" });
    } else {
      res.status(200).json(teamMember);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

router.post("/add", async (req, res) => {
  try {
    const teamMember = await TeamMember.create({
      ...req.body,
    });
    res.status(201).json({ teamMember: teamMember._id });

    const log = await Log.create({
      user: req.body.login,
      action: "Added",
      section: "Team Member",
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
    const teamMember = await TeamMember.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    if (!teamMember) {
      return res.status(404).json({ error: "Not Found" });
    } else {
      res.status(200).json(teamMember);

      const log = await Log.create({
        user: req.body.login,
        action: "Updated",
        section: "Team Member",
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
    const teamMember = await TeamMember.findOneAndDelete({
      _id: req.params.id,
    });
    if (!teamMember) {
      return res.status(404).json({ error: "Not Found" });
    } else {
      res.status(200).json(teamMember);

      const log = await Log.create({
        user: req.body.login,
        action: "Deleted",
        section: "Team Member",
        item: req.body.eventName,
        timestamp: new Date(),
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

export default router;