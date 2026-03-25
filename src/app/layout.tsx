import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Luis Ignacio Jr. — Portfolio',
  description: 'Python · Streamlit · Power Platform · Web',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" data-theme="dark">
      <body>{children}</body>
    </html>
  )
}