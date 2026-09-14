import React from 'react';

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  width?: number | string;
  height?: number | string;
  priority?: boolean;
  className?: string;
}

/**
 * Composant OptimizedImage
 * - Implémente le lazy loading natif (sauf si priority=true)
 * - Supporte la priorité de chargement pour le LCP
 * - Évite le CLS via des dimensions explicites
 * - Sécurité via referrerPolicy
 */
export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  priority = false,
  className = '',
  onError,
  ...props
}) => {
  const [currentSrc, setCurrentSrc] = React.useState(src);

  React.useEffect(() => {
    setCurrentSrc(src);
  }, [src]);

  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.currentTarget;
    if (!target.dataset.triedFallback) {
      target.dataset.triedFallback = '1';
      if (currentSrc.includes('/img/produit/')) {
        const fallback = currentSrc.replace('/img/produit/', '/products/').replace('-1200x1200', '');
        setCurrentSrc(fallback);
      } else if (currentSrc.includes('/products/')) {
        const fallback = currentSrc.replace('/products/', '/img/produit/').replace('.jpg', '-1200x1200.jpg');
        setCurrentSrc(fallback);
      }
    }
    if (onError) onError(e);
  };

  return (
    <img
      src={currentSrc}
      alt={alt}
      width={width}
      height={height}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : 'auto'}
      decoding="async"
      className={`${className} transition-opacity duration-300`}
      referrerPolicy="no-referrer"
      onError={handleError}
      {...props}
    />
  );
};
