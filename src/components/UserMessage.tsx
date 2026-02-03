import type { FC } from 'react';
import { MessagePartPrimitive, MessagePrimitive } from '@assistant-ui/react';
import { MarkdownText } from './MarkdownText';

export const UserMessage: FC = () => {
  return (
    <MessagePrimitive.Root data-role="user" className="user-message">
      <MessagePrimitive.Parts
        components={{
          Text: () => <MarkdownText className="user-message__text" />,
          Image: () => <MessagePartPrimitive.Image alt="Attachment" />,
        }}
      />
    </MessagePrimitive.Root>
  );
};
