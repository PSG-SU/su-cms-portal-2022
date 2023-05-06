import { Router } from "express";
import Club from "../models/Club.js";
import General from "../models/Club/General.js";

const router = Router();

router.post("/add", async (req, res) => {
  try {
    const club = await Club.create(req.body);
    res.status(201).json({ club: club._id });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const clubs = await Club.find({});
    res.status(200).json(clubs);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

router.get("/with-logo", async (req, res) => {
  try {
    const clubs = await Club.find({});
    let details = await Promise.all(
      await clubs.map(async (club) => {
        const data = await General.findOne({ user: club.clubId });
        return {
          ...club._doc,
          description: data ? data.description : "Club Description",
          // image_url: data ? data.image_url : "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Mercado_de_Col%C3%B3n%2C_Valencia%2C_Espa%C3%B1a%2C_2014-06-29%2C_DD_07.JPG/750px-Mercado_de_Col%C3%B3n%2C_Valencia%2C_Espa%C3%B1a%2C_2014-06-29%2C_DD_07.JPG",
          image_url: data ? data.image_url : "https://upload.wikimedia.org/wikipedia/en/e/eb/PSG_College_of_Technology_logo.png",
          // tagline: data ? data.tagline : "Club Tagline",
        };
      })
    );
    res.status(200).json(details);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const club = await Club.findOne({ _id: req.params.id });
    if (!club) return res.status(404).json({ error: "Club not found" });
    res.status(200).json(club);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

router.get("/id/:id", async (req, res) => {
  try {
    const club = await Club.findOne({ clubId: req.params.id });
    if (!club) return res.status(404).json({ error: "Club not found" });
    res.status(200).json(club);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const club = await Club.findOneAndDelete({ _id: req.params.id });
    if (!club) return res.status(404).json({ error: "Club not found" });
    res.status(200).json(club);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

router.put("/update/:id", async (req, res) => {
  try {
    const club = await Club.findOneAndUpdate({ _id: req.params.id }, req.body, {
      new: true,
    });
    if (!club) return res.status(404).json({ error: "Club not found" });
    res.status(200).json(club);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
