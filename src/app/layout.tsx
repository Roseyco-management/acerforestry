import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Acer Forestry',
  description:
    'Professional forestry services for sustainable woodland management',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
