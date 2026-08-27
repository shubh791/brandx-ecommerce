import React from 'react';

export default function CategoryLoading() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Category Header Skeleton */}
      <div className="bg-zinc-50 border-b border-zinc-200 py-8 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto space-y-3">
          <div className="h-4 w-32 bg-zinc-200 rounded animate-pulse" />
          <div className="h-10 w-64 bg-zinc-300 rounded-xl animate-pulse" />
        </div>
      </div>

      {/* Grid Skeleton */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 w-full space-y-8">
        <div className="flex gap-3 overflow-hidden">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-9 w-32 bg-zinc-100 rounded-xl animate-pulse shrink-0" />
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="rounded-2xl border border-zinc-200 bg-white overflow-hidden p-3 space-y-3">
              <div className="aspect-[3/4] bg-zinc-200 rounded-xl animate-pulse" />
              <div className="h-4 w-3/4 bg-zinc-200 rounded animate-pulse" />
              <div className="h-4 w-1/2 bg-zinc-100 rounded animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}