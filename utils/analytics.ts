// utils/analytics.ts  
// Funciones para tracking de eventos

declare global {
  interface Window {
    gtag?: (...args: any[]) => void
  }
}

export const trackEvent = (action: string, category: string, label?: string, value?: number) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    })
  }
}

export const trackPurchase = (transactionId: string, value: number, items: any[]) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'purchase', {
      transaction_id: transactionId,
      value: value,
      currency: 'COP',
      items: items
    })
  }
}

export const trackAddToCart = (itemId: string, itemName: string, price: number) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'add_to_cart', {
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