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
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Global handler: prevent raw DOM Event objects (from extensions, network drops, or media errors)
              // from triggering Next.js unhandled runtime error overlays.
              if (typeof window !== 'undefined') {
                window.addEventListener('unhandledrejection', function(event) {
                  if (!event) return;
                  var reason = event.reason;
                  if (
                    reason instanceof Event ||
                    (reason && Object.prototype.toString.call(reason) === '[object Event]') ||
                    (reason && typeof reason === 'object' && ('isTrusted' in reason || ('type' in reason && !reason.message)))
                  ) {
                    event.preventDefault();
                    if (event.stopImmediatePropagation) event.stopImmediatePropagation();
                    console.warn('[Handled DOM Rejection]:', reason);
                  }
                }, true);

                window.addEventListener('error', function(event) {
                  if (!event) return;
                  if (
                    event.error instanceof Event ||
                    (event.error && Object.prototype.toString.call(event.error) === '[object Event]') ||
                    event.message === 'Script error.'
                  ) {
                    event.preventDefault();
                    if (event.stopImmediatePropagation) event.stopImmediatePropagation();
                    console.warn('[Handled DOM Error]:', event);
                  }
                }, true);
              }
            `,
          }}
        />
      </head>
      <body className="antialiased selection:bg-blue-600 selection:text-white">
        {children}
      </body>
    </html>
  );
}
