export type UserStatus = 'gratuit' | 'freemium' | 'premium' | 'owner';

export interface BloomUser {
  uid: string;
  email: string;
  displayName?: string;
  status: UserStatus;
  isPremiumUntil?: string; // ISO string
  machineOwned: boolean;
  machineSerialNumber?: string;
  optInNewsletter: boolean;
  optInNurturing: boolean;
  createdAt: string;
  updatedAt?: string;
  lastActivityAt?: string;
}

export type ProductType = 'machine' | 'kit' | 'subscription';

export interface BloomProduct {
  id: string;
  type: ProductType;
  name: string;
  sku: string;
  priceCents: number;
  currency: string;
  description: string;
  image?: string;
}

export type OrderStatus = 'pending' | 'paid' | 'shipped' | 'canceled';

export interface BloomOrder {
  id: string;
  userId: string;
  items: {
    productId: string;
    name: string;
    priceCents: number;
    quantity: number;
    type: ProductType;
  }[];
  totalCents: number;
  status: OrderStatus;
  shippingAddress?: {
    street: string;
    city: string;
    zipCode: string;
    country: string;
  };
  stripeSessionId?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface BloomSubscription {
  id: string;
  userId: string;
  stripeSubscriptionId: string;
  planId: string;
  status: 'active' | 'past_due' | 'trialing' | 'canceled';
  currentPeriodEnd: string;
  cancelAtPeriodEnd: boolean;
}

export interface UserInteraction {
  id?: string;
  userId: string;
  type: string;
  metadata?: any;
  createdAt: string;
}
