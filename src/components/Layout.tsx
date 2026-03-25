import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'SEU NOME — Portfolio',
  description: 'Python, Streamlit, Power Platform & Web Developer',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}