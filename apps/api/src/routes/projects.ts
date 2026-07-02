import { Router } from "express";
import { db } from "../services/db";

const router: Router = Router();

// GET all projects
router.get("/", async (req, res) => {
  try {
    const list = await db.getProjects();
    res.json(list);
  } catch (error) {
    res.status(500).json({ error: "Failed to load projects dynamic index." });
  }
});

// POST save project (admin)
router.post("/", async (req, res) => {
  try {
    const saved = await db.saveProject(req.body);
    res.json(saved);
  } catch (error) {
    res.status(500).json({ error: "Failed to save project entry." });
  }
});

export default router;
