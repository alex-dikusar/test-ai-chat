import type { FC } from 'react';
import { MessagePrimitive } from '@assistant-ui/react';

export const UserMessage: FC = () => {
  return (
    <MessagePrimitive.Root data-role="user" className="user-message">
      <MessagePrimitive.Parts />
    </MessagePrimitive.Root>
  );
};
