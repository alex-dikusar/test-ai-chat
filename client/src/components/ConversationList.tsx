import type { FC } from 'react';
import {
  ThreadListPrimitive,
  ThreadListItemPrimitive,
  useAuiState,
} from '@assistant-ui/react';
import './ConversationList.css';

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

const ThreadListItem: FC = () => (
  <ThreadListItemPrimitive.Root className="conversation-list__item">
    <ThreadListItemPrimitive.Trigger className="conversation-list__item-trigger">
      <ThreadListItemTitle />
    </ThreadListItemPrimitive.Trigger>
  </ThreadListItemPrimitive.Root>
);

export const ConversationList: FC = () => {
  return (
    <aside className="conversation-list">
      <ThreadListPrimitive.Root className="conversation-list__root">
        <ThreadListPrimitive.New className="conversation-list__new">
          + New chat
        </ThreadListPrimitive.New>
        <div className="conversation-list__items-wrapper">
          <ThreadListPrimitive.Items
            components={{ ThreadListItem }}
          />
        </div>
      </ThreadListPrimitive.Root>
    </aside>
  );
};
