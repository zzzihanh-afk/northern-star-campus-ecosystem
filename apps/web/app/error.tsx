'use client';

import React, { useEffect } from 'react';
import { AlertTriangle, RotateCcw } from 'lucide-react';

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('App Error Boundary caught:', error);
  }, [error]);

  const message =
    error && typeof error === 'object' && 'message' in error && error.message
      ? error.message
      : 'A client-side event occurred. Click below to continue.';

  return (
    <div className="min-h-[400px] flex items-center justify-center p-6">
      <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-lg border border-slate-200 text-center space-y-4">
        <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center mx-auto">
          <AlertTriangle className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-slate-900">Module Refresh</h3>
          <p className="text-xs text-slate-500 mt-1">{message}</p>
        </div>
        <button
          onClick={() => reset()}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold inline-flex items-center space-x-1.5 transition-all shadow-md shadow-blue-600/20"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reload Module</span>
        </button>
      </div>
    </div>
  );
}
