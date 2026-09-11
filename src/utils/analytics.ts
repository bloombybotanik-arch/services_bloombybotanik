/**
 * Bloom by BotaniK - GA4 / GTM Analytics Instrumentation Utility
 * Follows Google Analytics 4 standard e-commerce & interaction specifications.
 */

export interface AnalyticsItem {
  id: string;
  name: string;
  price: number;
  quantity?: number;
  category?: string;
  variant?: string;
}

export const pushToDataLayer = (event: string, params: Record<string, any> = {}) => {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event,
    ...params,
    timestamp: new Date().toISOString(),
  });
};

/**
 * 1. view_item (Fiche produit ou aperçu matériel / kit)
 */
export const trackViewItem = (item: AnalyticsItem) => {
  pushToDataLayer('view_item', {
    ecommerce: {
      currency: 'EUR',
      value: item.price,
      items: [{
        item_id: item.id,
        item_name: item.name,
        price: item.price,
        item_category: item.category || 'botanical_extraction',
        quantity: item.quantity || 1,
      }],
    },
  });
};

/**
 * 2. add_to_cart (Ajout d'un produit au panier)
 */
export const trackAddToCart = (item: AnalyticsItem) => {
  pushToDataLayer('add_to_cart', {
    ecommerce: {
      currency: 'EUR',
      value: item.price * (item.quantity || 1),
      items: [{
        item_id: item.id,
        item_name: item.name,
        price: item.price,
        item_category: item.category || 'botanical_extraction',
        quantity: item.quantity || 1,
      }],
    },
  });
};

/**
 * 3. begin_checkout (Ouverture du panier ou transition vers le tunnel de commande)
 */
export const trackBeginCheckout = (items: AnalyticsItem[], totalValue: number) => {
  pushToDataLayer('begin_checkout', {
    ecommerce: {
      currency: 'EUR',
      value: totalValue,
      items: items.map(item => ({
        item_id: item.id,
        item_name: item.name,
        price: item.price,
        item_category: item.category || 'botanical_extraction',
        quantity: item.quantity || 1,
      })),
    },
  });
};

/**
 * 4. purchase (Achat validé ou session Stripe/PayPal confirmée)
 */
export const trackPurchase = (order: {
  transactionId: string;
  totalValue: number;
  items: AnalyticsItem[];
  shipping?: number;
  tax?: number;
}) => {
  pushToDataLayer('purchase', {
    ecommerce: {
      transaction_id: order.transactionId,
      currency: 'EUR',
      value: order.totalValue,
      shipping: order.shipping || 0,
      tax: order.tax || 0,
      items: order.items.map(item => ({
        item_id: item.id,
        item_name: item.name,
        price: item.price,
        item_category: item.category || 'botanical_extraction',
        quantity: item.quantity || 1,
      })),
    },
  });
};

/**
 * 5. lead_signup (Inscription newsletter, guide PDF ou diagnostic terrain)
 */
export const trackLeadSignup = (source: string, details?: Record<string, any>) => {
  pushToDataLayer('lead_signup', {
    lead_source: source,
    ...details,
  });
};

/**
 * 6. recipe_view (Consultation d'une fiche recette de l'Herbier ou atelier)
 */
export const trackRecipeView = (recipe: { id: string; name: string; category?: string }) => {
  pushToDataLayer('recipe_view', {
    recipe_id: recipe.id,
    recipe_name: recipe.name,
    recipe_category: recipe.category || 'botanical',
  });
};

/**
 * 7. faq_expand (Ouverture d'un accordéon de questions fréquentes)
 */
export const trackFaqExpand = (question: string) => {
  pushToDataLayer('faq_expand', {
    faq_question: question,
  });
};

/**
 * 8. page_view standard
 */
export const trackPageView = (path: string, title?: string) => {
  pushToDataLayer('page_view', {
    page_path: path,
    page_title: title || (typeof document !== 'undefined' ? document.title : ''),
  });
};
