/**
 * Shopify Storefront API client
 * Handles all communication with the Shopify GraphQL Storefront API.
 *
 * Required environment variables:
 *   SHOPIFY_STORE_DOMAIN          e.g. your-store.myshopify.com
 *   SHOPIFY_STOREFRONT_ACCESS_TOKEN  from Shopify Admin > Apps > Develop apps
 */

const SHOPIFY_API_VERSION = '2024-01';

export async function shopifyFetch<T>({
  query,
  variables,
  revalidate = 30,
  cache,
}: {
  query: string;
  variables?: Record<string, unknown>;
  revalidate?: number;
  cache?: RequestCache;
}): Promise<T> {
  const domain = process.env.SHOPIFY_STORE_DOMAIN;
  const token = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;

  if (!domain || !token) {
    throw new Error(
      'Missing SHOPIFY_STORE_DOMAIN or SHOPIFY_STOREFRONT_ACCESS_TOKEN environment variables.'
    );
  }

  const endpoint = `https://${domain}/api/${SHOPIFY_API_VERSION}/graphql.json`;

  const fetchOptions: RequestInit = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': token,
    },
    body: JSON.stringify({ query, variables }),
  };

  if (revalidate !== undefined) {
    fetchOptions.next = { revalidate };
  } else if (cache) {
    fetchOptions.cache = cache;
  } else {
    fetchOptions.next = { revalidate: 30 };
  }

  const res = await fetch(endpoint, fetchOptions);

  if (!res.ok) {
    throw new Error(`Shopify fetch failed: ${res.status} ${res.statusText}`);
  }

  const json = await res.json();

  if (json.errors?.length) {
    throw new Error(`Shopify GraphQL error: ${json.errors[0].message}`);
  }

  return json.data as T;
}

// ---------------------------------------------------------------------------
// GraphQL fragments & queries
// ---------------------------------------------------------------------------

const PRODUCT_FRAGMENT = /* GraphQL */ `
  fragment ProductFragment on Product {
    id
    handle
    createdAt
    title
    productType
    description
    tags
    images(first: 20) {
      edges {
        node {
          url
          altText
        }
      }
    }
    variants(first: 1) {
      edges {
        node {
          id
          title
          price {
            amount
            currencyCode
          }
          availableForSale
          quantityAvailable
        }
      }
    }
  }
`;

export const GET_ALL_PRODUCTS_QUERY = /* GraphQL */ `
  ${PRODUCT_FRAGMENT}
  query GetAllProducts($first: Int!, $sortKey: ProductSortKeys, $reverse: Boolean) {
    products(first: $first, sortKey: $sortKey, reverse: $reverse) {
      edges {
        node {
          ...ProductFragment
        }
      }
    }
  }
`;

export const GET_PRODUCT_BY_HANDLE_QUERY = /* GraphQL */ `
  ${PRODUCT_FRAGMENT}
  query GetProductByHandle($handle: String!) {
    product(handle: $handle) {
      ...ProductFragment
    }
  }
`;

export const GET_PRODUCTS_BY_TYPE_QUERY = /* GraphQL */ `
  ${PRODUCT_FRAGMENT}
  query GetProductsByType($queryStr: String!, $first: Int!, $sortKey: ProductSortKeys, $reverse: Boolean) {
    products(query: $queryStr, first: $first, sortKey: $sortKey, reverse: $reverse) {
      edges {
        node {
          ...ProductFragment
        }
      }
    }
  }
`;

export const GET_ALL_HANDLES_QUERY = /* GraphQL */ `
  query GetAllHandles($first: Int!, $sortKey: ProductSortKeys, $reverse: Boolean) {
    products(first: $first, sortKey: $sortKey, reverse: $reverse) {
      edges {
        node {
          handle
        }
      }
    }
  }
`;

export const CREATE_CART_MUTATION = /* GraphQL */ `
  mutation CreateCart($lines: [CartLineInput!]!) {
    cartCreate(input: { lines: $lines }) {
      cart {
        id
        checkoutUrl
      }
      userErrors {
        field
        message
      }
    }
  }
`;

// ---------------------------------------------------------------------------
// Response shape helpers
// ---------------------------------------------------------------------------

export interface ShopifyProductVariant {
  id: string;
  title: string;
  price: { amount: string; currencyCode: string };
  availableForSale: boolean;
  quantityAvailable: number | null;
}

export interface ShopifyProduct {
  id: string;
  handle: string;
  createdAt: string;
  title: string;
  productType: string;
  description: string;
  tags: string[];
  images: { edges: { node: { url: string; altText: string | null } }[] };
  variants: { edges: { node: ShopifyProductVariant }[] };
}

export interface GetAllProductsResponse {
  products: { edges: { node: ShopifyProduct }[] };
}

export interface GetProductByHandleResponse {
  product: ShopifyProduct | null;
}

export interface GetProductsByTypeResponse {
  products: { edges: { node: ShopifyProduct }[] };
}

export interface GetAllHandlesResponse {
  products: { edges: { node: { handle: string } }[] };
}

export interface CreateCartResponse {
  cartCreate: {
    cart: { id: string; checkoutUrl: string } | null;
    userErrors: { field: string; message: string }[];
  };
}
