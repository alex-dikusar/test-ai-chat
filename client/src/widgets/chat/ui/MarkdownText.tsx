import type { FC } from 'react';
import { memo } from 'react';
import {
  MarkdownTextPrimitive,
  unstable_memoizeMarkdownComponents as memoizeMarkdownComponents,
} from '@assistant-ui/react-markdown';
import remarkGfm from 'remark-gfm';
import '@assistant-ui/react-markdown/styles/dot.css';

type MarkdownTextProps = { className?: string };

const markdownComponents = memoizeMarkdownComponents({
  a: ({ href, children, ...props }) => (
    <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
      {children}
    </a>
  ),
});

const MarkdownTextImpl: FC<MarkdownTextProps> = ({ className }) => (
  <MarkdownTextPrimitive
    remarkPlugins={[remarkGfm]}
    className={className}
    components={markdownComponents}
  />
);

export const MarkdownText = memo(MarkdownTextImpl);
