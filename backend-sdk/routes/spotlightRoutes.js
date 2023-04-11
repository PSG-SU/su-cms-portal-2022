// crud for adding spotlight
import { Router } from "express";
import Spotlight from "../models/Spotlight.js";


const router = Router();

router.post("/add", async(req, res) => {
  const { title, description, name, link } = req.body;
  try{
    const spotlight = await Spotlight.create({
      title: title,
      description: description,
      name: name,
      link: link,
    });
    res.status(201).json({ spotlight: spotlight._id });
  }catch(error){
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

router.get("/", async(req, res) => {
  try{
    const spotlight = await Spotlight.find({});
    res.status(200).json(spotlight);
  }catch(error){
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

router.get("/unique/:id", async(req, res) => {
  try{
    const spotlight = await Spotlight.findOne({
      _id: req.params.id,
    });
    if(!spotlight){
      return res.status(404).json({ error: "Not Found" });
    }else{
      res.status(200).json(spotlight);
    }
  }catch(err){
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

export default router;