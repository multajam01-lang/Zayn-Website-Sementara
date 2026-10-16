export type ServiceCategory = 'perjalanan' | 'harian' | 'aktivitas' | 'rental' | 'rekber';

export interface ServiceItem {
  id: string;
  number: string;
  category: string;
  title: string;
  description: string;
  actionText: string;
  categoryKey: ServiceCategory;
  image?: string;
  highlights: string[];
}

export type PricingDayType = 'weekday' | 'weekend';

export interface PricingPlan {
  id: string;
  code: string;
  category: string;
  badge?: string;
  title: string;
  subtitle: string;
  priceWeekday: number;
  priceWeekend: number;
  unit: string;
  features: string[];
  note: string;
  popular?: boolean;
}

export interface CustomerReview {
  id: string;
  name: string;
  rating: number;
  date: string;
  comment: string;
  serviceType: string;
  verified?: boolean;
}

export interface OrderItem {
  id: string;
  customerName: string;
  phone: string;
  serviceType: string;
  serviceName: string;
  routeOrDetails: string;
  date: string;
  time: string;
  status: 'menunggu_konfirmasi' | 'driver_ditugaskan' | 'sedang_jalan' | 'selesai';
  statusText: string;
  notes?: string;
  estimatedPrice?: string;
  createdAt: string;
}

export interface RekberTransaction {
  id: string;
  buyerName: string;
  sellerName: string;
  itemName: string;
  itemPrice: number;
  adminFee: number;
  totalPayment: number;
  status: 'menunggu_dana' | 'dana_diamankan' | 'barang_dikirim' | 'dana_dicairkan';
  statusText: string;
  createdAt: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface ChatMessage {
  id: string;
  sender: string;
  senderRole: 'customer' | 'admin';
  text: string;
  time: string;
}

