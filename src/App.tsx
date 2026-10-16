import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { BookingFormSection } from './components/BookingFormSection';
import { ServicesSection } from './components/ServicesSection';
import { PricingSection } from './components/PricingSection';
import { HowItWorks } from './components/HowItWorks';
import { OrderStatusChecker } from './components/OrderStatusChecker';
import { RekberCalculator } from './components/RekberCalculator';
import { ReviewsSection } from './components/ReviewsSection';
import { FAQSection } from './components/FAQSection';
import { Footer } from './components/Footer';
import { ReviewModal } from './components/ReviewModal';
import { AdminDashboardView } from './components/AdminDashboardView';
import { CustomerChatWidget } from './components/CustomerChatWidget';

import {
  INITIAL_ORDERS,
  INITIAL_REKBER_LIST,
  INITIAL_REVIEWS,
  INITIAL_CHAT_MESSAGES,
} from './data/initialData';
import {
  OrderItem,
  RekberTransaction,
  CustomerReview,
  PricingPlan,
  PricingDayType,
  ChatMessage,
} from './types';

export default function App() {
  const [orders, setOrders] = useState<OrderItem[]>(INITIAL_ORDERS);
  const [rekberList, setRekberList] = useState<RekberTransaction[]>(INITIAL_REKBER_LIST);
  const [reviews, setReviews] = useState<CustomerReview[]>(INITIAL_REVIEWS);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(INITIAL_CHAT_MESSAGES);

  // Selected preset for the on-page booking form
  const [selectedServicePreset, setSelectedServicePreset] = useState<string>('Antar Jemput');

  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Smooth scroll helper to the prominent on-page form
  const scrollToBookingForm = (servicePreset?: string) => {
    if (servicePreset) {
      setSelectedServicePreset(servicePreset);
    }
    const el = document.getElementById('pesan-layanan');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectPricingPlan = (plan: PricingPlan, dayType: PricingDayType) => {
    scrollToBookingForm(plan.id);
  };

  const handleScrollToPricing = () => {
    const el = document.getElementById('paket-harga');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleScrollToRekber = () => {
    const el = document.getElementById('rekber');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleAddOrder = (newOrder: OrderItem) => {
    setOrders((prev) => [newOrder, ...prev]);
  };

  const handleAddRekber = (newTrx: RekberTransaction) => {
    setRekberList((prev) => [newTrx, ...prev]);
    // Also create order entry so customer can track with the same ID!
    const orderFormat: OrderItem = {
      id: newTrx.id,
      customerName: newTrx.buyerName,
      phone: '0812****0000',
      serviceType: 'rekber',
      serviceName: `Zayn Rekber - ${newTrx.itemName}`,
      routeOrDetails: `Transaksi Rekber antara ${newTrx.buyerName} dan ${newTrx.sellerName}`,
      date: '16/10/2026',
      time: 'WIB',
      status: 'menunggu_konfirmasi',
      statusText: newTrx.statusText,
      notes: `Nilai: Rp ${newTrx.itemPrice.toLocaleString('id-ID')} (Fee: Rp ${newTrx.adminFee.toLocaleString('id-ID')})`,
      estimatedPrice: `Rp ${newTrx.totalPayment.toLocaleString('id-ID')}`,
      createdAt: '16/10/2026',
    };
    setOrders((prev) => [orderFormat, ...prev]);
  };

  const handleAddReview = (newReview: CustomerReview) => {
    setReviews((prev) => [newReview, ...prev]);
  };

  const handleUpdateOrderStatus = (
    orderId: string,
    status: OrderItem['status'],
    statusText: string
  ) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status, statusText } : o))
    );
  };

  const handleUpdateRekberStatus = (
    rekberId: string,
    status: RekberTransaction['status'],
    statusText: string
  ) => {
    setRekberList((prev) =>
      prev.map((r) => (r.id === rekberId ? { ...r, status, statusText } : r))
    );
  };

  // Connected Live Chat Handlers
  const handleCustomerSendMessage = (text: string, senderName: string) => {
    const timeNow = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: senderName,
      senderRole: 'customer',
      text,
      time: timeNow,
    };
    setChatMessages((prev) => [...prev, newMsg]);
  };

  const handleAdminSendMessage = (text: string) => {
    const timeNow = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'Admin ZAYN (Cibinong)',
      senderRole: 'admin',
      text,
      time: timeNow,
    };
    setChatMessages((prev) => [...prev, newMsg]);
  };

  if (isAdminOpen) {
    return (
      <AdminDashboardView
        orders={orders}
        rekberList={rekberList}
        reviews={reviews}
        chatMessages={chatMessages}
        onSendChatMessage={handleAdminSendMessage}
        onUpdateOrderStatus={handleUpdateOrderStatus}
        onUpdateRekberStatus={handleUpdateRekberStatus}
        onBackToHome={() => setIsAdminOpen(false)}
        onOpenBooking={() => {
          setIsAdminOpen(false);
          setTimeout(() => scrollToBookingForm(), 100);
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-sans selection:bg-amber-400 selection:text-neutral-950 relative">
      {/* Top Bar Contract Compliant Header */}
      <Navbar
        onOpenBooking={() => scrollToBookingForm()}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      <main className="flex-1">
        {/* Hero Section with White Veloz car and quick chat trigger */}
        <Hero
          onOpenBooking={() => scrollToBookingForm()}
          onOpenChat={() => setIsChatOpen(true)}
        />

        {/* Form: MULAI DALAM SATU MENIT - Pesan Layanan ZAYN */}
        <BookingFormSection
          onAddOrder={handleAddOrder}
          selectedServicePreset={selectedServicePreset}
        />

        {/* 01-05 Services Section */}
        <ServicesSection
          onSelectService={(key) => scrollToBookingForm(key)}
          onScrollToPricing={handleScrollToPricing}
          onScrollToRekber={handleScrollToRekber}
        />

        {/* Pricing & Packages (Weekday/Weekend switch) */}
        <PricingSection onSelectPlan={handleSelectPricingPlan} />

        {/* 3 Steps Process */}
        <HowItWorks onOpenBooking={() => scrollToBookingForm()} />

        {/* Real-time Order Tracking / Resi */}
        <OrderStatusChecker orders={orders} />

        {/* Rekber Zayn Escrow & Fee Calculator */}
        <RekberCalculator
          rekberList={rekberList}
          onAddRekber={handleAddRekber}
        />

        {/* Customer Reviews & Form */}
        <ReviewsSection
          reviews={reviews}
          onOpenReviewModal={() => setIsReviewOpen(true)}
        />

        {/* FAQ Accordion */}
        <FAQSection />
      </main>

      {/* Footer */}
      <Footer
        onOpenAdmin={() => setIsAdminOpen(true)}
        onOpenBooking={() => scrollToBookingForm()}
        pendingOrdersCount={orders.filter((o) => o.status === 'menunggu_konfirmasi').length}
      />

      {/* Review Modal */}
      <ReviewModal
        isOpen={isReviewOpen}
        onClose={() => setIsReviewOpen(false)}
        onAddReview={handleAddReview}
      />

      {/* Connected Customer Live Chat: Taruh paling bawah web & terhubung dengan Dashboard Admin */}
      <CustomerChatWidget
        messages={chatMessages}
        onSendMessage={handleCustomerSendMessage}
        isOpen={isChatOpen}
        onToggleOpen={setIsChatOpen}
      />
    </div>
  );
}
