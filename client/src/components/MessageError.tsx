import type { FC } from 'react';
import { ErrorPrimitive, MessagePrimitive } from '@assistant-ui/react';

export const MessageError: FC = () => {
  return (
    <MessagePrimitive.Error>
      <ErrorPrimitive.Root className="message-error">
        <ErrorPrimitive.Message />
      </ErrorPrimitive.Root>
    </MessagePrimitive.Error>
  );
};
