function SkeletonCard() {
  return (
    <div className="animate-pulse p-4 bg-white rounded-xl shadow-md w-full max-w-sm">
      <div className="h-40 bg-gray-400 rounded-lg mb-4" />
      <div className="h-4 bg-gray-400 rounded w-3/4 mb-2" />
      <div className="h-4 bg-gray-400 rounded w-1/2" />
    </div>
  );
}

export default SkeletonCard;
