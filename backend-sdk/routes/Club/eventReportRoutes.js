import { Router } from "express";
import EventReport from "../../models/Club/EventReport.js";
import Log from "../../models/Log.js";
const router = Router();

router.post("/add", async (req, res) => {
  try {
    const report = await EventReport.create({
      eventName: req.body.eventName,
      dateTime: req.body.dateTime,
      venue: req.body.venue,
      count: req.body.count,
      report: req.body.report,
      coverImage: req.body.images[0],
      images: req.body.images,
      user: req.body.user,
    })

    const log = await Log.create({
      user: req.body.login,
      action: "Added",
      section: "Event Report",
      item: req.body.eventName,
      timestamp: new Date(),
    });

    return res.status(200).json(report);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const report = await EventReport.findById(req.params.id);
    if (!report) {
      return res.status(400).json({ err: "Not Found" });
    } else {
      console.log(report);
      return res.status(200).json(report);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

router.get("/user/:user", async (req, res) => {
  try {
    const report = await EventReport.find({ user: req.params.user });
    if (!report) {
      return res.status(400).json({ err: "Not Found" });
    } else {
      console.log(report);
      return res.status(200).json(report);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

router.post("/event", async (req, res) => {
  try {
    const report = await EventReport.find({ eventName: req.body.eventName });
    if (!report) {
      return res.status(400).json({ err: "Not Found" });
    } else {
      console.log(report);
      return res.status(200).json(report);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const report = await EventReport.find({});
    console.log(report)
    if (!report) {
      return res.status(400).json({ err: "Not Found" });
    } else {
      console.log(report);
      return res.status(200).json(report);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

router.put("/update/:id", async (req, res) => {
  try {
    const report = await EventReport.findByIdAndUpdate(req.params.id, {
      eventName: req.body.eventName,
      dateTime: req.body.dateTime,
      venue: req.body.venue,
      count: req.body.count,
      report: req.body.report,
      coverImage: req.body.images[0],
      images: req.body.images,
    }, { new: true });
    if (!report) {
      return res.status(400).json({ err: "Not found" })
    }

    const log = await Log.create({
      user: req.body.login,
      action: "Updated",
      section: "Event Report",
      item: req.body.eventName,
      timestamp: new Date(),
    });

    return res.status(200).json(report);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message }); 
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const report = await EventReport.findByIdAndDelete(req.params.id);
    if (!report) {
      return res.status(400).json({ err: "Not found" })
    }
  
    const log = await Log.create({
      user: req.body.login,
      action: "Deleted",
      section: "Event Report",
      item: report.eventName,
      timestamp: new Date(),
    });

    return res.status(200).json(report);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
