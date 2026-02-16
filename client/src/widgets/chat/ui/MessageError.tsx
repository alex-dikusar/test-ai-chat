import type { FC } from 'react';
import { ErrorPrimitive, MessagePrimitive } from '@assistant-ui/react';

export const MessageError: FC = () => {
  return (
    <MessagePrimitive.Error>
      <ErrorPrimitive.Root className="mt-2 p-2 text-sm text-destructive bg-destructive/10 rounded-md">
        <ErrorPrimitive.Message />
      </ErrorPrimitive.Root>
    </MessagePrimitive.Error>
  );
};
