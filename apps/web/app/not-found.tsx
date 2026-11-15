import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-6 text-center text-white">
      <div className="max-w-md space-y-4">
        <h1 className="text-6xl font-black text-blue-500">404</h1>
        <h2 className="text-xl font-bold">Page Not Found</h2>
        <p className="text-xs text-slate-400">
          The requested page could not be located in the Northern Star Campus System.
        </p>
        <Link
          href="/"
          className="inline-block px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs"
        >
          Return to Dashboard
        </Link>
      </div>
    </div>
  );
}
