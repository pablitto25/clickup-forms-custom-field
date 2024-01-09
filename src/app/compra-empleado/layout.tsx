import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Formulario de compras de empleados',
  description: 'Realiza aqui la compra interna para empleados Latamly',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
