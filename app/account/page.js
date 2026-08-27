'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { useShop } from '@/context/ShopContext';
import {
  User,
  Package,
  MapPin,
  Heart,
  LogOut,
  ChevronRight,
  Sparkles,
  CheckCircle2,
  Truck,
  ArrowRight,
} from 'lucide-react';
import styles from './AccountPage.module.css';

export default function AccountPage() {
  const { user, setUser, wishlist, showToast } = useShop();
  const [activeTab, setActiveTab] = useState('profile');

  const [profileForm, setProfileForm] = useState({
    name: user?.name || 'Aman Verma',
    email: user?.email || 'aman.verma@brandx.in',
    phone: user?.phone || '+91 98120 44550',
    address: user?.address || 'Flat 402, Block B, Samalkha Grandeur, NH-44, Samalkha, Haryana 132101',
    city: 'Samalkha',
    pincode: '132101',
  });

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setUser((prev) => ({
      ...prev,
      name: profileForm.name,
      email: profileForm.email,
      phone: profileForm.phone,
      address: profileForm.address,
    }));
    showToast('Profile information saved successfully!', 'success');
  };

  const handleLogout = () => {
    setUser(null);
    showToast('Signed out of Brand X Account', 'info');
  };

  const demoOrders = [
    {
      id: 'BX-2026-9041',
      date: 'Aug 26, 2026',
      status: 'OUT FOR DELIVERY',
      items: 'Heavyweight Loopback Hoodie (Black, L) + Tactical Cargo Pants (XL)',
      total: '₹4,998',
      image: '/images/hero/hero-black-tee.png',
      dispatchHub: 'Samalkha NH-1 Hub',
    },
    {
      id: 'BX-2026-8812',
      date: 'Aug 14, 2026',
      status: 'DELIVERED',
      items: '280 GSM Acid-Wash Oversized Tee (Cream, L)',
      total: '₹1,699',
      image: '/images/hero/hero-cream-tee.png',
      dispatchHub: 'Samalkha NH-1 Hub',
    },
  ];

  return (
    <div className={styles.pageWrapper}>
      <Navbar />

      <main className={styles.mainContent}>
        {/* 1. Editorial Account Header */}
        <section className={styles.headerSection} aria-label="Account Header">
          <div className={styles.headerShell}>
            <nav className={styles.breadcrumb} aria-label="Breadcrumb">
              <Link href="/">HOME</Link>
              <span className={styles.breadcrumbSep}>/</span>
              <span className={styles.breadcrumbCurrent}>MY ACCOUNT</span>
            </nav>

            <div className={styles.headerRow}>
              <div className={styles.headerTitleBlock}>
                <div className={styles.eyebrow}>
                  <span className={styles.eyebrowLine} aria-hidden="true" />
                  <span>SAMALKHA / MEMBER DASHBOARD</span>
                </div>
                <h1 className={styles.pageTitle}>MY ACCOUNT</h1>
              </div>

              <div className={styles.userSummaryTag}>
                <Sparkles className="w-3.5 h-3.5" />
                <span>WELCOME, {(user?.name || 'MEMBER').toUpperCase()}</span>
                <span className={styles.vipBadge}>VIP TIER 01</span>
              </div>
            </div>
          </div>

          <span className={styles.watermarkWord} aria-hidden="true">ACCOUNT</span>
        </section>

        {/* 2. Dashboard Body */}
        <section className={styles.dashboardShell}>
          {/* Mobile Tabs Switcher */}
          <div className={styles.mobileTabsBar} role="tablist">
            <button
              type="button"
              onClick={() => setActiveTab('profile')}
              className={[styles.mobileTabBtn, activeTab === 'profile' ? styles.mobileTabBtnActive : ''].join(' ')}
            >
              <User className="w-3.5 h-3.5" />
              <span>PROFILE</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('orders')}
              className={[styles.mobileTabBtn, activeTab === 'orders' ? styles.mobileTabBtnActive : ''].join(' ')}
            >
              <Package className="w-3.5 h-3.5" />
              <span>ORDERS</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('addresses')}
              className={[styles.mobileTabBtn, activeTab === 'addresses' ? styles.mobileTabBtnActive : ''].join(' ')}
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>ADDRESSES</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('wishlist')}
              className={[styles.mobileTabBtn, activeTab === 'wishlist' ? styles.mobileTabBtnActive : ''].join(' ')}
            >
              <Heart className="w-3.5 h-3.5" />
              <span>WISHLIST ({wishlist.length})</span>
            </button>
          </div>

          <div className={styles.dashboardLayout}>
            {/* Desktop Left Navigation Sidebar */}
            <aside className={styles.navSidebar} aria-label="Account Navigation">
              <div className={styles.navSidebarHeader}>
                <div className={styles.userAvatar}>
                  {(user?.name || 'X')[0]}
                </div>
                <div className={styles.userMeta}>
                  <strong>{user?.name || 'Brand X Member'}</strong>
                  <span>{user?.email || 'Samalkha VIP'}</span>
                </div>
              </div>

              <div className={styles.navBtnList}>
                <button
                  type="button"
                  onClick={() => setActiveTab('profile')}
                  className={[styles.navTabBtn, activeTab === 'profile' ? styles.navTabBtnActive : ''].join(' ')}
                >
                  <span className={styles.navTabIconGroup}>
                    <User className="w-3.5 h-3.5" />
                    <span>PROFILE</span>
                  </span>
                  <ChevronRight className="w-3.5 h-3.5 opacity-60" />
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('orders')}
                  className={[styles.navTabBtn, activeTab === 'orders' ? styles.navTabBtnActive : ''].join(' ')}
                >
                  <span className={styles.navTabIconGroup}>
                    <Package className="w-3.5 h-3.5" />
                    <span>ORDERS</span>
                  </span>
                  <ChevronRight className="w-3.5 h-3.5 opacity-60" />
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('addresses')}
                  className={[styles.navTabBtn, activeTab === 'addresses' ? styles.navTabBtnActive : ''].join(' ')}
                >
                  <span className={styles.navTabIconGroup}>
                    <MapPin className="w-3.5 h-3.5" />
                    <span>ADDRESSES</span>
                  </span>
                  <ChevronRight className="w-3.5 h-3.5 opacity-60" />
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('wishlist')}
                  className={[styles.navTabBtn, activeTab === 'wishlist' ? styles.navTabBtnActive : ''].join(' ')}
                >
                  <span className={styles.navTabIconGroup}>
                    <Heart className="w-3.5 h-3.5" />
                    <span>WISHLIST</span>
                  </span>
                  <span style={{ fontSize: '0.62rem', background: '#f2cf45', color: '#000', padding: '0.1rem 0.35rem', fontWeight: 900 }}>
                    {wishlist.length}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={handleLogout}
                  className={styles.logoutBtn}
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>LOGOUT</span>
                </button>
              </div>
            </aside>

            {/* Main Area: Render Active Tab */}
            <div className={styles.mainCard}>
              {/* TAB 1: PROFILE */}
              {activeTab === 'profile' && (
                <>
                  <div className={styles.cardHeader}>
                    <h2>PERSONAL PROFILE</h2>
                    <span>VIP ARCHIVE ID: BX-VIP-704</span>
                  </div>

                  <form onSubmit={handleSaveProfile} className="space-y-4">
                    <div className={styles.formGrid}>
                      <div className={styles.formGroup}>
                        <label className={styles.formLabel}>FULL NAME</label>
                        <input
                          type="text"
                          value={profileForm.name}
                          onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                          className={styles.formInput}
                        />
                      </div>

                      <div className={styles.formGroup}>
                        <label className={styles.formLabel}>EMAIL ADDRESS</label>
                        <input
                          type="email"
                          value={profileForm.email}
                          onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                          className={styles.formInput}
                        />
                      </div>

                      <div className={styles.formGroup}>
                        <label className={styles.formLabel}>PHONE NUMBER</label>
                        <input
                          type="tel"
                          value={profileForm.phone}
                          onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                          className={styles.formInput}
                        />
                      </div>

                      <div className={styles.formGroup}>
                        <label className={styles.formLabel}>PRIMARY CITY</label>
                        <input
                          type="text"
                          value={profileForm.city}
                          onChange={(e) => setProfileForm({ ...profileForm, city: e.target.value })}
                          className={styles.formInput}
                        />
                      </div>
                    </div>

                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>DEFAULT SHIPPING ADDRESS</label>
                      <input
                        type="text"
                        value={profileForm.address}
                        onChange={(e) => setProfileForm({ ...profileForm, address: e.target.value })}
                        className={styles.formInput}
                      />
                    </div>

                    <button type="submit" className={styles.saveProfileBtn}>
                      SAVE CHANGES
                    </button>
                  </form>
                </>
              )}

              {/* TAB 2: ORDERS */}
              {activeTab === 'orders' && (
                <>
                  <div className={styles.cardHeader}>
                    <h2>YOUR ORDERS & DISPATCHES</h2>
                    <span>SAMALKHA TRACKING ACTIVE</span>
                  </div>

                  <div className={styles.ordersList}>
                    {demoOrders.map((ord) => (
                      <div key={ord.id} className={styles.orderCard}>
                        <div className={styles.orderTopBar}>
                          <div>
                            <span className={styles.orderId}>ORDER #{ord.id}</span>
                            <span style={{ color: 'var(--acc-muted)', marginLeft: '0.65rem' }}>
                              Placed on {ord.date}
                            </span>
                          </div>

                          <span className={styles.orderStatusBadge}>
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            <span>{ord.status}</span>
                          </span>
                        </div>

                        <div className={styles.orderBody}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <img src={ord.image} alt="" className={styles.orderItemThumb} />
                            <div>
                              <strong style={{ fontSize: '0.88rem', display: 'block' }}>{ord.items}</strong>
                              <span style={{ fontSize: '0.68rem', fontFamily: 'monospace', color: 'var(--acc-muted)' }}>
                                Hub: {ord.dispatchHub} • Total: <strong>{ord.total}</strong>
                              </span>
                            </div>
                          </div>

                          <Link href={'/track-order/' + ord.id} className={styles.trackOrderLink}>
                            <Truck className="w-3.5 h-3.5" />
                            <span>TRACK ORDER</span>
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {/* TAB 3: ADDRESSES */}
              {activeTab === 'addresses' && (
                <>
                  <div className={styles.cardHeader}>
                    <h2>SAVED ADDRESSES</h2>
                    <span>2 PRE-CONFIGURED HUBS</span>
                  </div>

                  <div className={styles.addressGrid}>
                    <div className={styles.addressCard}>
                      <div className={styles.addressHeader}>
                        <span>PRIMARY RESIDENCE (DEFAULT)</span>
                        <span style={{ color: '#15803d', fontWeight: 900 }}>ACTIVE</span>
                      </div>
                      <strong style={{ fontSize: '0.88rem' }}>{user?.name || 'Aman Verma'}</strong>
                      <p style={{ fontSize: '0.78rem', color: 'var(--acc-muted)', lineHeight: 1.5, margin: 0 }}>
                        {profileForm.address}
                        <br />
                        Phone: {profileForm.phone}
                      </p>
                    </div>

                    <div className={styles.addressCard}>
                      <div className={styles.addressHeader}>
                        <span>OFFICE / SECONDARY</span>
                        <span style={{ color: 'var(--acc-muted)' }}>SAVED</span>
                      </div>
                      <strong style={{ fontSize: '0.88rem' }}>{user?.name || 'Aman Verma'}</strong>
                      <p style={{ fontSize: '0.78rem', color: 'var(--acc-muted)', lineHeight: 1.5, margin: 0 }}>
                        Cyber Hub Tower 8B, DLF Phase 2, Gurugram, Haryana 122002
                        <br />
                        Phone: {profileForm.phone}
                      </p>
                    </div>
                  </div>
                </>
              )}

              {/* TAB 4: WISHLIST */}
              {activeTab === 'wishlist' && (
                <>
                  <div className={styles.cardHeader}>
                    <h2>SAVED WISHLIST PREVIEW</h2>
                    <Link href="/wishlist" style={{ fontSize: '0.68rem', fontFamily: 'monospace', color: 'var(--acc-ink)', fontWeight: 800 }}>
                      VIEW ALL ({wishlist.length}) →
                    </Link>
                  </div>

                  {wishlist.length === 0 ? (
                    <p style={{ color: 'var(--acc-muted)', fontSize: '0.85rem' }}>
                      No items saved in wishlist.
                    </p>
                  ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(10rem, 1fr))', gap: '1rem' }}>
                      {wishlist.map((item) => (
                        <Link
                          key={item.id}
                          href={'/product/' + item.id}
                          style={{ border: '1px solid var(--acc-line)', background: '#faf9f6', padding: '0.65rem', textDecoration: 'none', color: 'inherit' }}
                        >
                          <img src={item.image} alt="" style={{ width: '100%', aspectRatio: '3/4', objectFit: 'cover' }} />
                          <strong style={{ display: 'block', fontSize: '0.78rem', marginTop: '0.4rem', lineClamp: 1 }}>{item.name}</strong>
                          <span style={{ fontFamily: 'monospace', fontSize: '0.72rem', fontWeight: 800 }}>₹{item.price}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
