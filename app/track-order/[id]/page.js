'use client';

import React, { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';
import {
  Package,
  CheckCircle2,
  Truck,
  MapPin,
  Clock,
  MessageSquare,
  ShieldCheck,
  Download,
  ChevronRight,
  Sparkles,
  ArrowLeft,
  Radio,
} from 'lucide-react';

const trackingSteps = [
  {
    step: 1,
    title: 'Order Placed & Verified',
    desc: 'Order verified in Brand X system.',
    time: 'Today, 10:30 AM',
    location: 'Brand X Online Store',
    done: true,
  },
  {
    step: 2,
    title: 'Quality Checked & Fabric Inspected',
    desc: 'GSM weight & stitching inspected by Samalkha team.',
    time: 'Today, 11:45 AM',
    location: 'Samalkha NH-1 Flagship Store',
    done: true,
  },
  {
    step: 3,
    title: 'Packed in Tamper-Proof Streetwear Box',
    desc: 'Sealed with VIP stickers and invoice.',
    time: 'Today, 01:15 PM',
    location: 'Samalkha Fulfillment Hub',
    done: true,
  },
  {
    step: 4,
    title: 'Dispatched via Express Courier',
    desc: 'Handed over to Bluedart / Delhivery logistics.',
    time: 'Estimated Today, 04:00 PM',
    location: 'GT Road Dispatch Center',
    done: false,
    active: true,
  },
  {
    step: 5,
    title: 'Out for Delivery',
    desc: 'Courier executive assigned for doorstep drop.',
    time: 'Tomorrow Morning',
    location: 'Destination Hub',
    done: false,
  },
  {
    step: 6,
    title: 'Delivered',
    desc: 'Package delivered to recipient.',
    time: 'Tomorrow, by 05:00 PM',
    location: 'Customer Address',
    done: false,
  },
];

export default function TrackOrderPage({ params }) {
  const unwrappedParams = use(params);
  const orderId = unwrappedParams?.id || 'BX-892104';

  const [liveStep, setLiveStep] = useState(4);
  const [isSimulating, setIsSimulating] = useState(false);

  // SSE Live Simulation Effect
  useEffect(() => {
    const timer = setInterval(() => {
      setIsSimulating(true);
      setTimeout(() => setIsSimulating(false), 1200);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const handlePrintInvoice = () => {
    window.print();
  };

  return (
    <div className="flex flex-col min-h-screen bg-zinc-50 text-zinc-900 select-none">
      <Navbar />

      <main className="flex-1 py-8 sm:py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          
          {/* Top Return Link */}
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs font-mono font-bold text-zinc-600 hover:text-black"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Store
            </Link>
            <div className="flex items-center gap-2">
              <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-ping" />
              <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                LIVE SSE UPDATES ACTIVE
              </span>
            </div>
          </div>

          {/* Header Card */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-zinc-200 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-zinc-400">
                  SAMALKHA DISPATCH ORDER
                </span>
                <h1 className="text-2xl sm:text-3xl font-black text-zinc-950 mt-0.5">
                  ORDER #{orderId.toUpperCase()}
                </h1>
                <p className="text-xs text-zinc-500 font-mono mt-1">
                  Estimated Delivery: <strong className="text-black">Tomorrow, by 05:00 PM</strong>
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={handlePrintInvoice}
                  className="font-bold text-xs"
                >
                  <Download className="w-3.5 h-3.5 mr-1.5" />
                  Print Invoice
                </Button>
                <a
                  href="https://wa.me/919999999999"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="primary" size="sm" className="font-bold text-xs">
                    <MessageSquare className="w-3.5 h-3.5 mr-1.5 text-emerald-400" />
                    Help Desk
                  </Button>
                </a>
              </div>
            </div>

            {/* Dispatch Hub Badge */}
            <div className="p-3.5 rounded-2xl bg-zinc-50 border border-zinc-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono">
              <span className="flex items-center gap-2 text-zinc-700">
                <MapPin className="w-4 h-4 text-black shrink-0" />
                Dispatch Origin: <strong>Brand X Flagship, NH-1, Samalkha, Panipat (132101)</strong>
              </span>
              <span className="text-emerald-700 font-bold">Express Bluedart AWB: #BLU-{Math.floor(10000000 + Math.random() * 90000000)}</span>
            </div>
          </div>

          {/* Real-Time Tracking Timeline */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-zinc-200 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-zinc-100 pb-4">
              <h2 className="text-base font-bold text-zinc-950 flex items-center gap-2">
                <Truck className="w-5 h-5" />
                Live Fulfillment Progress
              </h2>
              {isSimulating && (
                <span className="text-[11px] font-mono text-emerald-600 flex items-center gap-1">
                  <Radio className="w-3.5 h-3.5 animate-pulse" /> Syncing with Hub...
                </span>
              )}
            </div>

            {/* Timeline Steps */}
            <div className="relative pl-6 space-y-8 before:absolute before:left-2.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-zinc-200">
              {trackingSteps.map((s, idx) => {
                const isCompleted = s.done;
                const isCurrent = s.active;

                return (
                  <div key={idx} className="relative flex items-start gap-4">
                    {/* Node Dot */}
                    <div
                      className={`absolute -left-6 flex h-6 w-6 items-center justify-center rounded-full border-2 transition-all ${
                        isCompleted
                          ? 'bg-black border-black text-white'
                          : isCurrent
                          ? 'bg-amber-400 border-black text-black ring-4 ring-amber-100'
                          : 'bg-white border-zinc-300 text-transparent'
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="w-3.5 h-3.5 stroke-[2.5]" />
                      ) : (
                        <span className="w-2 h-2 rounded-full bg-black" />
                      )}
                    </div>

                    {/* Step Content */}
                    <div className="space-y-0.5 flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                        <h4
                          className={`text-sm font-bold ${
                            isCompleted || isCurrent ? 'text-zinc-950' : 'text-zinc-400'
                          }`}
                        >
                          {s.title}
                        </h4>
                        <span className="text-[11px] font-mono text-zinc-400">{s.time}</span>
                      </div>
                      <p className="text-xs text-zinc-500">{s.desc}</p>
                      <span className="text-[10px] font-mono text-zinc-400 flex items-center gap-1 pt-0.5">
                        <MapPin className="w-3 h-3" /> {s.location}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Package Summary Box */}
          <div className="p-6 rounded-3xl bg-white border border-zinc-200 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-zinc-950 uppercase tracking-wider font-mono">
              Items in Package
            </h3>

            <div className="flex items-center gap-4 p-3 rounded-2xl bg-zinc-50 border border-zinc-200">
              <img
                src="https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=300&q=80"
                alt="Hoodie"
                className="h-16 w-16 rounded-xl object-cover border border-zinc-200"
              />
              <div className="flex-1">
                <h4 className="text-xs font-bold text-zinc-950">Cyberpunk Heavy French Terry Hoodie</h4>
                <div className="flex items-center gap-2 mt-1 text-[11px] font-mono text-zinc-600">
                  <span>Size: <strong>L</strong></span>
                  <span>•</span>
                  <span>Fabric: <strong>450 GSM</strong></span>
                  <span>•</span>
                  <span>Qty: <strong>1</strong></span>
                </div>
              </div>
              <span className="text-xs font-mono font-bold text-zinc-950">₹2,499</span>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}