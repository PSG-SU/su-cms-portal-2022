import { Router } from 'express';
import Proposal from '../../models/Club/Proposal.js';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const proposals = await Proposal.find({}).sort({ createdAt: 'desc' }).exec();
    res.status(200).json(proposals);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

router.get("/user/:user", async (req, res) => {
  try {
    const proposal = await Proposal.find({
      user: req.params.user,
    });
    if (!proposal) {
      return res.status(404).json({ error: "Not Found" });
    } else {
      res.status(200).json(proposal);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

router.get("/all_dean_approved/", async (req, res) => {
  try {
    const proposal = await Proposal.find({
      status: "deanApproved",
    });
    if (!proposal) {
      return res.status(404).json({ error: "Not Found" });
    } else {
      res.status(200).json(proposal);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

router.get("/all_fac_approved/", async (req, res) => {
  try {
    const proposal = await Proposal.find({
      status: "facApproved",
    });
    if (!proposal) {
      return res.status(404).json({ error: "Not Found" });
    } else {
      res.status(200).json(proposal);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

router.get("/all_rejected/", async (req, res) => {
  try {
    const proposal = await Proposal.find({
      status: "rejected",
    });
    if (!proposal) {
      return res.status(404).json({ error: "Not Found" });
    } else {
      res.status(200).json(proposal);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

router.get("/all_published/", async (req, res) => {
  try {
    const proposal = await Proposal.find({
      status: "published",
    });
    if (!proposal) {
      return res.status(404).json({ error: "Not Found" });
    } else {
      res.status(200).json(proposal);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

router.get("/feed", async (req, res) => {
  try {
    const proposal = await Proposal.find({
      status: "published",
    }).sort({ publishedAt: "desc" });
    if (!proposal) {
      return res.status(404).json({ error: "Not Found" });
    } else {
      res.status(200).json(proposal.slice(0, 5));
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

router.get("/facApproved/:user", async (req, res) => {
  try {
    const proposal = await Proposal.find({
      user: req.params.user,
      status: "facApproved",
    });
    if (!proposal) {
      return res.status(404).json({ error: "Not Found" });
    } else {
      res.status(200).json(proposal);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

router.get("/deanApproved/:user", async (req, res) => {
  try {
    const proposal = await Proposal.find({
      user: req.params.user,
      status: "deanApproved",
    });
    if (!proposal) {
      return res.status(404).json({ error: "Not Found" });
    } else {
      res.status(200).json(proposal);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

router.get("/pending/:user", async (req, res) => {
  try {
    const proposal = await Proposal.find({
      user: req.params.user,
      status: "pending",
    });
    if (!proposal) {
      return res.status(404).json({ error: "Not Found" });
    } else {
      res.status(200).json(proposal);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

router.get("/rejected/:user", async (req, res) => {
  try {
    const proposal = await Proposal.find({
      user: req.params.user,
      status: "rejected",
    });
    if (!proposal) {
      return res.status(404).json({ error: "Not Found" });
    } else {
      res.status(200).json(proposal);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

router.get("/published/:user", async (req, res) => {
  try {
    const proposal = await Proposal.find({
      user: req.params.user,
      status: "published",
    });
    if (!proposal) {
      return res.status(404).json({ error: "Not Found" });
    } else {
      res.status(200).json(proposal);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

router.get("/deanApprovedAndPublished/:user", async (req, res) => {
  try {
    const proposal = await Proposal.find({
      user: req.params.user,
      $or: [{ status: "deanApproved" }, { status: "published" }],
    });
    if (!proposal) {
      return res.status(404).json({ error: "Not Found" });
    } else {
      res.status(200).json(proposal);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const proposal = await Proposal.findOne({
      _id: req.params.id,
    });
    if (!proposal) {
      return res.status(404).json({ error: 'Proposal not found' });
    } else {
      res.status(200).json(proposal);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

router.post("/add", async (req, res) => {
  try {
    const teamMember = await Proposal.create({
      ...req.body,
    });
    res.status(201).json({ teamMember: teamMember._id });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

router.put("/update/:id", async (req, res) => {
  try {
    const teamMember = await Proposal.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
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

router.delete("/delete/:id", async (req, res) => {
  try {
    const teamMember = await Proposal.findOneAndDelete({
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

export default router;