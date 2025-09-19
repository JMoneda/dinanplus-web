// utils/analytics.ts  
// Funciones para tracking de eventos SEO
export const trackEvent = (action: string, category: string, label?: string, value?: number) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    })
  }
}

export const trackPurchase = (transactionId: string, value: number, items: any[]) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'purchase', {
      transaction_id: transactionId,
      value: value,
      currency: 'COP',
      items: items
    })
  }
}

export const trackAddToCart = (itemId: string, itemName: string, price: number) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'add_to_cart', {
      currency: 'COP',
      value: price,
      items: [{
        item_id: itemId,
        item_name: itemName,
        price: price,
        quantity: 1
      }]
    })
  }
}

// Tracking específico para SEO
export const trackSEOEvent = (eventName: string, data?: any) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', eventName, {
      custom_parameter_1: data?.source || 'unknown',
      custom_parameter_2: data?.page || window.location.pathname,
      ...data
    })
  }
}