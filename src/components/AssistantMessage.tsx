import type { FC } from 'react';
import { MessagePartPrimitive, MessagePrimitive } from '@assistant-ui/react';
import { MessageError } from './MessageError';

export const AssistantMessage: FC = () => {
  return (
    <MessagePrimitive.Root data-role="assistant" className="assistant-message">
      <MessagePrimitive.Parts
        components={{
          Text: () => (
            <MessagePartPrimitive.Text className="assistant-message__text" />
          ),
        }}
      />
      <MessageError />
    </MessagePrimitive.Root>
  );
};
