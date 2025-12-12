// Loading spinner component

export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center py-8 gap-3">
      <div className="relative">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-200"></div>
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent absolute top-0 left-0"></div>
      </div>
      <p className="text-sm text-gray-500 animate-pulse">Yükleniyor...</p>
    </div>
  );
}
