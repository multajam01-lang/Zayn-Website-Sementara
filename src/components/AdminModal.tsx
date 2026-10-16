import React, { useState } from 'react';
import {
  X,
  Lock,
  Unlock,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Car,
  Search,
  Filter,
  Phone,
  Copy,
  Check,
  LogOut,
  AlertTriangle,
  Star,
  DollarSign,
  TrendingUp,
  Eye,
  EyeOff,
  Inbox,
  ArrowUpDown,
  User,
  MapPin,
  Calendar,
  FileText,
  BadgeCheck,
} from 'lucide-react';
import { OrderItem, RekberTransaction, CustomerReview } from '../types';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  orders: OrderItem[];
  rekberList: RekberTransaction[];
  reviews: CustomerReview[];
  onUpdateOrderStatus: (orderId: string, status: OrderItem['status'], statusText: string) => void;
  onUpdateRekberStatus: (rekberId: string, status: RekberTransaction['status'], statusText: string) => void;
}

export const AdminModal: React.FC<AdminModalProps> = ({
  isOpen,
  onClose,
  orders,
  rekberList,
  reviews,
  onUpdateOrderStatus,
  onUpdateRekberStatus,
}) => {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('zayn_admin_auth') === 'true';
  });
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Tab State: Explicitly 'Orders', 'Rekber Transactions', and 'Reviews'
  type AdminTab = 'Orders' | 'Rekber Transactions' | 'Reviews';
  const [activeTab, setActiveTab] = useState<AdminTab>('Orders');

  // Orders Tab filters & search
  const [orderSearch, setOrderSearch] = useState('');
  const [orderStatusFilter, setOrderStatusFilter] = useState<'all' | OrderItem['status']>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Driver Assignment internal state
  const [driverAssignments, setDriverAssignments] = useState<Record<string, string>>({
    'ZYN-2401': 'Pak Hendra (Avanza Hitam F 1945 CG)',
    'ZYN-AIRPORT-19': 'Pak Agus (Innova Reborn F 1102 XY)',
  });
  const [editingAssignmentId, setEditingAssignmentId] = useState<string | null>(null);
  const [assignmentInput, setAssignmentInput] = useState('');

  // Rekber Tab filters & search
  const [rekberSearch, setRekberSearch] = useState('');
  const [rekberStatusFilter, setRekberStatusFilter] = useState<'all' | RekberTransaction['status']>('all');

  // Reviews Tab filters & search
  const [reviewSearch, setReviewSearch] = useState('');
  const [reviewRatingFilter, setReviewRatingFilter] = useState<number | 'all'>('all');

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setLoginError('');

    setTimeout(() => {
      if (
        (usernameInput.trim().toLowerCase() === 'admin' || usernameInput.trim().toLowerCase() === 'zayn') &&
        passwordInput === 'zayn2026'
      ) {
        setIsAuthenticated(true);
        localStorage.setItem('zayn_admin_auth', 'true');
        setUsernameInput('');
        setPasswordInput('');
      } else {
        setLoginError('Kredensial tidak valid. Silakan periksa username & password.');
      }
      setIsLoggingIn(false);
    }, 350);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('zayn_admin_auth');
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const saveDriverAssignment = (orderId: string) => {
    if (assignmentInput.trim()) {
      setDriverAssignments((prev) => ({
        ...prev,
        [orderId]: assignmentInput.trim(),
      }));
    }
    setEditingAssignmentId(null);
    setAssignmentInput('');
  };

  // Metrics
  const pendingOrders = orders.filter((o) => o.status === 'menunggu_konfirmasi');
  const activeOrders = orders.filter((o) => o.status === 'driver_ditugaskan' || o.status === 'sedang_jalan');
  const totalRekberValue = rekberList.reduce((acc, curr) => acc + curr.itemPrice, 0);
  const avgRating = (
    reviews.reduce((acc, curr) => acc + curr.rating, 0) / (reviews.length || 1)
  ).toFixed(1);

  // Filtered Orders
  const filteredOrders = orders.filter((o) => {
    const matchesSearch =
      o.id.toLowerCase().includes(orderSearch.toLowerCase()) ||
      o.customerName.toLowerCase().includes(orderSearch.toLowerCase()) ||
      o.phone.includes(orderSearch) ||
      o.serviceName.toLowerCase().includes(orderSearch.toLowerCase()) ||
      o.routeOrDetails.toLowerCase().includes(orderSearch.toLowerCase());

    const matchesStatus = orderStatusFilter === 'all' || o.status === orderStatusFilter;
    return matchesSearch && matchesStatus;
  });

  // Filtered Rekber Transactions
  const filteredRekber = rekberList.filter((r) => {
    const matchesSearch =
      r.id.toLowerCase().includes(rekberSearch.toLowerCase()) ||
      r.buyerName.toLowerCase().includes(rekberSearch.toLowerCase()) ||
      r.sellerName.toLowerCase().includes(rekberSearch.toLowerCase()) ||
      r.itemName.toLowerCase().includes(rekberSearch.toLowerCase());

    const matchesStatus = rekberStatusFilter === 'all' || r.status === rekberStatusFilter;
    return matchesSearch && matchesStatus;
  });

  // Filtered Reviews
  const filteredReviews = reviews.filter((rev) => {
    const matchesSearch =
      rev.name.toLowerCase().includes(reviewSearch.toLowerCase()) ||
      rev.comment.toLowerCase().includes(reviewSearch.toLowerCase()) ||
      rev.serviceType.toLowerCase().includes(reviewSearch.toLowerCase());

    const matchesRating = reviewRatingFilter === 'all' || Math.floor(rev.rating) === reviewRatingFilter;
    return matchesSearch && matchesRating;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md">
      <div className="relative w-full max-w-5xl rounded-2xl bg-neutral-900 border border-neutral-800 shadow-2xl flex flex-col max-h-[92vh] overflow-hidden">
        
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800 bg-neutral-950">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-400 text-neutral-950 font-extrabold flex items-center justify-center text-xs tracking-wider font-mono">
              ZN
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm sm:text-base font-extrabold text-white tracking-tight">
                  ZAYN Operations Command
                </h3>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-amber-400/10 text-amber-300 border border-amber-400/20 uppercase">
                  Admin Hub
                </span>
              </div>
              <p className="text-[11px] text-neutral-400">
                Panel Manajemen Pesanan, Transaksi Rekber, dan Testimoni Pelanggan
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAuthenticated && (
              <button
                type="button"
                onClick={handleLogout}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-neutral-400 hover:text-white bg-neutral-850 hover:bg-neutral-800 transition-colors cursor-pointer"
                title="Keluar dari sesi admin"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Kunci Sesi</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
              aria-label="Tutup panel admin"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* =========================================================================
            SCREEN 1: RESTRICTED LOGIN GATE (Only admin can access)
           ========================================================================= */}
        {!isAuthenticated ? (
          <div className="flex-1 overflow-y-auto p-6 sm:p-12 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 rounded-2xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400 mb-6">
              <Lock className="w-8 h-8" />
            </div>

            <div className="max-w-md w-full">
              <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
                AREA TERBATAS &bull; HANYA ADMIN
              </span>
              <h2 className="text-2xl font-bold text-white mt-1 mb-2">
                Autentikasi Pengelola ZAYN
              </h2>
              <p className="text-xs text-neutral-400 mb-8 leading-relaxed">
                Hanya admin yang memiliki izin untuk membuka dan mengelola pesanan, verifikasi transaksi rekber, dan moderasi ulasan.
              </p>

              <form onSubmit={handleLogin} className="space-y-4 text-left">
                {loginError && (
                  <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 shrink-0 text-rose-400" />
                    <span>{loginError}</span>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold text-neutral-300 mb-1.5">
                    Username Admin:
                  </label>
                  <input
                    type="text"
                    required
                    value={usernameInput}
                    onChange={(e) => setUsernameInput(e.target.value)}
                    placeholder="Masukkan username (admin)"
                    className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-300 mb-1.5">
                    Kata Sandi / Kunci Akses:
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={passwordInput}
                      onChange={(e) => setPasswordInput(e.target.value)}
                      placeholder="Masukkan kata sandi pengelola"
                      className="w-full pl-3.5 pr-10 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400 font-mono"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white"
                      aria-label="Tampilkan kata sandi"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoggingIn}
                  className="w-full py-3 px-4 text-xs font-bold text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all shadow-md mt-2 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Unlock className="w-4 h-4" />
                  <span>{isLoggingIn ? 'Memverifikasi...' : 'Buka Dashboard Admin'}</span>
                </button>

                <div className="pt-4 border-t border-neutral-800/80 text-center text-[11px] text-neutral-500 font-mono">
                  <span>Kredensial Default: </span>
                  <span className="text-amber-300 font-bold">admin</span>
                  <span> / </span>
                  <span className="text-amber-300 font-bold">zayn2026</span>
                </div>
              </form>
            </div>
          </div>
        ) : (
          /* =========================================================================
             SCREEN 2: TABBED ADMIN INTERFACE ('Orders', 'Rekber Transactions', 'Reviews')
             ========================================================================= */
          <div className="flex-1 flex flex-col overflow-hidden">
            
            {/* Tabbed Navigation Bar */}
            <div className="flex items-center justify-between px-6 pt-4 pb-0 bg-neutral-950 border-b border-neutral-800">
              <div className="flex items-center gap-2">
                
                {/* TAB 1: Orders */}
                <button
                  type="button"
                  onClick={() => setActiveTab('Orders')}
                  className={`relative pb-3 px-4 text-xs font-bold transition-all flex items-center gap-2 border-b-2 ${
                    activeTab === 'Orders'
                      ? 'border-amber-400 text-amber-400'
                      : 'border-transparent text-neutral-400 hover:text-neutral-200'
                  }`}
                >
                  <Car className="w-4 h-4" />
                  <span>Orders</span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                      pendingOrders.length > 0
                        ? 'bg-amber-400 text-neutral-950'
                        : 'bg-neutral-800 text-neutral-300'
                    }`}
                  >
                    {orders.length}
                  </span>
                </button>

                {/* TAB 2: Rekber Transactions */}
                <button
                  type="button"
                  onClick={() => setActiveTab('Rekber Transactions')}
                  className={`relative pb-3 px-4 text-xs font-bold transition-all flex items-center gap-2 border-b-2 ${
                    activeTab === 'Rekber Transactions'
                      ? 'border-amber-400 text-amber-400'
                      : 'border-transparent text-neutral-400 hover:text-neutral-200'
                  }`}
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Rekber Transactions</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-neutral-800 text-neutral-300">
                    {rekberList.length}
                  </span>
                </button>

                {/* TAB 3: Reviews */}
                <button
                  type="button"
                  onClick={() => setActiveTab('Reviews')}
                  className={`relative pb-3 px-4 text-xs font-bold transition-all flex items-center gap-2 border-b-2 ${
                    activeTab === 'Reviews'
                      ? 'border-amber-400 text-amber-400'
                      : 'border-transparent text-neutral-400 hover:text-neutral-200'
                  }`}
                >
                  <Star className="w-4 h-4" />
                  <span>Reviews</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-neutral-800 text-neutral-300">
                    {reviews.length}
                  </span>
                </button>

              </div>

              {/* Status Indicator */}
              <div className="hidden sm:flex items-center gap-2 text-[11px] font-mono text-neutral-400 pb-3">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>Status: Terkoneksi 24 Jam</span>
              </div>
            </div>

            {/* Tab Body Content Area */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-neutral-900/50">
              
              {/* =====================================================================
                  TAB 1 CONTENT: ORDERS
                 ===================================================================== */}
              {activeTab === 'Orders' && (
                <div className="space-y-4">
                  
                  {/* Summary Metric Strip for Orders */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800">
                      <div className="text-[11px] text-neutral-400">Total Pesanan</div>
                      <div className="text-xl font-mono font-extrabold text-white mt-0.5">
                        {orders.length}
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-neutral-950 border border-amber-400/30">
                      <div className="text-[11px] text-amber-300 font-medium flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                        <span>Menunggu Konfirmasi</span>
                      </div>
                      <div className="text-xl font-mono font-extrabold text-amber-400 mt-0.5">
                        {pendingOrders.length}
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800">
                      <div className="text-[11px] text-neutral-400">Sedang Berjalan</div>
                      <div className="text-xl font-mono font-extrabold text-sky-400 mt-0.5">
                        {activeOrders.length}
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800">
                      <div className="text-[11px] text-neutral-400">Pesanan Selesai</div>
                      <div className="text-xl font-mono font-extrabold text-emerald-400 mt-0.5">
                        {orders.filter((o) => o.status === 'selesai').length}
                      </div>
                    </div>
                  </div>

                  {/* Orders Filter & Search Toolbar */}
                  <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between pt-1">
                    <div className="relative flex-1 max-w-md">
                      <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={orderSearch}
                        onChange={(e) => setOrderSearch(e.target.value)}
                        placeholder="Cari ID, Pelanggan, Nomor HP, atau Rute..."
                        className="w-full pl-9 pr-3 py-2 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
                      />
                    </div>

                    <div className="flex items-center gap-1.5 overflow-x-auto text-xs">
                      {[
                        { key: 'all', label: 'Semua Status' },
                        { key: 'menunggu_konfirmasi', label: 'Perlu Konfirmasi' },
                        { key: 'driver_ditugaskan', label: 'Ditugaskan' },
                        { key: 'sedang_jalan', label: 'Sedang Jalan' },
                        { key: 'selesai', label: 'Selesai' },
                      ].map((f) => (
                        <button
                          key={f.key}
                          type="button"
                          onClick={() => setOrderStatusFilter(f.key as any)}
                          className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
                            orderStatusFilter === f.key
                              ? 'bg-amber-400 text-neutral-950 font-bold'
                              : 'bg-neutral-950 text-neutral-400 hover:text-white border border-neutral-800'
                          }`}
                        >
                          {f.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Orders Feed */}
                  {filteredOrders.length === 0 ? (
                    <div className="p-12 text-center rounded-2xl bg-neutral-950 border border-neutral-800">
                      <Inbox className="w-10 h-10 text-neutral-600 mx-auto mb-3" />
                      <div className="text-white font-bold text-sm">Tidak Ada Pesanan</div>
                      <p className="text-xs text-neutral-500 mt-1">
                        Pesanan baru dari form "MULAI DALAM SATU MENIT" akan otomatis muncul di sini.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {filteredOrders.map((order) => {
                        const isPending = order.status === 'menunggu_konfirmasi';
                        const isAssigned = order.status === 'driver_ditugaskan';
                        const isOngoing = order.status === 'sedang_jalan';
                        const isDone = order.status === 'selesai';
                        const assignedDriver = driverAssignments[order.id];

                        return (
                          <div
                            key={order.id}
                            className={`p-4 sm:p-5 rounded-2xl bg-neutral-950 border transition-all ${
                              isPending
                                ? 'border-amber-400/60 shadow-lg shadow-amber-500/5 ring-1 ring-amber-400/20'
                                : 'border-neutral-800 hover:border-neutral-750'
                            }`}
                          >
                            {/* Card Top: Order ID & Timestamp */}
                            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-neutral-850">
                              <div className="flex items-center gap-2">
                                <span className="font-mono text-xs font-bold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20">
                                  {order.id}
                                </span>
                                <span className="text-xs font-bold text-white">
                                  {order.serviceName}
                                </span>
                                {isPending && (
                                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">
                                    Pesanan Baru
                                  </span>
                                )}
                              </div>

                              <div className="flex items-center gap-3">
                                <span className="text-[11px] font-mono text-neutral-400">
                                  {order.createdAt}
                                </span>
                                <span className="text-xs font-mono font-bold text-amber-300">
                                  {order.estimatedPrice || 'Tanya admin'}
                                </span>
                              </div>
                            </div>

                            {/* Card Details: Customer, Route, Driver Assignment */}
                            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 py-3 text-xs">
                              {/* Customer info */}
                              <div className="md:col-span-4 space-y-1">
                                <div className="text-neutral-400 text-[11px]">Nama Pelanggan:</div>
                                <div className="font-bold text-white text-sm">
                                  {order.customerName}
                                </div>
                                <div className="flex items-center gap-2 text-neutral-300 font-mono text-xs pt-1">
                                  <Phone className="w-3.5 h-3.5 text-neutral-500" />
                                  <span>{order.phone}</span>
                                  <button
                                    type="button"
                                    onClick={() => handleCopy(order.phone, order.id)}
                                    className="p-1 text-neutral-400 hover:text-amber-400 rounded cursor-pointer"
                                    title="Salin Nomor HP"
                                  >
                                    {copiedId === order.id ? (
                                      <Check className="w-3 h-3 text-emerald-400" />
                                    ) : (
                                      <Copy className="w-3 h-3" />
                                    )}
                                  </button>
                                </div>
                              </div>

                              {/* Route info */}
                              <div className="md:col-span-4 space-y-1">
                                <div className="text-neutral-400 text-[11px]">Rute / Lokasi Tugas:</div>
                                <div className="font-medium text-neutral-200 leading-snug">
                                  {order.routeOrDetails}
                                </div>
                                {order.notes && (
                                  <div className="text-[11px] text-amber-300/90 italic pt-1">
                                    Catatan: &ldquo;{order.notes}&rdquo;
                                  </div>
                                )}
                                <div className="text-[11px] text-neutral-400 pt-0.5">
                                  Jadwal: <strong className="text-white font-mono">{order.date} ({order.time})</strong>
                                </div>
                              </div>

                              {/* Driver Disposisi */}
                              <div className="md:col-span-4 space-y-1">
                                <div className="text-neutral-400 text-[11px]">Disposisi Supir / Petugas:</div>
                                {editingAssignmentId === order.id ? (
                                  <div className="flex items-center gap-1.5 pt-1">
                                    <input
                                      type="text"
                                      value={assignmentInput}
                                      onChange={(e) => setAssignmentInput(e.target.value)}
                                      placeholder="Nama supir & nomor plat..."
                                      className="px-2 py-1 bg-neutral-900 border border-neutral-700 rounded text-xs text-white flex-1"
                                    />
                                    <button
                                      type="button"
                                      onClick={() => saveDriverAssignment(order.id)}
                                      className="px-2.5 py-1 bg-amber-400 text-neutral-950 font-bold rounded text-xs cursor-pointer"
                                    >
                                      Simpan
                                    </button>
                                  </div>
                                ) : (
                                  <div className="flex items-center justify-between text-neutral-300 bg-neutral-900 px-2.5 py-1.5 rounded-lg border border-neutral-800">
                                    <span className="text-[11px] truncate">
                                      {assignedDriver || 'Belum ditugaskan'}
                                    </span>
                                    <button
                                      type="button"
                                      onClick={() => {
                                        setEditingAssignmentId(order.id);
                                        setAssignmentInput(assignedDriver || '');
                                      }}
                                      className="text-[10px] text-amber-400 hover:underline shrink-0 ml-2 cursor-pointer"
                                    >
                                      {assignedDriver ? 'Ubah' : '+ Tugaskan'}
                                    </button>
                                  </div>
                                )}
                              </div>
                            </div>

                            {/* Status Control Actions */}
                            <div className="pt-3 border-t border-neutral-850 flex flex-wrap items-center justify-between gap-3">
                              <div className="flex items-center gap-2">
                                <span className="text-[11px] text-neutral-400">Status:</span>
                                <span
                                  className={`px-2.5 py-1 rounded-md text-xs font-semibold ${
                                    isPending
                                      ? 'bg-amber-400/10 text-amber-300 border border-amber-400/30'
                                      : isAssigned
                                      ? 'bg-sky-400/10 text-sky-300 border border-sky-400/30'
                                      : isOngoing
                                      ? 'bg-emerald-400/10 text-emerald-300 border border-emerald-400/30'
                                      : 'bg-neutral-800 text-neutral-300'
                                  }`}
                                >
                                  {order.statusText}
                                </span>
                              </div>

                              <div className="flex items-center gap-1.5">
                                {isPending && (
                                  <button
                                    type="button"
                                    onClick={() =>
                                      onUpdateOrderStatus(
                                        order.id,
                                        'driver_ditugaskan',
                                        'Driver Ditugaskan & Siap Jemput'
                                      )
                                    }
                                    className="px-3 py-1.5 rounded-lg text-xs font-bold bg-amber-400 hover:bg-amber-300 text-neutral-950 transition-colors cursor-pointer"
                                  >
                                    Konfirmasi &amp; Tugaskan
                                  </button>
                                )}

                                {isAssigned && (
                                  <button
                                    type="button"
                                    onClick={() =>
                                      onUpdateOrderStatus(
                                        order.id,
                                        'sedang_jalan',
                                        'Sedang Dalam Perjalanan / Bertugas'
                                      )
                                    }
                                    className="px-3 py-1.5 rounded-lg text-xs font-bold bg-sky-400 hover:bg-sky-300 text-neutral-950 transition-colors cursor-pointer"
                                  >
                                    Mulai Perjalanan
                                  </button>
                                )}

                                {isOngoing && (
                                  <button
                                    type="button"
                                    onClick={() =>
                                      onUpdateOrderStatus(
                                        order.id,
                                        'selesai',
                                        'Selesai & Tervalidasi'
                                      )
                                    }
                                    className="px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-neutral-950 transition-colors cursor-pointer"
                                  >
                                    Tandai Selesai
                                  </button>
                                )}

                                <select
                                  value={order.status}
                                  onChange={(e) => {
                                    const val = e.target.value as OrderItem['status'];
                                    let txt = 'Menunggu Konfirmasi';
                                    if (val === 'driver_ditugaskan') txt = 'Driver Ditugaskan';
                                    if (val === 'sedang_jalan') txt = 'Sedang Dalam Perjalanan';
                                    if (val === 'selesai') txt = 'Selesai & Tervalidasi';
                                    onUpdateOrderStatus(order.id, val, txt);
                                  }}
                                  className="px-2.5 py-1.5 bg-neutral-900 border border-neutral-700 rounded-lg text-xs text-neutral-300 focus:outline-none"
                                >
                                  <option value="menunggu_konfirmasi">Menunggu Konfirmasi</option>
                                  <option value="driver_ditugaskan">Driver Ditugaskan</option>
                                  <option value="sedang_jalan">Sedang Jalan</option>
                                  <option value="selesai">Selesai</option>
                                </select>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}

              {/* =====================================================================
                  TAB 2 CONTENT: REKBER TRANSACTIONS
                 ===================================================================== */}
              {activeTab === 'Rekber Transactions' && (
                <div className="space-y-4">
                  
                  {/* Summary Metric Strip for Rekber */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800">
                      <div className="text-[11px] text-neutral-400">Total Transaksi Rekber</div>
                      <div className="text-xl font-mono font-extrabold text-white mt-0.5">
                        {rekberList.length}
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800">
                      <div className="text-[11px] text-neutral-400">Total Nilai Escrow Terlindungi</div>
                      <div className="text-xl font-mono font-extrabold text-emerald-400 mt-0.5">
                        Rp {totalRekberValue.toLocaleString('id-ID')}
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800">
                      <div className="text-[11px] text-neutral-400">Total Fee Admin Masuk</div>
                      <div className="text-xl font-mono font-extrabold text-amber-400 mt-0.5">
                        Rp {rekberList.reduce((acc, curr) => acc + curr.adminFee, 0).toLocaleString('id-ID')}
                      </div>
                    </div>
                  </div>

                  {/* Rekber Toolbar */}
                  <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between pt-1">
                    <div className="relative flex-1 max-w-md">
                      <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={rekberSearch}
                        onChange={(e) => setRekberSearch(e.target.value)}
                        placeholder="Cari ID Rekber, Pembeli, Penjual, atau Barang..."
                        className="w-full pl-9 pr-3 py-2 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
                      />
                    </div>

                    <div className="flex items-center gap-1.5 overflow-x-auto text-xs">
                      {[
                        { key: 'all', label: 'Semua Status' },
                        { key: 'menunggu_dana', label: 'Menunggu Dana' },
                        { key: 'dana_diamankan', label: 'Dana Diamankan' },
                        { key: 'barang_dikirim', label: 'Barang Dikirim' },
                        { key: 'dana_dicairkan', label: 'Dicairkan' },
                      ].map((f) => (
                        <button
                          key={f.key}
                          type="button"
                          onClick={() => setRekberStatusFilter(f.key as any)}
                          className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
                            rekberStatusFilter === f.key
                              ? 'bg-amber-400 text-neutral-950 font-bold'
                              : 'bg-neutral-950 text-neutral-400 hover:text-white border border-neutral-800'
                          }`}
                        >
                          {f.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Rekber Table */}
                  <div className="overflow-x-auto rounded-xl border border-neutral-800 bg-neutral-950">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-neutral-800 text-neutral-400 font-mono">
                          <th className="py-3 px-4">KODE REKBER</th>
                          <th className="py-3 px-4">BARANG TRANSAKSI</th>
                          <th className="py-3 px-4">PEMBELI &rarr; PENJUAL</th>
                          <th className="py-3 px-4 text-right">NILAI BARANG</th>
                          <th className="py-3 px-4 text-right">FEE ADMIN</th>
                          <th className="py-3 px-4 text-right">STATUS &amp; AKSI</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-neutral-850">
                        {filteredRekber.map((r) => (
                          <tr key={r.id} className="hover:bg-neutral-900/50 transition-colors">
                            <td className="py-4 px-4 font-mono font-bold text-amber-400">{r.id}</td>
                            <td className="py-4 px-4 text-white font-medium">{r.itemName}</td>
                            <td className="py-4 px-4 text-neutral-300">
                              <span className="font-semibold text-white">{r.buyerName}</span>
                              <span className="text-neutral-500 mx-1.5">&rarr;</span>
                              <span className="text-neutral-400">{r.sellerName}</span>
                            </td>
                            <td className="py-4 px-4 text-right font-mono font-bold text-white">
                              Rp {r.itemPrice.toLocaleString('id-ID')}
                            </td>
                            <td className="py-4 px-4 text-right font-mono text-amber-400">
                              Rp {r.adminFee.toLocaleString('id-ID')}
                            </td>
                            <td className="py-4 px-4 text-right">
                              <select
                                value={r.status}
                                onChange={(e) => {
                                  const val = e.target.value as RekberTransaction['status'];
                                  let txt = 'Menunggu Transfer Dana';
                                  if (val === 'dana_diamankan') txt = 'Dana Diamankan di Zayn';
                                  if (val === 'barang_dikirim') txt = 'Barang Sedang Dikirim';
                                  if (val === 'dana_dicairkan') txt = 'Dana Dicairkan ke Penjual';
                                  onUpdateRekberStatus(r.id, val, txt);
                                }}
                                className="px-2.5 py-1.5 bg-neutral-900 border border-neutral-700 rounded-lg text-xs text-amber-400 font-medium focus:outline-none"
                              >
                                <option value="menunggu_dana">Menunggu Transfer</option>
                                <option value="dana_diamankan">Dana Diamankan (Hold)</option>
                                <option value="barang_dikirim">Barang Dikirim</option>
                                <option value="dana_dicairkan">Cairkan ke Penjual</option>
                              </select>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* =====================================================================
                  TAB 3 CONTENT: REVIEWS
                 ===================================================================== */}
              {activeTab === 'Reviews' && (
                <div className="space-y-4">
                  
                  {/* Reviews Summary Stats */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800 flex items-center justify-between">
                      <div>
                        <div className="text-[11px] text-neutral-400">Rata-Rata Kepuasan</div>
                        <div className="text-xl font-mono font-extrabold text-amber-400 mt-0.5">
                          {avgRating} / 5.0
                        </div>
                      </div>
                      <div className="flex text-amber-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800">
                      <div className="text-[11px] text-neutral-400">Total Ulasan Masuk</div>
                      <div className="text-xl font-mono font-extrabold text-white mt-0.5">
                        {reviews.length} Ulasan
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800">
                      <div className="text-[11px] text-neutral-400">Status Verifikasi</div>
                      <div className="text-sm font-bold text-emerald-400 mt-1 flex items-center gap-1.5">
                        <BadgeCheck className="w-4 h-4" />
                        <span>100% Pelanggan Riil</span>
                      </div>
                    </div>
                  </div>

                  {/* Reviews Toolbar */}
                  <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between pt-1">
                    <div className="relative flex-1 max-w-md">
                      <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={reviewSearch}
                        onChange={(e) => setReviewSearch(e.target.value)}
                        placeholder="Cari ulasan berdasarkan nama atau komentar..."
                        className="w-full pl-9 pr-3 py-2 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
                      />
                    </div>

                    <div className="flex items-center gap-1.5 overflow-x-auto text-xs">
                      {[
                        { key: 'all', label: 'Semua Bintang' },
                        { key: 5, label: '5 Bintang' },
                        { key: 4, label: '4 Bintang' },
                      ].map((r) => (
                        <button
                          key={r.key}
                          type="button"
                          onClick={() => setReviewRatingFilter(r.key as any)}
                          className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
                            reviewRatingFilter === r.key
                              ? 'bg-amber-400 text-neutral-950 font-bold'
                              : 'bg-neutral-950 text-neutral-400 hover:text-white border border-neutral-800'
                          }`}
                        >
                          {r.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Reviews Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filteredReviews.map((rev) => (
                      <div
                        key={rev.id}
                        className="p-4 sm:p-5 rounded-2xl bg-neutral-950 border border-neutral-800 flex flex-col justify-between space-y-3"
                      >
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-white text-xs">{rev.name}</span>
                              {rev.verified && (
                                <BadgeCheck className="w-3.5 h-3.5 text-amber-400" />
                              )}
                            </div>
                            <span className="text-[11px] font-mono text-neutral-400">
                              {rev.date}
                            </span>
                          </div>

                          <div className="flex items-center gap-1 text-amber-400 mb-2">
                            {[...Array(Math.floor(rev.rating))].map((_, i) => (
                              <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                            ))}
                            <span className="text-[11px] font-mono ml-1 font-bold">
                              {rev.rating}.0
                            </span>
                          </div>

                          <p className="text-xs text-neutral-200 leading-relaxed italic">
                            &ldquo;{rev.comment}&rdquo;
                          </p>
                        </div>

                        <div className="pt-3 border-t border-neutral-850 flex items-center justify-between text-[11px]">
                          <span className="text-amber-300/80 font-medium">{rev.serviceType}</span>
                          <span className="text-neutral-500 font-mono">Status: Dipublikasikan</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>

            {/* Dashboard Footer Action Bar */}
            <div className="px-6 py-3 border-t border-neutral-800 bg-neutral-950 flex flex-wrap items-center justify-between gap-3 text-xs text-neutral-400">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Terautentikasi sebagai Administrator ZAYN Cibinong</span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleLogout}
                  className="text-neutral-400 hover:text-white transition-colors cursor-pointer"
                >
                  Kunci Sesi / Logout
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-white font-bold rounded-lg transition-colors cursor-pointer"
                >
                  Tutup
                </button>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
