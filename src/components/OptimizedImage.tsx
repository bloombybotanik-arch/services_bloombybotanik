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
  ...props
}) => {
  // Détection automatique du format WebP si l'extension est gérée par le CDN/Backend
  // Note : Dans un environnement réel, on utiliserait <picture> avec plusieurs <source>
  
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : 'auto'}
      decoding="async"
      className={`${className} transition-opacity duration-300`}
      referrerPolicy="no-referrer"
      {...props}
    />
  );
};
