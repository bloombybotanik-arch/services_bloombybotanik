import React from 'react';

export const BloomLogo = ({ 
  variant = 'header', 
  className = '',
  theme = 'dark'
}: { 
  variant?: 'header' | 'footer' | 'watermark' | 'sidebar'; 
  className?: string;
  theme?: 'dark' | 'light';
}) => {
  const sizes = {
    header: 'h-9 w-9 md:h-11 md:w-11',
    sidebar: 'h-10 w-10',
    footer: 'h-12 w-12 md:h-14 md:w-14',
    watermark: 'h-24 w-24 opacity-10'
  };

  return (
    <div className={`relative flex items-center justify-center shrink-0 ${sizes[variant]} ${className}`.trim()}>
      <img
        src="/logo_white.png"
        alt="Bloom by BotaniK"
        width={56}
        height={56}
        className={`w-full h-full object-contain ${theme === 'light' ? 'brightness-0 contrast-200' : ''}`}
        loading="eager"
        decoding="async"
      />
    </div>
  );
};

export default BloomLogo;
