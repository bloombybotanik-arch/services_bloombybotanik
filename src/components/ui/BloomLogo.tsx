import React from 'react';

export interface BloomLogoProps {
  className?: string;
  size?: number;
  variant?: 'default' | 'header' | 'footer' | 'icon' | 'sidebar';
  theme?: 'light' | 'dark';
  showText?: boolean;
}

export const BloomLogo: React.FC<BloomLogoProps> = ({
  className = '',
  size = 32,
  variant = 'default',
  theme = 'light',
  showText
}) => {
  // By default, if variant is 'footer', 'header' or 'icon', or if showText is false, don't show internal text
  const shouldShowText = showText !== undefined ? showText : (variant === 'default');
  const imgSize = variant === 'footer' ? 38 : size;

  return (
    <div className={`flex items-center gap-2.5 font-serif font-bold tracking-wider shrink-0 ${className}`}>
      <img
        src="/logo.png"
        alt="Bloom by BotaniK"
        width={imgSize}
        height={imgSize}
        className="rounded-full object-contain shrink-0"
      />
      {shouldShowText && (
        <span className={`tracking-widest uppercase font-mono text-sm ${theme === 'dark' ? 'text-[#FAF8F5]' : 'text-[#1B3022]'}`}>
          Bloom
        </span>
      )}
    </div>
  );
};

export default BloomLogo;
