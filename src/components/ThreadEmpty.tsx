import type { FC } from 'react';

export const ThreadEmpty: FC = () => {
  return (
    <div className="thread-empty">
      <h2 className="thread-empty__title">Hello!</h2>
      <p>Send a message to start the conversation.</p>
    </div>
  );
};
