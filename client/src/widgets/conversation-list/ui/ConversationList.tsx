import type { FC } from 'react';
import {
  ThreadListPrimitive,
  ThreadListItemPrimitive,
  useAuiState,
} from '@assistant-ui/react';
import { Button, ScrollArea, Separator } from '@/shared/ui';
import { cn } from '@/shared/lib';

const ThreadListItemTitle: FC = () => {
  const title = useAuiState(({ threadListItem }) => threadListItem.title);
  const status = useAuiState(({ threadListItem }) => threadListItem.status);
  const id = useAuiState(({ threadListItem }) => threadListItem.id);
  const index = useAuiState(({ threads }) => {
    const i = threads.threadIds.indexOf(id);
    return i >= 0 ? i + 1 : 0;
  });

  if (title?.trim()) return <>{title.trim()}</>;
  if (status === 'new') return <>New chat</>;
  return <>Chat {index}</>;
};

const ThreadListItem: FC = () => {
  const isActive = useAuiState(({ threadListItem }) => threadListItem.isActive);
  
  return (
    <ThreadListItemPrimitive.Root className="mb-0.5 rounded-md">
      <ThreadListItemPrimitive.Trigger asChild>
        <Button
          variant="ghost"
          className={cn(
            "w-full justify-start text-sm font-normal h-auto py-2 px-3 text-muted-foreground hover:text-foreground",
            isActive && "bg-accent text-accent-foreground"
          )}
        >
          <ThreadListItemTitle />
        </Button>
      </ThreadListItemPrimitive.Trigger>
    </ThreadListItemPrimitive.Root>
  );
};

export const ConversationList: FC = () => {
  const isNewActive = useAuiState(({ threadListItem }) => 
    threadListItem.status === 'new' && threadListItem.isActive
  );

  return (
    <aside className="w-64 flex-shrink-0 flex flex-col bg-muted/35">
      <ThreadListPrimitive.Root className="flex flex-col h-full min-h-0">
        <div className="flex-shrink-0 p-3">
          <ThreadListPrimitive.New asChild>
            <Button
              variant="secondary"
              className={cn(
                "w-full justify-start",
                isNewActive && "bg-accent text-accent-foreground"
              )}
            >
              + New chat
            </Button>
          </ThreadListPrimitive.New>
        </div>
        <Separator />
        <ScrollArea className="flex-1 min-h-0 px-2 py-2">
          <ThreadListPrimitive.Items
            components={{ ThreadListItem }}
          />
        </ScrollArea>
      </ThreadListPrimitive.Root>
    </aside>
  );
};
