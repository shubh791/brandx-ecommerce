'use client';

import React, { useState } from 'react';
import { Mail, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useShop } from '@/context/ShopContext';

export function NewsletterCta() {
  const { showToast } = useShop();
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      showToast('VIP pass active! Use coupon BRANDX10 for 10% off.', 'success');
    }
  };

  return (
    <section className="py-14 sm:py-16 bg-white border-t border-zinc-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl border border-zinc-200 bg-zinc-900 text-white p-8 sm:p-12 text-center shadow-lg overflow-hidden">
          <div className="relative z-10 max-w-xl mx-auto space-y-3.5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-mono uppercase">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              VIP DROP PASS
            </div>

            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              GET 24-HOUR EARLY ACCESS TO NEW DROPS
            </h2>

            <p className="text-xs sm:text-sm text-zinc-300">
              Join the Brand X Samalkha list. Receive drop alerts before public release and claim a 10% discount on your first order.
            </p>

            {isSubscribed ? (
              <div className="p-3.5 rounded-xl bg-emerald-900/50 border border-emerald-500/40 text-emerald-300 flex items-center justify-center gap-2 text-xs font-mono font-bold">
                <CheckCircle2 className="w-4 h-4" />
                VIP Member Active! Use code <strong>BRANDX10</strong> at checkout.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto pt-2">
                <div className="relative flex-1">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                  <input
                    type="email"
                    required
                    placeholder="Enter your email or phone..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 text-xs bg-zinc-800 border border-zinc-700 rounded-xl text-white placeholder-zinc-400 focus:outline-none focus:border-white"
                  />
                </div>
                <Button type="submit" variant="amber" size="md" className="font-bold">
                  Claim VIP Pass <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </Button>
              </form>
            )}

            <p className="text-[10px] font-mono text-zinc-400">
              Instant coupon code. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
