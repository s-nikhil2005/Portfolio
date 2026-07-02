import express from "express";
import cors from "cors";
import { rateLimiter } from "./middleware/limiter";

// Router imports
import projectsRouter from "./routes/projects";
import blogsRouter from "./routes/blogs";
import contactRouter from "./routes/contact";
import adminRouter from "./routes/admin";
import aiRouter from "./routes/ai";

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Apply global rate limiting
app.use(rateLimiter);

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date() });
});

// Route mountings
app.use("/api/projects", projectsRouter);
app.use("/api/blogs", blogsRouter);
app.use("/api/contact", contactRouter);
app.use("/api/admin", adminRouter);
app.use("/api/ai-assistant", aiRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
