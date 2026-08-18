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

export type EmailStatus = 'active' | 'unsubscribed' | 'bounced' | 'suppressed';
export type SchoolCalendarZone = 'A' | 'B' | 'C' | 'hors_france' | 'non_precise';

export interface SubscriberPreferences {
  family_rhythm: boolean;
  school_calendar_zone: SchoolCalendarZone;
  content_context: string[];
}

export interface Subscriber {
  id?: string;
  email: string;
  first_name?: string;
  locale: string;
  marketing_consent: boolean;
  consent_source?: string;
  consent_timestamp?: any;
  consent_version?: string;
  email_status: EmailStatus;
  preferences: SubscriberPreferences;
  created_at: any;
  updated_at: any;
}

export interface CustomerData {
  id?: string;
  subscriber_id: string;
  bloomlab_purchase_verified: boolean;
  bloomlab_purchase_date?: any;
  kit_purchase_verified: boolean;
  last_purchase_date?: any;
  purchase_source?: string;
  created_at: any;
  updated_at: any;
}

export type CampaignStatus = 'draft' | 'review' | 'approved' | 'scheduled' | 'sent' | 'blocked' | 'cancelled';

export interface NewsletterCampaign {
  id?: string;
  edition_date?: string;
  theme: string;
  target_segments: string[];
  subject?: string;
  preheader?: string;
  html_content?: string;
  text_content?: string;
  status: CampaignStatus;
  quality_report?: any;
  created_by: 'agent' | 'human';
  approved_by?: string;
  scheduled_at?: any;
  sent_at?: any;
  created_at: any;
  updated_at: any;
}

export interface NewsletterGenerationSession {
  id: string;
  status: 'initialized' | 'research' | 'draft' | 'review' | 'approved' | 'scheduled' | 'blocked' | 'sent';
  current_agent?: string;
  shared_memory: {
    audience_needs?: any;
    trends?: any;
    seasonal_context?: any;
    customer_voice?: any;
    selected_topic?: any;
    fact_research?: any;
    editorial_draft?: any;
    claims_review?: any;
    personalization?: any;
    html_output?: any;
    quality_report?: any;
    performance_recommendations?: any;
  };
  risk_level: 'low' | 'medium' | 'high';
  blocking_reasons: string[];
  created_at: any;
  updated_at: any;
}
