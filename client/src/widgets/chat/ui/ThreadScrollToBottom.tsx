import type { FC } from 'react';
import { ThreadPrimitive } from '@assistant-ui/react';
import { Button } from '@/shared/ui';

export const ThreadScrollToBottom: FC = () => {
  return (
    <ThreadPrimitive.ScrollToBottom asChild>
      <Button 
        type="button" 
        variant="outline" 
        size="sm"
        className="mx-auto mb-2 block rounded-full border-border bg-card/80 text-muted-foreground hover:text-foreground"
      >
        Jump to latest
      </Button>
    </ThreadPrimitive.ScrollToBottom>
  );
};
