function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="relative flex flex-col items-center gap-3" role="status" aria-live="polite">
        <div className="w-20 h-20 border-emerald-200 border-2 rounded-full"></div>
        <div className="w-20 h-20 border-emerald-500 border-t-2 animate-spin rounded-full absolute left-0 top-0"></div>
        <p className="text-emerald-200 text-sm">Server Waking Up...</p>
        <span className="sr-only">Loading</span>
      </div>
    </div>
  );
}

export default LoadingSpinner;
