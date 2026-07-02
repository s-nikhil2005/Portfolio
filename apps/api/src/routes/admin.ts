import { Router } from "express";
import { db } from "../services/db";

const router: Router = Router();

// GET analytics summary
router.get("/analytics", async (req, res) => {
  try {
    const data = await db.getAnalytics();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch visitor analytics." });
  }
});

// POST track resume downloads
router.post("/track-download", async (req, res) => {
  try {
    const updatedCount = await db.incrementResumeDownloads();
    res.json({ success: true, downloads: updatedCount });
  } catch (error) {
    res.status(500).json({ error: "Failed to increment download counter." });
  }
});

// POST track visitor page hit
router.post("/track-hit", async (req, res) => {
  try {
    const updatedHits = await db.recordHit();
    res.json({ success: true, hits: updatedHits });
  } catch (error) {
    res.status(500).json({ error: "Failed to track visitor page hit." });
  }
});

export default router;
