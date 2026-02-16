import type { FC } from 'react';

export const ThreadEmpty: FC = () => {
  return (
    <div className="py-20 text-center text-muted-foreground">
      <h2 className="mb-2 text-3xl font-semibold tracking-tight text-foreground">Hello!</h2>
      <p className="text-sm">Send a message to start the conversation.</p>
    </div>
  );
};
