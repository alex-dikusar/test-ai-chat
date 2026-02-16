import { AssistantRuntimeProvider } from '@assistant-ui/react'
import { AssistantChatTransport, useChatRuntime } from '@assistant-ui/react-ai-sdk'
import { ThemeSwitcher } from '@/app/ui'
import { useAuth } from '@/widgets/auth'
import { Separator, Button } from '@/shared/ui'
import { ChatThread, TitleGenerator } from '@/widgets/chat'
import { ConversationList } from '@/widgets/conversation-list'

export function Chat() {
  const { token, user, logout } = useAuth()
  const runtime = useChatRuntime({
    transport: new AssistantChatTransport({
      api: '/api/chat',
      headers: () => ({
        Authorization: `Bearer ${token}`,
      }),
    }),
  })

  return (
    <AssistantRuntimeProvider runtime={runtime}>
      <TitleGenerator token={token} />
      <div className="flex h-full max-w-full flex-col bg-background text-foreground">
        <header className="flex shrink-0 items-center justify-between gap-4 border-b border-border/60 px-6 py-4">
          <div className="min-w-0">
            <h1 className="m-0 text-base font-semibold tracking-tight">AI Chat</h1>
            <p className="m-0 mt-1 truncate text-xs text-muted-foreground">
              Signed in as {user?.email}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <ThemeSwitcher />
            <Button type="button" variant="outline" size="sm" onClick={logout}>
              Logout
            </Button>
          </div>
        </header>
        <div className="flex min-h-0 flex-1 overflow-hidden">
          <ConversationList />
          <Separator orientation="vertical" />
          <main className="flex min-h-0 min-w-0 flex-1 flex-col">
            <ChatThread />
          </main>
        </div>
      </div>
    </AssistantRuntimeProvider>
  )
}
