import Banner from '@/components/ui/Banner'
import './globals.css'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 text-gray-900">
        <Banner />
        <main className="mx-auto max-w-5xl">{children}</main>
      </body>
    </html>
  )
}
