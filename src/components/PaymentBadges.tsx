import React from 'react';

export const PaymentBadges: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <div className={`flex flex-wrap justify-center items-center gap-2.5 sm:gap-3 py-2 ${className}`}>
      {/* Apple Pay */}
      <div 
        className="h-7 px-2.5 bg-black rounded-[5px] flex items-center justify-center shadow-xs border border-white/10"
        title="Apple Pay"
      >
        <svg className="h-4 w-auto fill-white" viewBox="0 0 170 80" aria-label="Apple Pay">
          {/* Apple logo */}
          <path d="M29.5 37.6c-.1-5.7 4.6-8.5 4.8-8.6-2.6-3.8-6.7-4.4-8.1-4.4-3.4-.4-6.8 2-8.5 2-1.8 0-4.5-2-7.4-1.9-3.8.1-7.3 2.2-9.3 5.6-4 6.9-1 17.1 2.9 22.7 1.9 2.7 4.1 5.7 7.1 5.6 2.8-.1 3.9-1.8 7.3-1.8 3.3 0 4.3 1.8 7.3 1.8 3 .1 4.9-2.7 6.8-5.5 2.2-3.2 3.1-6.3 3.1-6.5-.1-.1-5.9-2.3-6-9.5zM24.7 20.3c1.5-1.9 2.5-4.4 2.2-7-.2-.2-2.8.2-4.4 2-1.4 1.6-2.6 4.2-2.3 6.7 2.6.2 3-.1 4.5-1.7z" />
          {/* Pay text */}
          <path d="M57.6 15h11.2c8.2 0 13.9 5.6 13.9 13.7 0 8.2-5.7 13.8-14 13.8h-4.8v16.1H57.6V15zm11 21.6c4.6 0 7.8-3.1 7.8-7.8 0-4.8-3.1-7.8-7.8-7.8h-4.7v15.6h4.7zm28.7 14.9c0-4.5 3.5-7.3 9.7-7.7l7.5-.5v-2.1c0-3.3-2.2-5.2-6.1-5.2-3.7 0-6 1.6-6.6 4.1h-5.8c.6-5.3 5.4-9.6 12.6-9.6 7.4 0 11.9 3.9 11.9 10.4v19.4h-5.9v-4.5c-2.1 3.1-5.6 4.9-9.5 4.9-5.7.1-9.8-3.6-9.8-9.2zm17.2-2.4v-2.6l-6.8.5c-3.4.2-5.1 1.7-5.1 4 0 2.3 2 3.7 4.9 3.7 4.2 0 7-2.3 7-5.6zm17.6 22.6l5.7-18.7-10.4-26.6h6.7l6.8 19.3 6.7-19.3h6.6l-16.1 37.6h-6z" />
        </svg>
      </div>

      {/* Visa */}
      <div 
        className="h-7 px-3 bg-[#1A1F71] rounded-[5px] flex items-center justify-center shadow-xs"
        title="Visa"
      >
        <svg className="h-3.5 w-auto fill-white" viewBox="0 0 100 32" aria-label="Visa">
          <path d="M38.8 3.5L25.3 30.5H16.4L10 9.8c-.4-1.6-1.5-2.2-2.8-2.9C5 5.7 1.3 4.6 0 4.2l.2-.9h14.5c1.9 0 3.5 1.3 3.9 3.4l3.6 19.2 8.9-22.4h11.6zm31.7 18.2c0-7.1-9.9-7.5-9.8-10.6 0-3.2 3.6-3.3 7.3-1.8 1.9.9 2.9 2 2.9 2l2.6-6.4c-1.1-.5-3.3-1.4-6.3-1.4-6.7 0-11.4 3.6-11.5 8.6-.1 7.6 10.6 8 10.5 11.8 0 3.8-4.5 4-7.8 2.3-2.6-1.3-3.6-2.6-3.6-2.6l-2.7 6.6c1.3.6 3.7 1.6 7.1 1.6 7.6.1 11.3-4.1 11.3-10.2zm19.5 8.8h8L93 3.5H86c-1.8 0-3.1 1-3.7 2.6l-13 31.4h9l1.8-5h11l.9 5zm-9.5-8.4l4.5-12.3 2.6 12.3h-7.1zm-38.3 8.4l6.9-34h-8.8l-6.9 34h8.8z" />
        </svg>
      </div>

      {/* Mastercard */}
      <div 
        className="h-7 px-2.5 bg-[#0A0A0A] rounded-[5px] flex items-center justify-center shadow-xs border border-white/10"
        title="Mastercard"
      >
        <svg className="h-5 w-auto" viewBox="0 0 138 106" aria-label="Mastercard">
          <rect width="138" height="106" rx="10" fill="#0A0A0A" />
          <circle cx="50" cy="53" r="32" fill="#EB001B" />
          <circle cx="88" cy="53" r="32" fill="#F79E1B" />
          <path d="M69 29.8c-7 5.7-11.4 14.5-11.4 23.2s4.4 17.5 11.4 23.2c7-5.7 11.4-14.5 11.4-23.2s-4.4-17.5-11.4-23.2z" fill="#FF5F00" />
        </svg>
      </div>

      {/* PayPal */}
      <div 
        className="h-7 px-3 bg-[#003087] rounded-[5px] flex items-center justify-center shadow-xs"
        title="PayPal"
      >
        <svg className="h-3.5 w-auto fill-white" viewBox="0 0 100 32" aria-label="PayPal">
          <path d="M22.5 3.5h-10c-1 0-1.9.8-2 1.8L6.2 28.2c-.1.7.4 1.3 1.1 1.3h5.2c.9 0 1.7-.7 1.8-1.6l1.5-9.6c.1-1 .9-1.7 1.9-1.7h3.3c6.8 0 10.7-3.3 11.8-9.8.5-3-.3-5.3-2.2-6.8-2-1.5-5.2-2-8.3-2zm1.6 8.3c-.7 4.2-3.8 4.2-6.8 4.2h-2.1l1.5-9.6c.1-.4.5-.6.9-.6h1.2c2.1 0 4.1 0 5 1.1.7.9.6 2.7.3 4.9z" fill="#0079C1" />
          <path d="M34.5 3.5h-10c-1 0-1.9.8-2 1.8L18.2 28.2c-.1.7.4 1.3 1.1 1.3h5.2c.9 0 1.7-.7 1.8-1.6l1.5-9.6c.1-1 .9-1.7 1.9-1.7h3.3c6.8 0 10.7-3.3 11.8-9.8.5-3-.3-5.3-2.2-6.8-2-1.5-5.2-2-8.3-2zm1.6 8.3c-.7 4.2-3.8 4.2-6.8 4.2h-2.1l1.5-9.6c.1-.4.5-.6.9-.6h1.2c2.1 0 4.1 0 5 1.1.7.9.6 2.7.3 4.9z" fill="#00457C" />
          <text x="44" y="24" fill="#FFFFFF" fontFamily="sans-serif" fontWeight="900" fontSize="18" letterSpacing="0.5">PayPal</text>
        </svg>
      </div>

      {/* American Express */}
      <div 
        className="h-7 px-2.5 bg-[#006FCF] rounded-[5px] flex items-center justify-center shadow-xs"
        title="American Express"
      >
        <span className="text-[10px] font-black tracking-tighter text-white uppercase font-sans">
          AMEX
        </span>
      </div>

      {/* CB (Carte Bancaire) */}
      <div 
        className="h-7 px-2.5 bg-gradient-to-r from-[#00A05A] to-[#0074B7] rounded-[5px] flex items-center justify-center shadow-xs"
        title="Carte Bancaire"
      >
        <span className="text-[10px] font-black tracking-tight text-white uppercase font-sans">
          CB
        </span>
      </div>

      {/* Klarna */}
      <div 
        className="h-7 px-2.5 bg-[#FFB3C7] rounded-[5px] flex items-center justify-center shadow-xs"
        title="Klarna"
      >
        <span className="text-[10px] font-black tracking-tight text-[#0A0A0A] font-sans">
          Klarna.
        </span>
      </div>
    </div>
  );
};
