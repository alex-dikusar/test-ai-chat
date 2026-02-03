import type { FC } from 'react';
import { AuiIf, ThreadPrimitive } from '@assistant-ui/react';
import { ThreadEmpty } from './ThreadEmpty';
import { ThreadScrollToBottom } from './ThreadScrollToBottom';
import { Composer } from './Composer';
import { UserMessage } from './UserMessage';
import { AssistantMessage } from './AssistantMessage';
import './chat.css';

export const ChatThread: FC = () => {
  return (
    <ThreadPrimitive.Root className="chat-thread">
      <ThreadPrimitive.Viewport
        turnAnchor="bottom"
        className="chat-thread__viewport"
      >
        <AuiIf condition={({ thread }) => thread.isEmpty}>
          <ThreadEmpty />
        </AuiIf>
        <ThreadPrimitive.Messages
          components={{ UserMessage, AssistantMessage }}
        />
        <div className="chat-thread__viewport-footer">
          <ThreadScrollToBottom />
          <Composer />
        </div>
      </ThreadPrimitive.Viewport>
    </ThreadPrimitive.Root>
  );
};
