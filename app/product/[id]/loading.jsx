import React from 'react';

export default function ProductLoading() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="bg-zinc-50 border-b border-zinc-200 py-3.5 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto h-4 w-48 bg-zinc-200 rounded animate-pulse" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-7 flex flex-col sm:flex-row gap-4">
          <div className="flex sm:flex-col gap-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-20 w-20 rounded-2xl bg-zinc-200 animate-pulse" />
            ))}
          </div>
          <div className="flex-1 aspect-[3/4] rounded-3xl bg-zinc-200 animate-pulse" />
        </div>

        <div className="lg:col-span-5 space-y-6">
          <div className="h-6 w-28 rounded-full bg-zinc-200 animate-pulse" />
          <div className="h-10 w-full rounded-xl bg-zinc-300 animate-pulse" />
          <div className="h-20 w-full rounded-2xl bg-zinc-100 animate-pulse" />
          <div className="h-12 w-full rounded-xl bg-zinc-200 animate-pulse" />
          <div className="h-14 w-full rounded-xl bg-zinc-900 animate-pulse" />
        </div>
      </div>
    </div>
  );
}