import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { openai } from '@ai-sdk/openai';
import { streamText, generateText, convertToModelMessages } from 'ai';
import { frontendTools } from '@assistant-ui/react-ai-sdk';

function messagesToSimple(messages: unknown[], maxMessages = 10): { role: string; content: string }[] {
  if (!Array.isArray(messages)) return [];
  const slice = messages.slice(0, maxMessages);
  return slice.map((m: { role?: string; content?: unknown }) => {
    const parts = (m as { content?: unknown[] }).content ?? [];
    const text = (parts as { type?: string; text?: string }[])
      .filter((p) => p && p.type === 'text' && typeof p.text === 'string')
      .map((p) => p.text)
      .join(' ')
      .trim();
    return { role: (m as { role?: string }).role ?? 'user', content: text || '(no text)' };
  });
}

@Injectable()
export class ChatService {
  constructor(private readonly config: ConfigService) {}

  get openaiApiKey(): string | undefined {
    return this.config.get<string>('OPENAI_API_KEY');
  }

  async generateTitle(messages: unknown[]): Promise<{ title: string }> {
    const simple = messagesToSimple(messages ?? []);
    if (simple.length === 0) {
      throw new Error('No messages');
    }
    const { text } = await generateText({
      model: openai('gpt-4o-mini'),
      system:
        'You generate very short chat titles (a few words, no quotes, no punctuation at the end). Reply with only the title, nothing else.',
      messages: [
        ...simple.map((m) => ({ role: m.role as 'user' | 'system' | 'assistant', content: m.content })),
        {
          role: 'user' as const,
          content:
            'Generate a short title for this conversation (only the title, nothing else):',
        },
      ],
      maxOutputTokens: 20,
    });
    const title = (text || 'Chat').trim().slice(0, 80);
    return { title };
  }

  async streamChat(
    messages: unknown[],
    system?: string,
    tools?: unknown,
  ): Promise<{ toUIMessageStreamResponse: () => Response }> {
    const modelMessages = await convertToModelMessages((messages ?? []) as Parameters<typeof convertToModelMessages>[0]);
    return streamText({
      model: openai('gpt-4o-mini'),
      system: system || 'You are a helpful assistant.',
      messages: modelMessages,
      tools: tools ? { ...frontendTools(tools as Parameters<typeof frontendTools>[0]) } : undefined,
    });
  }
}
