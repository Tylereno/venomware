const CHECKOUT_EMAIL_KEY = 'venomwear_checkout_email';
const NEWSLETTER_KEY = 'venomwear_newsletter_subscribers';

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

export function getSavedCheckoutEmail() {
  if (typeof window === 'undefined') {
    return '';
  }

  return localStorage.getItem(CHECKOUT_EMAIL_KEY) ?? '';
}

export function saveCheckoutEmail(email: string) {
  if (typeof window === 'undefined') {
    return;
  }

  localStorage.setItem(CHECKOUT_EMAIL_KEY, normalizeEmail(email));
}

export function getNewsletterSubscribers() {
  if (typeof window === 'undefined') {
    return [] as string[];
  }

  const raw = localStorage.getItem(NEWSLETTER_KEY);
  if (!raw) {
    return [] as string[];
  }

  try {
    const parsed = JSON.parse(raw) as string[];
    return parsed.map(normalizeEmail);
  } catch {
    return [] as string[];
  }
}

export function subscribeToNewsletter(email: string) {
  if (typeof window === 'undefined') {
    return;
  }

  const normalizedEmail = normalizeEmail(email);
  if (!normalizedEmail) {
    return;
  }

  const subscribers = getNewsletterSubscribers();
  if (subscribers.includes(normalizedEmail)) {
    return;
  }

  localStorage.setItem(NEWSLETTER_KEY, JSON.stringify([...subscribers, normalizedEmail]));
}

export function isNewsletterSubscriber(email: string) {
  const normalizedEmail = normalizeEmail(email);
  if (!normalizedEmail) {
    return false;
  }

  return getNewsletterSubscribers().includes(normalizedEmail);
}
