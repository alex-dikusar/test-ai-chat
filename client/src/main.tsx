import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './app/styles/index.css'
import App from './app/App'
import { ThemeProvider } from './app/ui'

const root = document.getElementById('root')
if (root) {
  createRoot(root).render(
    <StrictMode>
      <ThemeProvider defaultTheme="dark" storageKey="ai-chat-theme">
        <App />
      </ThemeProvider>
    </StrictMode>,
  )
}
