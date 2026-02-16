import { AssistantRuntimeProvider } from '@assistant-ui/react';
import { useChatRuntime, AssistantChatTransport } from '@assistant-ui/react-ai-sdk';
import { ChatThread } from './components/ChatThread';
import { ConversationList } from './components/ConversationList';
import { TitleGenerator } from './components/TitleGenerator';
import './App.css';

function ChatApp() {
  const runtime = useChatRuntime({
    transport: new AssistantChatTransport({
      api: '/api/chat',
    }),
  });

  return (
    <AssistantRuntimeProvider runtime={runtime}>
      <TitleGenerator />
      <div className="app">
        <header className="app-header">
          <h1>AI Chat</h1>
        </header>
        <div className="app-body">
          <ConversationList />
          <main className="app-main">
            <ChatThread />
          </main>
        </div>
      </div>
    </AssistantRuntimeProvider>
  );
}

export default ChatApp;
