import type { FC } from 'react';
import { AuiIf, ThreadPrimitive } from '@assistant-ui/react';
import { ScrollArea } from '@/shared/ui';
import { ThreadEmpty } from './ThreadEmpty';
import { ThreadScrollToBottom } from '@/widgets/chat';
import { Composer } from './Composer';
import { UserMessage } from './UserMessage';
import { AssistantMessage } from '@/widgets/chat';

export const ChatThread: FC = () => {
  return (
    <ThreadPrimitive.Root className="flex h-full w-full flex-col bg-background">
      <ThreadPrimitive.Viewport
        asChild
        turnAnchor="bottom"
      >
        <ScrollArea className="flex-1 overflow-y-auto px-4 pt-6">
          <div className="mx-auto flex w-full max-w-3xl flex-col gap-4 pb-8">
            <AuiIf condition={({ thread }) => thread.isEmpty}>
              <ThreadEmpty />
            </AuiIf>
            <ThreadPrimitive.Messages
              components={{ UserMessage, AssistantMessage }}
            />
          </div>
        </ScrollArea>
      </ThreadPrimitive.Viewport>
      <div className="border-t border-border/60 bg-background/95">
        <div className="mx-auto w-full max-w-3xl px-4 pb-4">
          <ThreadScrollToBottom />
          <Composer />
        </div>
      </div>
    </ThreadPrimitive.Root>
  );
};
