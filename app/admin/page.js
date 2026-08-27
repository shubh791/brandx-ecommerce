'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Package,
  ShoppingBag,
  Plus,
  Truck,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Search,
  MessageSquare,
  ArrowUpRight,
  Sparkles,
  Layers,
  MapPin,
} from 'lucide-react';
import { productsData } from '@/data/productsData';
import { Button } from '@/components/ui/Button';

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState('orders'); // 'orders' | 'products' | 'analytics'
  const [productsList, setProductsList] = useState(productsData);

  // Orders State
  const [orders, setOrders] = useState([
    {
      id: 'BX-892104',
      customer: 'Rahul Verma',
      phone: '+91 98123 45678',
      items: 'Cyberpunk 450 GSM Hoodie (Size L)',
      amount: 2499,
      status: 'PACKED_AT_HUB',
      time: '12 mins ago',
      type: 'EXPRESS_DELIVERY',
    },
    {
      id: 'BX-772910',
      customer: 'Aman Deep',
      phone: '+91 99887 76655',
      items: 'Mineral Acid-Wash Tee (Size XL)',
      amount: 1299,
      status: 'CONFIRMED',
      time: '45 mins ago',
      type: 'STORE_PICKUP_SAMALKHA',
    },
    {
      id: 'BX-663219',
      customer: 'Karan Sharma',
      phone: '+91 91234 56789',
      items: '6-Pocket Parachute Cargos (Size M)',
      amount: 1899,
      status: 'DISPATCHED',
      time: '2 hours ago',
      type: 'EXPRESS_DELIVERY',
    },
  ]);

  // New Product Form State
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: 'hoodies',
    price: '',
    gsm: '450 GSM',
    fabric: '100% Combed Cotton',
    stockCount: 10,
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80',
  });

  const handleStatusChange = (orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price) return;
    const created = {
      ...newProduct,
      id: `bx-${Date.now().toString().slice(-4)}`,
      categoryLabel: newProduct.category === 'hoodies' ? 'Heavyweight Hoodies' : 'Streetwear Drop',
      price: Number(newProduct.price),
      rating: 5.0,
      reviewsCount: 1,
      tag: 'NEW DROP',
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      gallery: [newProduct.image],
    };
    setProductsList([created, ...productsList]);
    setNewProduct({
      name: '',
      category: 'hoodies',
      price: '',
      gsm: '450 GSM',
      fabric: '100% Combed Cotton',
      stockCount: 10,
      image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80',
    });
  };

  return (
    <div className="min-h-screen bg-zinc-100 text-zinc-900 select-none flex flex-col">
      {/* Admin Top Header */}
      <header className="bg-white border-b border-zinc-200 px-4 sm:px-8 py-4 flex items-center justify-between shadow-xs sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-black text-white font-black text-base">
              X
            </div>
            <div className="flex flex-col">
              <span className="font-black text-base tracking-tight leading-none">
                BRAND<span className="text-zinc-500">X</span> ADMIN
              </span>
              <span className="text-[9px] font-mono text-emerald-600 font-bold">
                SAMALKHA FLAGSHIP DESK
              </span>
            </div>
          </Link>
        </div>

        {/* View Live Store */}
        <Link href="/" target="_blank">
          <Button variant="secondary" size="sm" className="font-mono text-xs">
            Open Live Store <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
          </Button>
        </Link>
      </header>

      {/* Main Admin Dashboard Container */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Metric Cards Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-white border border-zinc-200 shadow-xs space-y-1">
            <span className="text-xs font-mono text-zinc-500 uppercase">Today's Revenue</span>
            <div className="text-2xl font-black font-mono text-zinc-950">₹48,290</div>
            <span className="text-[11px] text-emerald-700 font-mono font-bold flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> +24% vs yesterday
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-zinc-200 shadow-xs space-y-1">
            <span className="text-xs font-mono text-zinc-500 uppercase">Pending Dispatches</span>
            <div className="text-2xl font-black font-mono text-amber-600">6 Orders</div>
            <span className="text-[11px] text-zinc-500 font-mono">Samalkha NH-1 Hub</span>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-zinc-200 shadow-xs space-y-1">
            <span className="text-xs font-mono text-zinc-500 uppercase">Active Catalog Drops</span>
            <div className="text-2xl font-black font-mono text-zinc-950">{productsList.length} Items</div>
            <span className="text-[11px] text-emerald-700 font-mono font-bold">100% In Stock</span>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-zinc-200 shadow-xs space-y-1">
            <span className="text-xs font-mono text-zinc-500 uppercase">Store In-Person Pickups</span>
            <div className="text-2xl font-black font-mono text-zinc-950">3 Ready</div>
            <span className="text-[11px] text-zinc-500 font-mono">Open 8:00 AM - 8:30 PM</span>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 border-b border-zinc-200 pb-2">
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase transition-all cursor-pointer ${
              activeTab === 'orders'
                ? 'bg-black text-white shadow-sm'
                : 'bg-white text-zinc-600 border border-zinc-200 hover:text-black'
            }`}
          >
            Order Fulfillment ({orders.length})
          </button>
          <button
            onClick={() => setActiveTab('products')}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase transition-all cursor-pointer ${
              activeTab === 'products'
                ? 'bg-black text-white shadow-sm'
                : 'bg-white text-zinc-600 border border-zinc-200 hover:text-black'
            }`}
          >
            Product Catalog ({productsList.length})
          </button>
        </div>

        {/* =========================================================
            TAB 1: ORDER MANAGEMENT TABLE
           ========================================================= */}
        {activeTab === 'orders' && (
          <div className="bg-white rounded-3xl border border-zinc-200 shadow-sm overflow-hidden space-y-4 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-black text-zinc-950">Live Orders & Fulfillment Pipeline</h3>
                <p className="text-xs text-zinc-500">
                  Update fulfillment status to stream live updates to client tracking page.
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border border-zinc-200 rounded-2xl overflow-hidden font-mono">
                <thead className="bg-zinc-50 text-zinc-900 border-b border-zinc-200">
                  <tr>
                    <th className="p-3">Order ID</th>
                    <th className="p-3">Customer</th>
                    <th className="p-3">Items</th>
                    <th className="p-3">Amount</th>
                    <th className="p-3">Fulfillment Status</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100">
                  {orders.map((ord) => (
                    <tr key={ord.id} className="hover:bg-zinc-50/60 transition-colors">
                      <td className="p-3 font-bold text-black">
                        <Link href={`/track-order/${ord.id}`} className="hover:underline flex items-center gap-1">
                          #{ord.id} <ArrowUpRight className="w-3 h-3 text-zinc-400" />
                        </Link>
                        <span className="text-[10px] text-zinc-400 block">{ord.time}</span>
                      </td>
                      <td className="p-3">
                        <span className="font-bold text-zinc-900 block">{ord.customer}</span>
                        <span className="text-zinc-500 text-[11px]">{ord.phone}</span>
                      </td>
                      <td className="p-3 text-zinc-700">{ord.items}</td>
                      <td className="p-3 font-bold text-black">₹{ord.amount}</td>
                      <td className="p-3">
                        <select
                          value={ord.status}
                          onChange={(e) => handleStatusChange(ord.id, e.target.value)}
                          className="bg-zinc-50 border border-zinc-200 rounded-lg px-2.5 py-1 text-xs font-bold text-black focus:outline-none focus:border-black cursor-pointer"
                        >
                          <option value="PLACED">Placed</option>
                          <option value="CONFIRMED">Quality Checked</option>
                          <option value="PACKED_AT_HUB">Packed at Samalkha</option>
                          <option value="DISPATCHED">Dispatched (Courier)</option>
                          <option value="DELIVERED">Delivered</option>
                        </select>
                      </td>
                      <td className="p-3 text-right space-x-2">
                        <a
                          href={`https://wa.me/${ord.phone.replace(/[^0-9]/g, '')}?text=Hello%20${ord.customer},%20your%20Brand%20X%20Order%20${ord.id}%20is%20${ord.status}!`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100 text-[11px] font-bold"
                        >
                          <MessageSquare className="w-3 h-3 text-emerald-600" /> WhatsApp
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* =========================================================
            TAB 2: PRODUCT MANAGEMENT & QUICK ADD
           ========================================================= */}
        {activeTab === 'products' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Add New Product Form (4 Cols) */}
            <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-zinc-200 shadow-sm space-y-4">
              <div>
                <h3 className="text-base font-black text-zinc-950">Add New Drop to Store</h3>
                <p className="text-xs text-zinc-500">Instantly creates product entry in catalog.</p>
              </div>

              <form onSubmit={handleAddProduct} className="space-y-3">
                <div>
                  <label className="block text-[11px] font-mono uppercase text-zinc-500 mb-1">Product Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Acid-Wash Drop Shoulder Hoodie"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:border-black font-medium"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] font-mono uppercase text-zinc-500 mb-1">Category</label>
                    <select
                      value={newProduct.category}
                      onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:border-black"
                    >
                      <option value="hoodies">Hoodies</option>
                      <option value="oversized-tees">Oversized Tees</option>
                      <option value="cargos-denim">Cargos & Denim</option>
                      <option value="tracksuits">Sets</option>
                      <option value="jackets">Jackets</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase text-zinc-500 mb-1">GSM Weight</label>
                    <input
                      type="text"
                      value={newProduct.gsm}
                      onChange={(e) => setNewProduct({ ...newProduct, gsm: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:border-black font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] font-mono uppercase text-zinc-500 mb-1">Price (₹)</label>
                    <input
                      type="number"
                      required
                      placeholder="2499"
                      value={newProduct.price}
                      onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:border-black font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase text-zinc-500 mb-1">Initial Stock</label>
                    <input
                      type="number"
                      value={newProduct.stockCount}
                      onChange={(e) => setNewProduct({ ...newProduct, stockCount: Number(e.target.value) })}
                      className="w-full px-3 py-2 text-xs bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:border-black font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase text-zinc-500 mb-1">Image URL</label>
                  <input
                    type="url"
                    value={newProduct.image}
                    onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:border-black font-mono text-zinc-600"
                  />
                </div>

                <Button type="submit" variant="primary" size="md" className="w-full font-bold text-xs mt-2">
                  <Plus className="w-4 h-4 mr-1.5" /> Publish Drop to Store
                </Button>
              </form>
            </div>

            {/* Existing Catalog List (7 Cols) */}
            <div className="lg:col-span-7 bg-white p-6 rounded-3xl border border-zinc-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-black text-zinc-950">Active Catalog ({productsList.length} Items)</h3>
              </div>

              <div className="space-y-3 max-h-[580px] overflow-y-auto pr-1 divide-y divide-zinc-100">
                {productsList.map((prod) => (
                  <div key={prod.id} className="pt-3 first:pt-0 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={prod.image}
                        alt={prod.name}
                        className="h-12 w-12 rounded-xl object-cover border border-zinc-200"
                      />
                      <div>
                        <Link href={`/product/${prod.id}`} className="font-bold text-xs text-zinc-950 hover:underline">
                          {prod.name}
                        </Link>
                        <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-500 mt-0.5">
                          <span className="bg-zinc-100 px-1.5 py-0.2 rounded font-bold text-black">{prod.gsm}</span>
                          <span>Stock: {prod.stockCount || 10}</span>
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-xs font-mono font-bold text-black">₹{prod.price}</span>
                      <span className="text-[10px] font-mono text-emerald-700 block font-bold">Active</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}