const CHECKOUT_EMAIL_KEY = 'venomwear_checkout_email';

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
