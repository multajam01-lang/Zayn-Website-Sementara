import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, User, ShieldCheck } from 'lucide-react';
import { ChatMessage } from '../types';

interface CustomerChatWidgetProps {
  messages: ChatMessage[];
  onSendMessage: (text: string, senderName: string) => void;
  isOpen?: boolean;
  onToggleOpen?: (open: boolean) => void;
}

export const CustomerChatWidget: React.FC<CustomerChatWidgetProps> = ({
  messages,
  onSendMessage,
  isOpen: propIsOpen,
  onToggleOpen,
}) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const isOpen = propIsOpen !== undefined ? propIsOpen : internalOpen;

  const setIsOpen = (val: boolean) => {
    if (onToggleOpen) onToggleOpen(val);
    setInternalOpen(val);
  };

  const [inputText, setInputText] = useState('');
  const [customerName, setCustomerName] = useState('Pelanggan');
  const [isEditingName, setIsEditingName] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to latest message when open or when message arrives
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    onSendMessage(inputText.trim(), customerName || 'Pelanggan');
    setInputText('');
  };

  const handleQuickQuestion = (q: string) => {
    onSendMessage(q, customerName || 'Pelanggan');
  };

  return (
    <div className="fixed bottom-3 right-3 sm:bottom-5 sm:right-5 z-50 flex flex-col items-end">
      
      {/* =====================================================================
          EXPANDED CHAT WINDOW (Connected to Admin Dashboard)
         ===================================================================== */}
      {isOpen && (
        <div className="mb-2 sm:mb-3 w-[calc(100vw-24px)] sm:w-[380px] h-[520px] max-h-[80vh] rounded-2xl bg-neutral-950 border border-neutral-800 shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200">
          
          {/* Header */}
          <div className="px-4 py-3 bg-neutral-900 border-b border-neutral-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <div className="w-8 h-8 rounded-full bg-amber-400 text-neutral-950 font-bold flex items-center justify-center text-xs font-mono">
                  ZN
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-neutral-900" />
              </div>
              <div>
                <div className="text-xs font-bold text-white flex items-center gap-1.5">
                  <span>Admin Dispatch ZAYN</span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-400/10 text-amber-400 border border-amber-400/20 font-mono">
                    Real-Time
                  </span>
                </div>
                <p className="text-[10px] text-neutral-400">
                  Terhubung langsung dengan Dashboard Pengelola
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="p-1.5 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-lg transition-colors cursor-pointer"
              aria-label="Tutup live chat"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Customer Name Bar */}
          <div className="px-4 py-1.5 bg-neutral-900/60 border-b border-neutral-850 flex items-center justify-between text-[11px] text-neutral-400">
            <div className="flex items-center gap-1.5 truncate">
              <User className="w-3 h-3 text-neutral-500 shrink-0" />
              <span>Nama:</span>
              {isEditingName ? (
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  onBlur={() => setIsEditingName(false)}
                  onKeyDown={(e) => e.key === 'Enter' && setIsEditingName(false)}
                  autoFocus
                  className="px-1.5 py-0.5 bg-neutral-950 border border-neutral-700 rounded text-[11px] text-white w-28 focus:outline-none focus:border-amber-400"
                />
              ) : (
                <button
                  type="button"
                  onClick={() => setIsEditingName(true)}
                  className="font-bold text-amber-400 hover:underline cursor-pointer truncate"
                  title="Klik untuk mengubah nama Anda"
                >
                  {customerName} (Ubah)
                </button>
              )}
            </div>

            <div className="flex items-center gap-1 text-[10px] text-emerald-400 font-mono shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Online 24 Jam</span>
            </div>
          </div>

          {/* Messages Stream */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 text-xs bg-neutral-950">
            
            {/* Security Notice */}
            <div className="p-2.5 rounded-xl bg-neutral-900/80 border border-neutral-850 text-[11px] text-neutral-400 text-center leading-relaxed">
              <span className="text-amber-400 font-bold">Pusat Layanan ZAYN Cibinong</span>. Pesan Anda terhubung langsung ke Dashboard Pengelola.
            </div>

            {/* Quick Starters if conversation is short */}
            {messages.length <= 2 && (
              <div className="space-y-1.5 pt-1">
                <div className="text-[10px] text-neutral-500 uppercase tracking-wider font-mono">
                  Pertanyaan Cepat:
                </div>
                <div className="flex flex-wrap gap-1.5">
                  <button
                    type="button"
                    onClick={() => handleQuickQuestion('Halo admin, apakah armada ke Bandara Soetta tersedia untuk besok?')}
                    className="text-[11px] px-2.5 py-1 rounded-lg bg-neutral-900 hover:bg-neutral-850 text-neutral-300 border border-neutral-800 transition-colors text-left cursor-pointer"
                  >
                    🚗 Tanya jadwal Bandara
                  </button>
                  <button
                    type="button"
                    onClick={() => handleQuickQuestion('Halo admin, bagaimana cara membuat transaksi Rekber Zayn?')}
                    className="text-[11px] px-2.5 py-1 rounded-lg bg-neutral-900 hover:bg-neutral-850 text-neutral-300 border border-neutral-800 transition-colors text-left cursor-pointer"
                  >
                    🛡️ Tanya cara Rekber
                  </button>
                  <button
                    type="button"
                    onClick={() => handleQuickQuestion('Bisa sewa mobil + supir 12 jam untuk keliling Bogor?')}
                    className="text-[11px] px-2.5 py-1 rounded-lg bg-neutral-900 hover:bg-neutral-850 text-neutral-300 border border-neutral-800 transition-colors text-left cursor-pointer"
                  >
                    ⏱️ Sewa 12 Jam
                  </button>
                </div>
              </div>
            )}

            {/* Message Bubbles */}
            {messages.map((msg) => {
              const isCustomer = msg.senderRole === 'customer';

              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isCustomer ? 'items-end' : 'items-start'}`}
                >
                  <div className="flex items-center gap-1.5 mb-1 text-[10px] text-neutral-500 font-mono">
                    <span className="font-semibold text-neutral-400">
                      {isCustomer ? `${msg.sender} (Anda)` : msg.sender}
                    </span>
                    <span>&middot;</span>
                    <span>{msg.time}</span>
                  </div>

                  <div
                    className={`p-3 rounded-2xl max-w-[85%] leading-relaxed text-xs shadow-sm ${
                      isCustomer
                        ? 'bg-amber-400 text-neutral-950 font-medium rounded-tr-none'
                        : 'bg-neutral-900 text-neutral-100 border border-neutral-800 rounded-tl-none'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              );
            })}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Form */}
          <form
            onSubmit={handleSend}
            className="p-3 bg-neutral-900/95 border-t border-neutral-800 flex items-center gap-2"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Tulis pesan ke admin ZAYN..."
              className="flex-1 px-3.5 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400 font-sans"
            />
            <button
              type="submit"
              disabled={!inputText.trim()}
              className="p-2.5 bg-amber-400 hover:bg-amber-300 disabled:opacity-40 disabled:hover:bg-amber-400 text-neutral-950 font-bold rounded-xl transition-all cursor-pointer shadow-sm"
              aria-label="Kirim pesan"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}

      {/* =====================================================================
          TRIGGER BUTTON: "Chat dengan kami 🟢" (Always visible at the bottom)
         ===================================================================== */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-2 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-full bg-[#f5efe6] hover:bg-white text-neutral-950 text-xs font-bold transition-all shadow-xl hover:scale-105 active:scale-95 cursor-pointer border border-neutral-300/40"
      >
        <MessageCircle className="w-4 h-4 text-neutral-900 fill-neutral-900/20" />
        <span>Chat dengan kami</span>
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
      </button>

    </div>
  );
};
