export type ShippingMethod = 'mondialrelay' | 'colissimo' | 'laposte' | 'express';

export const isSubscriptionProduct = (item: any): boolean => {
  if (!item) return false;
  const id = (item.id || '').toLowerCase();
  return id === 'bloom-complet' || id === 'premium-access' || item.isSubscription === true;
};

export const isDigitalProduct = (item: any): boolean => {
  if (!item) return false;
  // bloom-complet includes physical monthly delivery of a 100ml botanical preparation
  if (item.id === 'bloom-complet') return false;
  if (item.isDigital === true) return true;
  if (item.type === 'digital' || item.category === 'digital') return true;
  const id = (item.id || '').toLowerCase();
  const name = (item.name || '').toLowerCase();
  if (
    id.includes('digital') || 
    id.includes('abonnement') || 
    id.includes('sub') || 
    id.includes('premium') || 
    id === 'bloom-digital' || 
    id === 'essentiel'
  ) return true;
  if (
    name.includes('digital') || 
    name.includes('numérique') || 
    name.includes('e-book') || 
    name.includes('guide pdf')
  ) return true;
  return false;
};

export const requiresShipping = (cart: any[]): boolean => {
  if (!cart || cart.length === 0) return false;
  return cart.some(item => !isDigitalProduct(item));
};

export const getShippingPrice = (
  method: ShippingMethod,
  cart: any[]
): number => {
  if (!cart || cart.length === 0) return 0;

  // Si le panier ne contient QUE des produits digitaux
  const physicalItems = cart.filter(item => !isDigitalProduct(item));
  if (physicalItems.length === 0) {
    return 0;
  }

  // Bloom Complet inclut la livraison standard à domicile chaque mois
  const onlyBloomComplet = physicalItems.length === 1 && physicalItems[0].id === 'bloom-complet';
  if (onlyBloomComplet) {
    if (method === 'express') return 9.90;
    return 0; // Inclus dans l'abonnement 59€/mois
  }

  const hasBloomLab = physicalItems.some(item => item.id === 'bloomlab');
  const sachetCount = physicalItems
    .filter(item => item.id !== 'bloomlab' && item.id !== 'bloom-complet')
    .reduce((sum, item) => sum + (item.quantity || 1), 0);

  if (hasBloomLab) {
    switch (method) {
      case 'mondialrelay': return 7.90;
      case 'colissimo': return 12.90;
      case 'laposte': return 5.90;
      case 'express': return 21.90;
      default: return 7.90;
    }
  }

  // Kits/Sachets rules
  switch (method) {
    case 'mondialrelay': return sachetCount >= 3 ? 0 : 3.90;
    case 'colissimo': return sachetCount >= 3 ? 0 : 4.90;
    case 'laposte': return 5.90;
    case 'express': return 21.90;
    default: return 3.90;
  }
};
