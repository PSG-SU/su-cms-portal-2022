import { Router } from "express";
import About from "../models/About.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const about = await About.find({});
    res.status(200).json(about);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

router.post("/add", async (req, res) => {
  try {
    const about = await About.create({
      ...req.body,
    });
    res.status(201).json({ about: about._id });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

// router.put("/update/:id", async (req, res) => {
//   try {
//     const suTeam = await SuTeam.findByIdAndUpdate(req.params.id, req.body, {
//       new: true,
//     });
//     if (!suTeam) {
//       return res.status(404).json({ error: "Not Found" });
//     } else {
//       res.status(200).json(suTeam);
//     }
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ error: err.message });
//   }
// });

// router.delete("/delete/:id", async (req, res) => {
//   try {
//     const suTeam = await SuTeam.findByIdAndDelete(req.params.id);
//     if (!suTeam) {
//       return res.status(404).json({ error: "Not Found" });
//     } else {
//       res.status(200).json(suTeam);
//     }
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ error: err.message });
//   }
// });

export default router;
