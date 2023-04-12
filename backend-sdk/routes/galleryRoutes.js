import { Router } from "express";
import Gallery from "../models/Gallery.js";
const router = Router();

router.post("/add", async (req, res) => {
  try {
    const { images, event } = req.body;
    let postBody = [];
    images.forEach((url) => {
      postBody.push({
        image_url: url,
        event: event,
      });
    });
    const img = await Gallery.insertMany(postBody);
    return res.status(200).send({ message: img });
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
      console.log(images);
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
    console.log(images)
    if (!images) {
      return res.status(400).json({ err: "Not Found" });
    } else {
      console.log(images);
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
    return res.status(200).json({ message: image });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
