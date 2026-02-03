import { AssistantRuntimeProvider } from '@assistant-ui/react';
import { useChatRuntime, AssistantChatTransport } from '@assistant-ui/react-ai-sdk';
import { ChatThread } from './components/ChatThread';
import './App.css';

function ChatApp() {
  const runtime = useChatRuntime({
    transport: new AssistantChatTransport({
      api: '/api/chat',
    }),
  });

  return (
    <AssistantRuntimeProvider runtime={runtime}>
      <div className="app">
        <header className="app-header">
          <h1>AI Chat</h1>
        </header>
        <main className="app-main">
          <ChatThread />
        </main>
      </div>
    </AssistantRuntimeProvider>
  );
}

export default ChatApp;
