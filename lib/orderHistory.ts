export interface OrderHistoryItem {
  id: string;
  name: string;
  variant: string;
  price: number;
  quantity: number;
  image: string;
}

export interface OrderHistoryEntry {
  id: string;
  createdAt: string;
  total: number;
  checkoutUrl: string;
  items: OrderHistoryItem[];
}

const ORDER_HISTORY_KEY_PREFIX = 'venomwear_order_history_';

function getStorageKey(email: string) {
  return `${ORDER_HISTORY_KEY_PREFIX}${email.trim().toLowerCase()}`;
}

export function getOrderHistory(email: string): OrderHistoryEntry[] {
  if (typeof window === 'undefined' || !email) {
    return [];
  }

  const raw = localStorage.getItem(getStorageKey(email));
  if (!raw) {
    return [];
  }

  try {
    const parsed = JSON.parse(raw) as OrderHistoryEntry[];
    return parsed.sort(
      (first, second) =>
        new Date(second.createdAt).getTime() - new Date(first.createdAt).getTime()
    );
  } catch {
    return [];
  }
}

export function addOrderHistory(email: string, entry: OrderHistoryEntry) {
  if (typeof window === 'undefined' || !email) {
    return;
  }

  const current = getOrderHistory(email);
  const updated = [entry, ...current].slice(0, 50);
  localStorage.setItem(getStorageKey(email), JSON.stringify(updated));
}
