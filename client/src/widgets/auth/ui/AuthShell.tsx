import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ThemeSwitcher } from '@/app/ui'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/ui'

type AuthShellProps = {
  title: string
  description: string
  footerText: string
  footerLinkLabel: string
  footerLinkTo: string
  children: ReactNode
}

export function AuthShell({
  title,
  description,
  footerText,
  footerLinkLabel,
  footerLinkTo,
  children,
}: AuthShellProps) {
  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="flex justify-end px-6 py-4">
        <ThemeSwitcher />
      </header>
      <main className="flex flex-1 items-center justify-center px-4 pb-12">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {children}
            <p className="text-center text-sm text-muted-foreground">
              {footerText}{' '}
              <Link className="text-primary hover:underline" to={footerLinkTo}>
                {footerLinkLabel}
              </Link>
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
