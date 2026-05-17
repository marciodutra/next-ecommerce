import './globals.css';
import type { Metadata } from 'next';  
import { Inter } from 'next/font/google';
import Navbar from './components/Navbar';


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Next E-commerce',
  description: 'Next E-commerce utilizando a versão 13',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        
        <Navbar />
        <main className="bg-slate-700 h-screen p-16">
          {children}
        </main>
      </body>
    </html>
  )
}