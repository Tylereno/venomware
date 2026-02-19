'use server';

import {
  shopifyFetch,
  CREATE_CART_MUTATION,
  type CreateCartResponse,
} from './shopify';

export interface CheckoutLineItem {
  merchandiseId: string; // Shopify variant GID
  quantity: number;
}

/**
 * Creates a Shopify Cart and returns the hosted checkout URL.
 * Call this from client components when the user clicks "Checkout".
 */
export async function createCheckout(
  lineItems: CheckoutLineItem[]
): Promise<string> {
  const lines = lineItems.map(({ merchandiseId, quantity }) => ({
    merchandiseId,
    quantity,
  }));

  const data = await shopifyFetch<CreateCartResponse>({
    query: CREATE_CART_MUTATION,
    variables: { lines },
    cache: 'no-store',
  });

  const { cart, userErrors } = data.cartCreate;

  if (userErrors.length > 0) {
    throw new Error(`Shopify cart error: ${userErrors[0].message}`);
  }

  if (!cart?.checkoutUrl) {
    throw new Error('Shopify did not return a checkout URL.');
  }

  return cart.checkoutUrl;
}
