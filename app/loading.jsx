import React from 'react';

export default function GlobalLoading() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Top Nav Skeleton */}
      <div className="h-20 border-b border-zinc-200 px-4 sm:px-8 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="h-10 w-10 rounded-xl bg-zinc-200 animate-pulse" />
          <div className="h-6 w-28 rounded-md bg-zinc-200 animate-pulse" />
        </div>
        <div className="hidden lg:flex items-center gap-6">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-4 w-16 rounded-md bg-zinc-200 animate-pulse" />
          ))}
        </div>
        <div className="h-10 w-48 rounded-lg bg-zinc-100 animate-pulse hidden md:block" />
        <div className="flex items-center gap-4">
          <div className="h-8 w-8 rounded-full bg-zinc-100 animate-pulse" />
          <div className="h-8 w-8 rounded-full bg-zinc-100 animate-pulse" />
          <div className="h-8 w-8 rounded-full bg-zinc-100 animate-pulse" />
        </div>
      </div>

      {/* Hero Section Skeleton */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-6 space-y-6">
          <div className="h-7 w-48 rounded-full bg-zinc-200 animate-pulse" />
          <div className="space-y-3">
            <div className="h-12 w-full max-w-md rounded-xl bg-zinc-200 animate-pulse" />
            <div className="h-12 w-3/4 rounded-xl bg-zinc-200 animate-pulse" />
          </div>
          <div className="h-16 w-full max-w-lg rounded-xl bg-zinc-100 animate-pulse" />
          <div className="flex gap-4 pt-2">
            <div className="h-12 w-44 rounded-xl bg-zinc-300 animate-pulse" />
            <div className="h-12 w-36 rounded-xl bg-zinc-100 animate-pulse" />
          </div>
        </div>

        <div className="lg:col-span-6">
          <div className="grid grid-cols-2 gap-4 max-w-lg mx-auto">
            <div className="col-span-1 row-span-2 aspect-[3/4.8] rounded-3xl bg-zinc-200 animate-pulse" />
            <div className="col-span-1 aspect-[1/1] rounded-3xl bg-zinc-100 animate-pulse" />
            <div className="col-span-1 aspect-[1/1] rounded-3xl bg-zinc-100 animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}
