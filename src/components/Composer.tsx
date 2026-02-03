import type { FC } from 'react';
import { AuiIf, ComposerPrimitive } from '@assistant-ui/react';

export const Composer: FC = () => {
  return (
    <ComposerPrimitive.Root className="composer">
      <ComposerPrimitive.Input
        placeholder="Send a message..."
        rows={2}
        minRows={1}
        autoFocus
        aria-label="Message input"
        className="composer__input"
      />
      <div className="composer__actions">
        <AuiIf condition={({ thread }) => thread.isRunning}>
          <ComposerPrimitive.Cancel asChild>
            <button type="button" className="composer__btn composer__btn--cancel">
              Stop
            </button>
          </ComposerPrimitive.Cancel>
        </AuiIf>
        <AuiIf condition={({ thread }) => !thread.isRunning}>
          <ComposerPrimitive.Send asChild>
            <button type="submit" className="composer__btn composer__btn--send">
              Send
            </button>
          </ComposerPrimitive.Send>
        </AuiIf>
      </div>
    </ComposerPrimitive.Root>
  );
};
