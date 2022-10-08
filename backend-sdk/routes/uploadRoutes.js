import { Router } from "express";
import upload from "../multer.js";
import cloudinary from "../cloudinary.js";

const router = Router();

router.post("/", upload.single("file"), async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path);
    console.log(req);
    console.log(result);
    res.status(200).send({
      name: req.file.originalname,
      url: result.secure_url,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

export default router;
