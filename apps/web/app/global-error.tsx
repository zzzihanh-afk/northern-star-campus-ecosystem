'use client';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body className="bg-slate-900 text-white min-h-screen flex items-center justify-center p-6">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold">Something went wrong</h2>
          <button
            onClick={() => reset()}
            className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold"
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
