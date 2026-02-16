import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

type AuthUser = {
  id: string
  email: string
  name: string | null
}

type AuthResponse = {
  user: AuthUser
  token: string
}

type AuthContextValue = {
  user: AuthUser | null
  token: string
  isAuthenticated: boolean
  isInitialized: boolean
  login: (payload: { email: string; password: string }) => Promise<void>
  register: (payload: { email: string; password: string; name?: string }) => Promise<void>
  logout: () => void
}

const AUTH_STORAGE_KEY = 'ai-chat-auth'
const AUTH_API_BASE = '/api/auth'

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

function parseErrorMessage(value: unknown): string {
  if (!value || typeof value !== 'object') return 'Unexpected response from server'
  if ('message' in value && typeof value.message === 'string') return value.message
  if ('error' in value && typeof value.error === 'string') return value.error
  return 'Request failed'
}

async function requestAuth<TPayload extends object>(
  endpoint: 'login' | 'register',
  payload: TPayload,
): Promise<AuthResponse> {
  const response = await fetch(`${AUTH_API_BASE}/${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })

  const data = (await response.json().catch(() => null)) as unknown
  if (!response.ok) {
    throw new Error(parseErrorMessage(data))
  }

  if (!data || typeof data !== 'object' || !('token' in data) || !('user' in data)) {
    throw new Error('Invalid auth response payload')
  }

  return data as AuthResponse
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [token, setToken] = useState('')
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(AUTH_STORAGE_KEY)
      if (raw) {
        const parsed = JSON.parse(raw) as AuthResponse
        if (parsed?.token && parsed?.user?.email) {
          setToken(parsed.token)
          setUser(parsed.user)
        }
      }
    } catch {
      localStorage.removeItem(AUTH_STORAGE_KEY)
    } finally {
      setIsInitialized(true)
    }
  }, [])

  const persistAuth = useCallback((payload: AuthResponse) => {
    setToken(payload.token)
    setUser(payload.user)
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(payload))
  }, [])

  const clearAuth = useCallback(() => {
    setToken('')
    setUser(null)
    localStorage.removeItem(AUTH_STORAGE_KEY)
  }, [])

  const login = useCallback(
    async (payload: { email: string; password: string }) => {
      const auth = await requestAuth('login', payload)
      persistAuth(auth)
    },
    [persistAuth],
  )

  const register = useCallback(
    async (payload: { email: string; password: string; name?: string }) => {
      const auth = await requestAuth('register', payload)
      persistAuth(auth)
    },
    [persistAuth],
  )

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      token,
      isAuthenticated: Boolean(token && user),
      isInitialized,
      login,
      register,
      logout: clearAuth,
    }),
    [clearAuth, isInitialized, login, register, token, user],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
