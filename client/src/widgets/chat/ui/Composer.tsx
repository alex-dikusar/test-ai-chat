import type { FC } from 'react';
import { AuiIf, ComposerPrimitive } from '@assistant-ui/react';
import { Button, Textarea } from '@/shared/ui';

export const Composer: FC = () => {
  return (
    <ComposerPrimitive.Root className="mt-2 flex flex-col gap-2">
      <ComposerPrimitive.Input
        asChild
        placeholder="Send a message..."
        rows={2}
        autoFocus
        aria-label="Message input"
      >
        <Textarea className="min-h-[56px] resize-none rounded-2xl border-border bg-card px-4 py-3 shadow-sm focus-visible:ring-2" />
      </ComposerPrimitive.Input>
      <div className="flex justify-end gap-2">
        <AuiIf condition={({ thread }) => thread.isRunning}>
          <ComposerPrimitive.Cancel asChild>
            <Button type="button" variant="secondary" size="sm">
              Stop
            </Button>
          </ComposerPrimitive.Cancel>
        </AuiIf>
        <AuiIf condition={({ thread }) => !thread.isRunning}>
          <ComposerPrimitive.Send asChild>
            <Button type="submit" size="sm">
              Send
            </Button>
          </ComposerPrimitive.Send>
        </AuiIf>
      </div>
    </ComposerPrimitive.Root>
  );
};
