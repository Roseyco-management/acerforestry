import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Admin Login | Acer Forestry',
  description: 'Sign in to the Acer Forestry admin dashboard',
}

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Simple layout without the admin sidebar/header
  // This overrides the parent admin layout
  return <>{children}</>
}
