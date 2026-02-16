import type { FC } from 'react';
import { MessagePartPrimitive, MessagePrimitive } from '@assistant-ui/react';
import { MessageError } from './MessageError';
import { MarkdownText } from './MarkdownText';

export const AssistantMessage: FC = () => {
  return (
    <MessagePrimitive.Root 
      data-role="assistant" 
      className="self-start w-full max-w-full px-1 py-1 text-foreground whitespace-pre-wrap"
    >
      <MessagePrimitive.Parts
        components={{
          Text: () => <MarkdownText className="leading-relaxed break-words [&_p]:my-1 [&_p:first-child]:mt-0 [&_p:last-child]:mb-0 [&_ul]:my-1 [&_ol]:my-1 [&_ul]:pl-5 [&_ol]:pl-5 [&_code]:text-[0.9em] [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:bg-muted-foreground/10 [&_pre]:my-2 [&_pre]:p-3 [&_pre]:rounded-lg [&_pre]:bg-muted-foreground/5 [&_pre]:overflow-x-auto [&_pre_code]:p-0 [&_pre_code]:bg-transparent [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-2 [&_a:hover]:text-primary/80 [&_img]:block [&_img]:max-w-full [&_img]:max-h-[200px] [&_img]:w-auto [&_img]:h-auto [&_img]:rounded-lg [&_img]:mt-2 [&_img]:object-contain" />,
          Image: () => <MessagePartPrimitive.Image alt="Attachment" className="block max-w-full max-h-[200px] w-auto h-auto rounded-lg mt-2 object-contain" />,
        }}
      />
      <MessageError />
    </MessagePrimitive.Root>
  );
};
