import React, { useState, useEffect } from 'react';
import { ShoppingBag, ArrowRight, Zap, Sparkles } from 'lucide-react';
import styles from './StickyCTA.module.css';

interface StickyCTAProps {
  targetSectionId?: string;
  onAction?: () => void;
  lang?: string;
}

export const StickyCTA: React.FC<StickyCTAProps> = ({
  targetSectionId = 'offres',
  onAction,
  lang = 'fr',
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isInsideOffers, setIsInsideOffers] = useState(false);

  const isDE = lang === 'de';
  const isFR = lang === 'fr';

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsVisible(scrollY > 380);

      // Check if user is already inside the offers section
      const offersEl = document.getElementById(targetSectionId);
      if (offersEl) {
        const rect = offersEl.getBoundingClientRect();
        const isInView = rect.top <= window.innerHeight * 0.4 && rect.bottom >= window.innerHeight * 0.2;
        setIsInsideOffers(isInView);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [targetSectionId]);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onAction) {
      onAction();
      return;
    }
    const el = document.getElementById(targetSectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (!isVisible || isInsideOffers) {
    return null;
  }

  const text = {
    desktopTitle: "BloomLab® v2",
    desktopPrice: isFR ? "Dès 239€ • En stock 24/48h" : isDE ? "Ab 239€ • Auf Lager 24/48h" : "From 239€ • In Stock 24/48h",
    cta: isFR ? "Acheter" : isDE ? "Kaufen" : "Order Now",
    mobileTitle: "BloomLab®",
    mobileStarting: isFR ? "Dès 239€" : "From 239€",
    stock: isFR ? "• Expédition 24/48h" : "• 24/48h Shipping"
  };

  return (
    <>
      {/* Desktop Floating Pill */}
      <div className={styles.desktopFloating}>
        <button
          type="button"
          onClick={handleClick}
          className={styles.desktopPill}
          aria-label="Accéder aux offres BloomLab"
        >
          <div className={styles.pillIconWrapper}>
            <ShoppingBag className="w-4 h-4" />
          </div>
          <div className={styles.pillTextGroup}>
            <span className={styles.pillTitle}>{text.desktopTitle}</span>
            <span className={styles.pillMeta}>{text.desktopPrice}</span>
          </div>
          <span className={styles.pillActionBtn}>
            {text.cta}
          </span>
        </button>
      </div>

      {/* Mobile Fixed Bottom Bar */}
      <div className={styles.mobileStickyBar}>
        <div className={styles.mobileInfo}>
          <span className={styles.mobileTitle}>{text.mobileTitle}</span>
          <div className={styles.mobilePricing}>
            <span className={styles.mobilePrice}>{text.mobileStarting}</span>
            <span className={styles.mobileStock}>{text.stock}</span>
          </div>
        </div>
        <button
          type="button"
          onClick={handleClick}
          className={styles.mobileButton}
          aria-label="Commander BloomLab"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>{isFR ? "Je commande" : text.cta}</span>
        </button>
      </div>
    </>
  );
};

export default StickyCTA;
