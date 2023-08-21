import { Router } from "express";
import Gallery from "../models/Gallery.js";
import Log from "../models/Log.js";
const router = Router();

router.post("/add", async (req, res) => {
  try {
    const { images, event, year } = req.body;
    // let postBody = [];
    // images.forEach((url) => {
    //   postBody.push({
    //     image_url: url,
    //     event: event,
    //     year: year,
    //   });
    // });
    // const img = await Gallery.insertMany(postBody);
    const img = await Gallery.create({
      image_url: images[0],
      images: images,
      event: event,
      year: year,
    });

    if (!img) {
      return res.status(400).json({ err: "Not Found" });
    }

    const log = await Log.create({
      user: req.body.login,
      action: "Added",
      section: "Gallery",
      item: req.body.event + " " + req.body.year,
      timestamp: new Date(),
    });

    return res.status(200).send({ message: img });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const image = await Gallery.findById(req.params.id);
    if (!image) {
      return res.status(400).json({ err: "Not Found" });
    } else {
      return res.status(200).send({ message: image });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

router.get("/event/:event", async (req, res) => {
  try {
    const images = await Gallery.find({ event: req.params.event });
    if (!images) {
      return res.status(400).json({ err: "Not Found" });
    } else {
      return res.status(200).send({ message: images });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const images = await Gallery.find({});
    if (!images) {
      return res.status(400).json({ err: "Not Found" });
    } else {
      return res.status(200).json({ message: images });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const image = await Gallery.findByIdAndDelete(req.params.id);
    if (!image) {
      return res.status(400).json({ err: "Not found" })
    }

    const log = await Log.create({
      user: req.body.login,
      action: "Deleted",
      section: "Gallery",
      item: image.event + " " + image.year,
      timestamp: new Date(),
    });

    return res.status(200).json({ message: image });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

router.put("/update/:id", async (req, res) => {
  try {

    const { images, event, year } = req.body;

    const image = await Gallery.findOneAndUpdate({ _id: req.params.id }, {
      image_url: images[0],
      images: images,
      event: event,
      year: year,
    }, { new: true });
    if (!image) {
      return res.status(400).json({ err: "Not found" })
    }

    const log = await Log.create({
      user: req.body.login,
      action: "Updated",
      section: "Gallery",
      item: req.body.event + " " + req.body.year,
      timestamp: new Date(),
    });

    return res.status(200).json({ message: image });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
