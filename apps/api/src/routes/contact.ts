import { Router } from "express";
import { db } from "../services/db";
import { validateContactInput } from "../middleware/validation";

const router: Router = Router();

// POST send contact message
router.post("/", validateContactInput, async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const msg = {
      name,
      email,
      message,
      createdAt: new Date().toISOString(),
    };

    await db.saveContact(msg);

    // Output simulated email log
    console.log(`[EMAIL_SERVICE]: Mail transmission triggered to ${email}`);

    res.json({
      success: true,
      message: "Transmission received and logged successfully.",
      data: msg,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to dispatch contact message." });
  }
});

// GET all contact messages (for dashboard list)
router.get("/", async (req, res) => {
  try {
    const list = await db.getContacts();
    res.json(list);
  } catch (error) {
    res.status(500).json({ error: "Failed to load contact logs." });
  }
});

export default router;
