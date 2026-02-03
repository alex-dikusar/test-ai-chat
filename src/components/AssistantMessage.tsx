import type { FC } from 'react';
import { MessagePartPrimitive, MessagePrimitive } from '@assistant-ui/react';
import { MessageError } from './MessageError';
import { MarkdownText } from './MarkdownText';

export const AssistantMessage: FC = () => {
  return (
    <MessagePrimitive.Root data-role="assistant" className="assistant-message">
      <MessagePrimitive.Parts
        components={{
          Text: () => <MarkdownText className="assistant-message__text" />,
          Image: () => <MessagePartPrimitive.Image alt="Attachment" />,
        }}
      />
      <MessageError />
    </MessagePrimitive.Root>
  );
};
