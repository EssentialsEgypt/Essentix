import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { PremiumThemeProvider } from '@/components/providers/theme-provider';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata = {
  title: 'Essentials Enhanced - AI-Powered Business Operating System',
  description: 'The most powerful, complete, and AI-integrated Business Operating System in the world.',
  keywords: 'AI, Business, Dashboard, Analytics, Social Media, Marketing',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider>
          <PremiumThemeProvider>
            {children}
            <Toaster />
          </PremiumThemeProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
