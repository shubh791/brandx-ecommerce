'use client';

import React from 'react';
import {
  MapPin,
  Clock,
  MessageSquare,
  CheckCircle2,
  Navigation,
} from 'lucide-react';
import { siteConfig } from '@/data/siteConfig';
import { storeData } from '@/data/storeData';
import { Button } from '@/components/ui/Button';

export function StoreLocation() {
  return (
    <section id="store-location" className="py-14 sm:py-20 bg-zinc-50 border-t border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left: Info Card (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between rounded-3xl border border-zinc-200 bg-white p-6 sm:p-8 shadow-sm space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-mono font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-700 animate-ping" />
                OPEN DAILY • 08:00 AM - 08:30 PM
              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-zinc-950 tracking-tight mt-3">
                SAMALKHA FLAGSHIP STORE
              </h2>
              <p className="text-zinc-600 text-xs sm:text-sm mt-1.5 leading-relaxed">
                Experience our full streetwear archive in person in Samalkha (Panipat). Check fabric weights, try out fits in our lounges, and collect orders directly.
              </p>
            </div>

            {/* Address & Timings */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
              <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-1">
                <span className="flex items-center gap-1.5 text-black font-bold uppercase tracking-wider">
                  <MapPin className="w-4 h-4" /> Physical Store
                </span>
                <p className="text-zinc-700 font-normal leading-relaxed">
                  Near Tota Ram Gate, Old Truck Union,
                  <br />
                  NH-1, Samalkha, Panipat,
                  <br />
                  Haryana — 132101
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-1">
                <span className="flex items-center gap-1.5 text-black font-bold uppercase tracking-wider">
                  <Clock className="w-4 h-4" /> Operating Hours
                </span>
                <p className="text-zinc-700 font-normal leading-relaxed">
                  Monday to Sunday:
                  <br />
                  <strong className="text-zinc-950 font-bold">08:00 AM – 08:30 PM</strong>
                  <br />
                  Walk-ins Welcome Daily
                </p>
              </div>
            </div>

            {/* Amenities */}
            <div className="grid grid-cols-2 gap-3 pt-1">
              {storeData.amenities.map((amenity, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs text-zinc-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-zinc-950 block">{amenity.title}</span>
                    <span className="text-zinc-500 text-[11px]">{amenity.desc}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="pt-3 border-t border-zinc-100 flex flex-col sm:flex-row gap-3">
              <a
                href={siteConfig.store.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1"
              >
                <Button variant="primary" size="md" className="w-full font-bold">
                  <Navigation className="w-4 h-4 mr-2" />
                  Open in Google Maps
                </Button>
              </a>

              <a
                href={storeData.contact.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1"
              >
                <Button variant="secondary" size="md" className="w-full text-zinc-900 border-zinc-300 font-bold">
                  <MessageSquare className="w-4 h-4 mr-2 text-emerald-600" />
                  WhatsApp Direct Inquiry
                </Button>
              </a>
            </div>
          </div>

          {/* Right: Visual Store Card (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col rounded-3xl border border-zinc-200 bg-white overflow-hidden shadow-sm">
            <div className="relative h-48 w-full bg-zinc-100 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1000&q=80"
                alt="Brand X Store Front"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-4 right-4 text-xs font-mono text-white flex justify-between">
                <span className="bg-black/60 px-2 py-0.5 rounded backdrop-blur-sm">
                  📍 Samalkha, Panipat (NH-1)
                </span>
                <span className="bg-black/60 px-2 py-0.5 rounded backdrop-blur-sm">
                  Front Parking
                </span>
              </div>
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <h4 className="text-sm font-bold text-zinc-900">Visiting from Panipat / Delhi:</h4>
                <ul className="text-xs text-zinc-600 space-y-1.5 list-disc pl-4">
                  <li>Directly accessible on <strong>NH-1 (GT Road)</strong> near Tota Ram Gate.</li>
                  <li>Ample front parking space for cars & two-wheelers.</li>
                  <li>15 mins from Panipat City Center.</li>
                </ul>
              </div>

              <div className="p-3.5 rounded-xl bg-zinc-50 border border-zinc-200 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono text-zinc-400 uppercase block">Phone Hotline:</span>
                  <a
                    href={`tel:${siteConfig.store.phone}`}
                    className="text-sm font-bold font-mono text-black hover:underline"
                  >
                    {siteConfig.store.phoneDisplay}
                  </a>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-mono text-zinc-400 uppercase block">Payment:</span>
                  <span className="text-xs font-mono text-zinc-800 font-bold">UPI / Cash / Cards</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
