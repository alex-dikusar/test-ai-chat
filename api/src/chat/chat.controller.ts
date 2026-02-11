import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { ChatService } from './chat.service';

@Controller('api/chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post('title')
  async title(@Body() body: { messages?: unknown[] } | undefined, @Res() res: Response) {
    if (!this.chatService.openaiApiKey) {
      res.status(500).json({ error: 'OPENAI_API_KEY is not set in .env' });
      return;
    }
    const { messages } = body ?? {};
    try {
      const { title } = await this.chatService.generateTitle(messages ?? []);
      res.json({ title });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Title generation failed';
      if (message === 'No messages') {
        res.status(400).json({ error: message });
        return;
      }
      console.error(err);
      res.status(500).json({ error: message });
    }
  }

  @Post()
  async chat(
    @Body() body: { messages?: unknown[]; system?: string; tools?: unknown } | undefined,
    @Res() res: Response,
  ) {
    if (!this.chatService.openaiApiKey) {
      res.status(500).json({ error: 'OPENAI_API_KEY is not set in .env' });
      return;
    }
    const { messages, system, tools } = body ?? {};
    try {
      const result = await this.chatService.streamChat(messages ?? [], system, tools);
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
      const message = err instanceof Error ? err.message : 'Stream failed';
      res.status(500).json({ error: message });
    }
  }
}
