'use client';

import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { HeroBanner } from '@/components/shop/HeroBanner';
import { CategoryTiles } from '@/components/shop/CategoryTiles';
import { TrendingDrops } from '@/components/shop/TrendingDrops';
import { DropCampaign } from '@/components/shop/DropCampaign';
import { Footer } from '@/components/layout/Footer';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* 1. Myntra-Style Navbar with Mega Menu */}
      <Navbar />

      <main className="flex-1">
        {/* 2. Clean Streetwear Hero Banner */}
        <HeroBanner />

        {/* 3. Shop by Category Visual Tiles (Snitch-Style) */}
        <CategoryTiles />

        {/* 4. Shop the Look Editorial */}
        <TrendingDrops />

        {/* 5. New Drop Campaign */}
        <DropCampaign />
      </main>

      {/* 6. Clean Footer */}
      <Footer />
    </div>
  );
}
