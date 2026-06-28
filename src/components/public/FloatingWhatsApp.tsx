// src/components/public/FloatingWhatsApp.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// WhatsApp Icon Component
const WhatsAppIcon = ({ size = 24, className = '' }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    stroke="none"
    className={className}
    aria-hidden="true"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
  </svg>
);

// Close Icon Component
const CloseIcon = () => (
  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

// Close Icon for Header (slightly thinner)
const HeaderCloseIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const SERVICES = [
  { id: 'curtains', name: 'Curtains', icon: '🪟', message: "I'm interested in Curtains - custom curtains, office curtains, and motorized solutions." },
  { id: 'furniture-upholstery', name: 'Furniture & Upholstery', icon: '🛋️', message: "I'm interested in Furniture & Upholstery - sofa upholstery and custom furniture." },
  { id: 'flooring', name: 'Flooring Options', icon: '🏠', message: "I'm interested in Flooring Options - SPC, laminate, and LVT flooring." },
  { id: 'wall-finishes', name: 'Wall Finishes', icon: '🎨', message: "I'm interested in Wall Finishes - wallpaper installation and wall finishing." },
  { id: 'carpets', name: 'Carpets & Rugs', icon: '🧶', message: "I'm interested in Carpets & Rugs - quality carpets and custom solutions." },
  { id: 'storage', name: 'Storage & Interior', icon: '🗄️', message: "I'm interested in Storage & Interior Solutions - custom cupboards and wardrobes." },
];

export default function FloatingWhatsApp() {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [chatState, setChatState] = useState<'welcome' | 'typing' | 'services' | 'done'>('welcome');
  const [typedMessage, setTypedMessage] = useState('');
  const [isBotTyping, setIsBotTyping] = useState(false);
  const [showServices, setShowServices] = useState(false);
  const [selectedService, setSelectedService] = useState<typeof SERVICES[0] | null>(null);
  const [customMessage, setCustomMessage] = useState('');

  // Welcome message with simulated typing effect
  useEffect(() => {
    if (isOpen && chatState === 'welcome') {
      const welcomeText = "👋 Welcome to AL MAWASIM DECOR & CURTAINS! How can we help you today? Select a service or type your question below.";
      let index = 0;
      
      const interval = setInterval(() => {
        if (index <= welcomeText.length) {
          setTypedMessage(welcomeText.substring(0, index));
          index++;
        } else {
          clearInterval(interval);
          setTimeout(() => {
            setShowServices(true);
            setChatState('services');
          }, 500);
        }
      }, 25);

      return () => clearInterval(interval);
    }
  }, [isOpen, chatState]);

  // SMART CLOSE ON SCROLL
  useEffect(() => {
    if (!isOpen) return;

    let initialScrollY = window.scrollY;
    const handleScroll = () => {
      if (Math.abs(window.scrollY - initialScrollY) > 20) {
        setIsOpen(false);
      }
    };

    const timer = setTimeout(() => {
      window.addEventListener('scroll', handleScroll, { passive: true });
    }, 100);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isOpen]);

  // Prevent background scroll on mobile when chat is open
  useEffect(() => {
    if (isOpen && window.innerWidth < 640) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const handleServiceSelect = async (service: typeof SERVICES[0]) => {
    setSelectedService(service);
    setShowServices(false);
    setIsBotTyping(true);
    setChatState('typing');

    // Simulate bot thinking
    await new Promise(resolve => setTimeout(resolve, 800));

    const response = `Excellent choice! ${service.icon} Our ${service.name} experts would be happy to assist you. We provide premium quality solutions with professional installation services across Abu Dhabi. Would you like to discuss your requirements on WhatsApp?`;
    let index = 0;
    setIsBotTyping(false);
    setTypedMessage('');

    const interval = setInterval(() => {
      if (index <= response.length) {
        setTypedMessage(response.substring(0, index));
        index++;
      } else {
        clearInterval(interval);
        setChatState('done');
      }
    }, 30);
  };

  const openWhatsApp = (message: string) => {
    const url = `https://wa.me/971566773793?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
    setIsOpen(false);
    
    // Reset state after closing
    setTimeout(() => {
      setChatState('welcome');
      setShowServices(false);
      setTypedMessage('');
      setSelectedService(null);
      setCustomMessage('');
    }, 300);
  };

  const handleCustomSubmit = () => {
    if (customMessage.trim()) {
      openWhatsApp(customMessage);
    }
  };

  const resetChat = () => {
    setChatState('welcome');
    setShowServices(false);
    setTypedMessage('');
    setSelectedService(null);
    setIsBotTyping(false);
    setCustomMessage('');
  };

  return (
    <>
      {/* Mobile Backdrop - Click to close */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[998] sm:hidden"
          />
        )}
      </AnimatePresence>

      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[999] pointer-events-none">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="pointer-events-auto absolute bottom-20 right-0 w-[calc(100vw-2rem)] sm:w-96 max-h-[75dvh] sm:max-h-[calc(100vh-140px)] flex flex-col bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden"
              style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.15)' }}
            >
              {/* Header */}
              <div className="flex-none bg-gradient-to-r from-[#25D366] to-[#128C7E] p-3 sm:p-4 text-white">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    {/* UPDATED: Replaced the emoji with the logo image */}
                    <div className="w-10 h-10 rounded-full bg-white overflow-hidden shadow-inner flex items-center justify-center border border-white/20 p-0.5">
                      <img 
                        src="/AL MAWASIM LOGO (1).png" 
                        alt="Al Mawasim Decor Logo" 
                        className="w-full h-full object-contain rounded-full"
                      />
                    </div>
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-[#128C7E] rounded-full animate-pulse"></span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-sm">AL MAWASIM DECOR</h3>
                    <p className="text-xs opacity-90 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-green-300 rounded-full inline-block animate-pulse"></span>
                      Online • Replies instantly
                    </p>
                  </div>
                  {/* Secondary Header Close Button */}
                  <button 
                    onClick={() => setIsOpen(false)}
                    aria-label="Close chat"
                    className="text-white/80 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-lg"
                  >
                    <HeaderCloseIcon />
                  </button>
                </div>
              </div>

              {/* Chat Body */}
              <div className="p-3 sm:p-4 flex-1 overflow-y-auto overscroll-none bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 scrollbar-hide">
                {/* Bot Message */}
                <div className="flex items-start gap-2 sm:gap-3 mb-4">
                  {/* UPDATED: Also added the logo here for the bot icon to make it consistent */}
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center flex-shrink-0 shadow-md border border-gray-100 dark:border-gray-700 overflow-hidden p-0.5">
                    <img 
                      src="/AL MAWASIM LOGO (1).png" 
                      alt="Al Mawasim Decor" 
                      className="w-full h-full object-contain rounded-full"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl rounded-tl-none px-4 py-3 shadow-md border border-gray-100 dark:border-gray-700">
                      <p className="text-sm text-gray-800 dark:text-gray-200 whitespace-pre-wrap leading-relaxed">
                        {typedMessage}
                        {isBotTyping && (
                          <span className="inline-flex ml-1">
                            <span className="w-1.5 h-1.5 bg-[#25D366] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                            <span className="w-1.5 h-1.5 bg-[#25D366] rounded-full animate-bounce mx-0.5" style={{ animationDelay: '150ms' }}></span>
                            <span className="w-1.5 h-1.5 bg-[#25D366] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                          </span>
                        )}
                      </p>
                    </div>
                    <span className="text-[10px] text-gray-400 mt-1 block px-1">
                      {isBotTyping ? 'Typing...' : 'Just now'}
                    </span>
                  </div>
                </div>

                {/* Services Grid */}
                {showServices && !isBotTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-2"
                  >
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-3 font-medium">
                      Select a service:
                    </p>
                    <div className="grid grid-cols-2 gap-2 sm:gap-3">
                      {SERVICES.map((service) => (
                        <motion.button
                          key={service.id}
                          whileHover={{ scale: 1.03, y: -2 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={() => handleServiceSelect(service)}
                          className="p-3 sm:p-4 min-h-[80px] bg-white dark:bg-gray-800 hover:bg-[#25D366]/5 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-[#25D366] active:border-[#25D366] transition-all text-center group flex flex-col items-center justify-center shadow-sm"
                        >
                          <div className="text-2xl mb-1 sm:mb-2">{service.icon}</div>
                          <div className="text-[11px] sm:text-xs font-semibold text-gray-700 dark:text-gray-300 group-hover:text-[#25D366] transition-colors line-clamp-2 leading-tight">
                            {service.name}
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Action Buttons - When done */}
                {chatState === 'done' && selectedService && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 space-y-3"
                  >
                    <div className="bg-[#25D366]/10 dark:bg-[#25D366]/20 rounded-xl p-3 border border-[#25D366]/20">
                      <p className="text-sm text-gray-600 dark:text-gray-300 text-center">
                        Ready to discuss <span className="font-semibold">{selectedService.name}</span>?
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => openWhatsApp(
                          `Hello! I'm interested in ${selectedService.name}. ${selectedService.message}. Can you tell me more about your services and pricing?`
                        )}
                        className="flex-1 px-4 py-3 bg-[#25D366] text-white rounded-xl text-sm font-medium hover:bg-[#20b858] active:bg-[#1da04c] transition-colors shadow-lg shadow-[#25D366]/20 flex items-center justify-center gap-2"
                      >
                        <WhatsAppIcon size={20} />
                        Chat Now
                      </button>
                      <button
                        onClick={resetChat}
                        className="px-4 py-3 bg-gray-200 dark:bg-gray-700 rounded-xl text-lg hover:bg-gray-300 dark:hover:bg-gray-600 active:bg-gray-400 transition-colors"
                        title="Start over"
                        aria-label="Restart chat"
                      >
                        🔄
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Input Area */}
              <div className="flex-none p-3 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={customMessage}
                    onChange={(e) => setCustomMessage(e.target.value)}
                    placeholder="Type your question..."
                    className="flex-1 px-4 py-2.5 bg-gray-100 dark:bg-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#25D366] transition-all"
                    disabled={isBotTyping || chatState === 'welcome' || chatState === 'typing'}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && customMessage.trim()) {
                        handleCustomSubmit();
                      }
                    }}
                  />
                  <button
                    onClick={handleCustomSubmit}
                    aria-label="Send message"
                    className="p-2.5 bg-[#25D366] text-white rounded-xl hover:bg-[#20b858] active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100"
                    disabled={!customMessage.trim() || isBotTyping || chatState === 'welcome' || chatState === 'typing'}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Button Base (The Green Circular Button) */}
        <div 
          className="relative pointer-events-auto flex justify-end"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close WhatsApp Chat" : "Open WhatsApp Chat"}
            className="relative flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-[#25D366] to-[#128C7E] text-white rounded-full shadow-lg hover:shadow-[0_0_30px_rgba(37,211,102,0.4)] transition-shadow duration-300 z-10"
          >
            {/* The Icon switches between the X and WhatsApp based on isOpen state */}
            {isOpen ? (
              <CloseIcon />
            ) : (
              <>
                <WhatsAppIcon size={28} className="drop-shadow-lg sm:w-8 sm:h-8" />
                {/* Notification badge */}
                <span className="absolute -top-1 -right-1 w-5 h-5 sm:w-6 sm:h-6 bg-red-500 rounded-full text-[10px] sm:text-xs flex items-center justify-center text-white font-bold shadow-lg animate-pulse border-2 border-white dark:border-gray-900">
                  1
                </span>
              </>
            )}
          </motion.button>

          {/* Floating Tooltip (Hidden on mobile) */}
          <div 
            className={`hidden sm:block absolute bottom-1/2 translate-y-1/2 right-[4.5rem] bg-gray-900 text-white text-xs px-4 py-2 rounded-lg transition-all duration-300 whitespace-nowrap shadow-xl ${
              isHovered && !isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2 pointer-events-none'
            }`}
          >
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
              Chat with us 💬
            </span>
            <div className="absolute top-1/2 -right-1 -translate-y-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
          </div>

          {/* Framer Motion Rings */}
          {!isOpen && (
            <div className="absolute inset-0 -z-10 flex items-center justify-center pointer-events-none">
              <motion.div
                animate={{ opacity: [0.6, 0], scale: [1, 1.8] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                className="absolute w-14 h-14 sm:w-16 sm:h-16 bg-[#25D366] rounded-full"
              />
              <motion.div
                animate={{ opacity: [0.6, 0], scale: [1, 1.8] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay: 1 }}
                className="absolute w-14 h-14 sm:w-16 sm:h-16 bg-[#25D366] rounded-full"
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}