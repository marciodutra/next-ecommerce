import './globals.css';
import clsx from 'clsx';
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
      <body className={clsx(inter.className, 'bg-slate-700')}>
        
        <Navbar />
        <main className="h-screen p-16">
          {children}
        </main>
      </body>
    </html>
  )
}