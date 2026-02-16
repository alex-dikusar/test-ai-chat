import { AssistantRuntimeProvider } from '@assistant-ui/react';
import { useChatRuntime, AssistantChatTransport } from '@assistant-ui/react-ai-sdk';
import { ChatThread, TitleGenerator } from '@/widgets/chat';
import { ConversationList } from '@/widgets/conversation-list';
import { Separator } from '@/shared/ui';
import { ThemeSwitcher } from '@/app/ui';

function App() {
  const runtime = useChatRuntime({
    transport: new AssistantChatTransport({
      api: '/api/chat',
    }),
  });

  return (
    <AssistantRuntimeProvider runtime={runtime}>
      <TitleGenerator />
      <div className="flex h-full max-w-full flex-col bg-background text-foreground">
        <header className="flex shrink-0 items-center justify-between gap-4 border-b border-border/60 px-6 py-4">
          <h1 className="m-0 text-base font-semibold tracking-tight">AI Chat</h1>
          <ThemeSwitcher />
        </header>
        <div className="flex flex-1 min-h-0 overflow-hidden">
          <ConversationList />
          <Separator orientation="vertical" />
          <main className="flex-1 min-h-0 min-w-0 flex flex-col">
            <ChatThread />
          </main>
        </div>
      </div>
    </AssistantRuntimeProvider>
  );
}

export default App;
