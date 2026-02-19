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

const ORDER_HISTORY_KEY = 'venomwear_recent_checkouts';

export function getOrderHistory(): OrderHistoryEntry[] {
  if (typeof window === 'undefined') {
    return [];
  }

  const raw = localStorage.getItem(ORDER_HISTORY_KEY);
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

export function addOrderHistory(entry: OrderHistoryEntry) {
  if (typeof window === 'undefined') {
    return;
  }

  const current = getOrderHistory();
  const updated = [entry, ...current].slice(0, 50);
  localStorage.setItem(ORDER_HISTORY_KEY, JSON.stringify(updated));
}
