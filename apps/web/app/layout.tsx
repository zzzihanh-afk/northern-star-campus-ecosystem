import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Northern Star Smart Campus | School & College Management Ecosystem',
  description: 'Enterprise-Quality Digital Campus Ecosystem for Northern Star School & College. Learn • Grow • Excel.',
  icons: {
    icon: '/logo.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased selection:bg-blue-600 selection:text-white">
        {children}
      </body>
    </html>
  );
}
