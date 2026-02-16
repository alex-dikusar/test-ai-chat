import "dotenv/config";
import express from "express";
import { openai } from "@ai-sdk/openai";
import { streamText, generateText, convertToModelMessages } from "ai";
import { frontendTools } from "@assistant-ui/react-ai-sdk";

const app = express();
app.use(express.json({ limit: "1mb" }));

/**
 * Turn thread messages into a simple { role, content }[] for title generation.
 * Uses only the first few messages to keep the prompt small.
 */
function messagesToSimple(messages, maxMessages = 10) {
  if (!Array.isArray(messages)) return [];
  const slice = messages.slice(0, maxMessages);
  return slice.map((m) => {
    const parts = m.content ?? [];
    const text = parts
      .filter((p) => p && p.type === "text" && typeof p.text === "string")
      .map((p) => p.text)
      .join(" ")
      .trim();
    return { role: m.role ?? "user", content: text || "(no text)" };
  });
}

app.post("/api/chat/title", async (req, res) => {
  if (!process.env.OPENAI_API_KEY) {
    res.status(500).json({ error: "OPENAI_API_KEY is not set in .env" });
    return;
  }
  const { messages } = req.body;
  const simple = messagesToSimple(messages ?? []);
  if (simple.length === 0) {
    res.status(400).json({ error: "No messages" });
    return;
  }
  try {
    const { text } = await generateText({
      model: openai("gpt-4o-mini"),
      system:
        "You generate very short chat titles (a few words, no quotes, no punctuation at the end). Reply with only the title, nothing else.",
      messages: [
        ...simple.map((m) => ({ role: m.role, content: m.content })),
        {
          role: "user",
          content:
            "Generate a short title for this conversation (only the title, nothing else):",
        },
      ],
      maxTokens: 20,
    });
    const title = (text || "Chat").trim().slice(0, 80);
    res.json({ title });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message ?? "Title generation failed" });
  }
});

app.post("/api/chat", async (req, res) => {
  if (!process.env.OPENAI_API_KEY) {
    res.status(500).json({ error: "OPENAI_API_KEY is not set in .env" });
    return;
  }

  const { messages, system, tools } = req.body;

  try {
    const modelMessages = await convertToModelMessages(messages ?? []);
    const result = streamText({
      model: openai("gpt-4o-mini"),
      system: system || "You are a helpful assistant.",
      messages: modelMessages,
      tools: tools ? { ...frontendTools(tools) } : undefined,
    });

    const response = result.toUIMessageStreamResponse();
    res.status(response.status);
    response.headers.forEach((value, key) => {
      res.setHeader(key, value);
    });
    if (response.body) {
      const reader = response.body.getReader();
      const pump = async () => {
        const { done, value } = await reader.read();
        if (done) {
          res.end();
          return;
        }
        res.write(Buffer.from(value));
        await pump();
      };
      await pump();
    } else {
      res.end();
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message ?? "Stream failed" });
  }
});

const PORT = process.env.PORT ?? 3001;
app.listen(PORT, () => {
  console.log(`API server running at http://localhost:${PORT}`);
});
