import { useEffect } from 'react';
import { useAssistantRuntime, useAui } from '@assistant-ui/react';

const TITLE_API = '/api/chat/title';

/**
 * After the first exchange in a thread, requests a summary title from the API
 * and renames the thread (ChatGPT-style).
 */
type TitleGeneratorProps = {
  token: string
}

export function TitleGenerator({ token }: TitleGeneratorProps) {
  const runtime = useAssistantRuntime();
  const aui = useAui();

  useEffect(() => {
    const unsubscribe = runtime.thread.unstable_on('runEnd', async () => {
      const itemState = aui.threadListItem().getState();
      if (itemState.title?.trim()) return;

      const threadState = runtime.thread.getState();
      const messages = threadState.messages ?? [];
      if (messages.length < 2) return;

      try {
        const res = await fetch(TITLE_API, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ messages }),
        });
        if (!res.ok) return;
        const data = await res.json();
        const title = data?.title?.trim();
        if (title) aui.threadListItem().rename(title);
      } catch {
        // ignore
      }
    });
    return () => unsubscribe();
  }, [runtime, aui, token]);

  return null;
}
