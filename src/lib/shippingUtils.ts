export type ShippingMethod = 'mondialrelay' | 'colissimo' | 'laposte' | 'express';

export const getShippingPrice = (
  method: ShippingMethod,
  cart: any[]
): number => {
  const hasBloomLab = cart.some(item => item.id === 'bloomlab');
  const sachetCount = cart
    .filter(item => !item.isDigital && item.id !== 'bloomlab')
    .reduce((sum, item) => sum + item.quantity, 0);

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
