import './globals.css';
import { Inter } from 'next/font/google';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/components/theme-provider';
import ClientProvider from './ClientProvider';
import DesktopNav from '@/components/DesktopNav';
import MobileNav from '@/components/MobileNav';


const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
        >
          <ClientProvider>
          <Toaster/>
          <div className="min-h-screen bg-background text-foreground">
          <DesktopNav />
          <MobileNav />
            <main>{children}</main>
          </div>
          </ClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}