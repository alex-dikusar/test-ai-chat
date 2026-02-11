import type { FC } from 'react';
import { ThreadPrimitive } from '@assistant-ui/react';

export const ThreadScrollToBottom: FC = () => {
  return (
    <ThreadPrimitive.ScrollToBottom asChild>
      <button type="button" className="thread-scroll-to-bottom">
        Scroll to bottom
      </button>
    </ThreadPrimitive.ScrollToBottom>
  );
};
