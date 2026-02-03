import "dotenv/config";
import express from "express";
import { openai } from "@ai-sdk/openai";
import { streamText, convertToModelMessages } from "ai";
import { frontendTools } from "@assistant-ui/react-ai-sdk";

const app = express();
app.use(express.json({ limit: "1mb" }));

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
