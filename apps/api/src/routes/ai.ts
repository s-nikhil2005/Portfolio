import { Router, Request, Response } from "express";

const router: Router = Router();

const SYSTEM_PROMPT = `
You are Nikhil's AI Assistant, a friendly and professional helper integrated into Nikhil's Retro OS Portfolio website (NIKHIL_OS).
Your goal is to answer questions about Nikhil Singh, his projects, skills, experience, and contact details.
Keep your answers relatively concise, professional, and matching the retro-futuristic hacker operating system theme.

Here is the RAG context about Nikhil:
- **Who is Nikhil?**: Nikhil Singh, Full Stack Developer & 3D Interactive Portfolio OS architect. He builds high-performance distributed backend architectures and immersive 3D frontend interfaces.
- **Tech Stack & Skills**:
  * Languages: TypeScript, JavaScript, Python, Golang, C++
  * Frameworks & Libraries: React, Next.js, Node.js, Express, Three.js, React Three Fiber (R3F), Drei, GSAP
  * Infrastructure & Database: Docker, Redis, MongoDB, AWS, Nginx, Turborepo
- **Key Projects**:
  1. Voya Collaborative Canvas: Real-time mapping workspace. Tech: Next.js, WebSockets, Redis, Docker. Sync latency under 32ms.
  2. Nikhil_OS Portfolio: 3D interactive operating system portfolio (this site) built using Next.js (App Router), R3F, Drei, and Web Audio API click synthesis.
  3. Distributed Microservices Gateway: High-throughput Express API router handling 4,200 reqs/sec with Nginx, rate-limiting, and Redis caching.
- **Work History**:
  1. Lead Full-Stack Engineer at Voya Platforms (2024 - Present)
  2. Software Engineer at Cyber Grid Systems (2022 - 2024)
  3. Frontend Intern at Pixel Craft Studio (2021 - 2022)
- **Contact Details**: nikhil@example.com. Or double-click the "contact.lnk" icon on the desktop to launch the secure mail client.
- **Resume**: Can be downloaded by opening the "about_me.txt" file on the desktop and clicking "Download Resume".

If a user asks how to download the resume, tell them to open "about_me.txt".
If a user asks how to contact Nikhil, tell them to open "contact.lnk".
If a user asks about projects, list the 3 packages on the desktop.
`;

// Helper to stream text back word-by-word for mock fallback
const streamMockResponse = async (res: Response, text: string) => {
  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  res.setHeader("Transfer-Encoding", "chunked");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  const words = text.split(" ");
  for (let i = 0; i < words.length; i++) {
    res.write(words[i] + " ");
    // Introduce typing speed delay
    await new Promise((resolve) => setTimeout(resolve, 40));
  }
  res.end();
};

// POST conversational prompt queries
router.post("/chat", async (req: Request, res: Response) => {
  try {
    const { prompt } = req.body;

    if (!prompt || typeof prompt !== "string") {
      res.status(400).json({ error: "Empty chat transmission request." });
      return;
    }

    const apiKey = process.env.GEMINI_API_KEY;

    // Fallback Mock RAG if no API key is defined
    if (!apiKey) {
      const query = prompt.toLowerCase();
      let reply =
        "I am Nikhil's AI Assistant. You can ask me about his skills, experience, projects, or how to contact him. Try typing 'skills' or 'contact'!";

      if (
        query.includes("who is nikhil") ||
        query.includes("about nikhil") ||
        query.includes("profile")
      ) {
        reply =
          "Nikhil Singh is a Full Stack Developer & 3D Interactive Portfolio OS architect. He builds high-performance distributed backend architectures and immersive 3D frontend interfaces. Ask me about his projects, skills, or work history!";
      } else if (
        query.includes("skills") ||
        query.includes("technologies") ||
        query.includes("stack") ||
        query.includes("languages")
      ) {
        reply =
          "Nikhil is highly proficient in TypeScript, React, Next.js, Node.js (Express), Docker, Redis, Golang, and WebGL (Three.js/R3F). He focuses on scalable backends and immersive frontends.";
      } else if (
        query.includes("experience") ||
        query.includes("work") ||
        query.includes("job") ||
        query.includes("career")
      ) {
        reply =
          "Nikhil's experience includes working as a Lead Full-Stack Engineer at Voya Platforms (2024-Present), a Software Engineer at Cyber Grid Systems (2022-2024), and a Frontend Intern at Pixel Craft Studio (2021-2022).";
      } else if (
        query.includes("voya") ||
        query.includes("collaborative") ||
        query.includes("map")
      ) {
        reply =
          "Voya Collaborative Canvas is a real-time geographical workspace mapping tracker built with Next.js, WebSockets, Redis, and Docker. It features sub-32ms sync latency.";
      } else if (
        query.includes("projects") ||
        query.includes("code") ||
        query.includes("showcase")
      ) {
        reply =
          "Nikhil's core projects include: 1) Voya Collaborative Canvas (Next.js & WebSockets), 2) Nikhil_OS Portfolio (3D Next.js OS), and 3) Distributed API Gateway (Express & Nginx). Check them out via the projects.pkg file on the desktop!";
      } else if (
        query.includes("contact") ||
        query.includes("email") ||
        query.includes("message")
      ) {
        reply =
          "You can contact Nikhil by emailing nikhil@example.com or by double-clicking the contact.lnk icon on the desktop to launch the secure mail client.";
      } else if (
        query.includes("resume") ||
        query.includes("download") ||
        query.includes("cv")
      ) {
        reply =
          "To download Nikhil's resume, open the about_me.txt file on the desktop and click the primary 'Download Resume' button at the bottom.";
      } else if (
        query.includes("backend") ||
        query.includes("architecture") ||
        query.includes("server")
      ) {
        reply =
          "Nikhil specializes in backend scale. He designed an Express-based Distributed API Gateway handling 4,200 reqs/sec with rate limiters, caching pipelines, and replica databases.";
      }

      await streamMockResponse(res, reply);
      return;
    }

    // Call actual Gemini API with RAG context
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.setHeader("Transfer-Encoding", "chunked");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:streamGenerateContent?key=${apiKey}`;

    const apiResponse = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [
              { text: `${SYSTEM_PROMPT}\n\nUser Question: ${prompt}\nAnswer:` },
            ],
          },
        ],
      }),
    });

    if (!apiResponse.ok) {
      throw new Error(`Gemini API responded with status ${apiResponse.status}`);
    }

    const reader = apiResponse.body;
    if (!reader) {
      throw new Error("No response stream body from Gemini API.");
    }

    // Node fetch stream reading
    const textDecoder = new TextDecoder();
    for await (const chunk of reader as any) {
      const decodedChunk = textDecoder.decode(chunk);
      // Gemini streams JSON chunks formatted as SSE text blocks
      const lines = decodedChunk.split("\n");
      for (const line of lines) {
        if (
          line.trim().startsWith("data:") ||
          line.trim().startsWith("{") ||
          line.trim().includes('"text"')
        ) {
          try {
            // Clean string to find the json body
            const jsonStr = line.replace(/^data:\s*/, "").trim();
            if (!jsonStr) continue;
            const parsed = JSON.parse(jsonStr);
            const content = parsed.candidates?.[0]?.content?.parts?.[0]?.text;
            if (content) {
              res.write(content);
            }
          } catch (e) {
            // Chunk might be partial, write raw text or ignore
          }
        }
      }
    }
    res.end();
  } catch (error) {
    console.error("AI Assistant Error:", error);
    res.write("AI assistant connection failed. Please check your setup.");
    res.end();
  }
});

export default router;
