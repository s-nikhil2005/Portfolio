import { Router } from "express";
import { db } from "../services/db";

const router: Router = Router();

// GET all blogs
router.get("/", async (req, res) => {
  try {
    const list = await db.getBlogs();
    res.json(list);
  } catch (error) {
    res.status(500).json({ error: "Failed to load blogs index." });
  }
});

// POST save blog (admin)
router.post("/", async (req, res) => {
  try {
    const saved = await db.saveBlog(req.body);
    res.json(saved);
  } catch (error) {
    res.status(500).json({ error: "Failed to save blog post." });
  }
});

export default router;
