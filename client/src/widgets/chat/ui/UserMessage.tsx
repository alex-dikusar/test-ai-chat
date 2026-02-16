import type { FC } from 'react';
import { MessagePartPrimitive, MessagePrimitive } from '@assistant-ui/react';
import { MarkdownText } from './MarkdownText';

export const UserMessage: FC = () => {
  return (
    <MessagePrimitive.Root 
      data-role="user" 
      className="self-end max-w-[80%] rounded-2xl bg-secondary px-4 py-3 text-secondary-foreground shadow-sm"
    >
      <MessagePrimitive.Parts
        components={{
          Text: () => <MarkdownText className="leading-relaxed break-words [&_p]:my-1 [&_p:first-child]:mt-0 [&_p:last-child]:mb-0 [&_ul]:my-1 [&_ol]:my-1 [&_ul]:pl-5 [&_ol]:pl-5 [&_code]:text-[0.9em] [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:bg-primary-foreground/20 [&_pre]:my-2 [&_pre]:p-3 [&_pre]:rounded-lg [&_pre]:bg-primary-foreground/10 [&_pre]:overflow-x-auto [&_pre_code]:p-0 [&_pre_code]:bg-transparent [&_a]:underline [&_a]:underline-offset-2 [&_a:hover]:opacity-80 [&_img]:block [&_img]:max-w-full [&_img]:max-h-[200px] [&_img]:w-auto [&_img]:h-auto [&_img]:rounded-lg [&_img]:mt-2 [&_img]:object-contain" />,
          Image: () => <MessagePartPrimitive.Image alt="Attachment" className="block max-w-full max-h-[200px] w-auto h-auto rounded-lg mt-2 object-contain" />,
        }}
      />
    </MessagePrimitive.Root>
  );
};
