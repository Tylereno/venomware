import {
  shopifyFetch,
  GET_ALL_PRODUCTS_QUERY,
  GET_PRODUCT_BY_HANDLE_QUERY,
  GET_PRODUCTS_BY_TYPE_QUERY,
  GET_ALL_HANDLES_QUERY,
  type ShopifyProduct,
  type GetAllProductsResponse,
  type GetProductByHandleResponse,
  type GetProductsByTypeResponse,
  type GetAllHandlesResponse,
} from './shopify';

export type ProductCategory = 'exotic' | 'rave' | 'accessories';
export type ProductStatus = 'available' | 'sold_out' | 'limited';

export interface Product {
  id: string;          // Shopify product handle (slug)
  name: string;
  variant: string;
  price: number;
  category: ProductCategory;
  status: ProductStatus;
  description: string;
  images: string[];    // [0] = Front View, [1] = Back View
  /** Shopify variant GID – required for Storefront Cart API */
  shopifyVariantId: string;
}

// ---------------------------------------------------------------------------
// Shopify → Product mapping helpers
// ---------------------------------------------------------------------------

/** Map Shopify productType strings to our internal category keys */
const PRODUCT_TYPE_MAP: Record<string, ProductCategory> = {
  'Exotic Dancewear': 'exotic',
  'Rave Wear': 'rave',
  'Accessories': 'accessories',
};

function deriveCategory(productType: string): ProductCategory {
  return PRODUCT_TYPE_MAP[productType] ?? 'exotic';
}

function deriveStatus(
  availableForSale: boolean,
  quantityAvailable: number | null
): ProductStatus {
  if (!availableForSale) return 'sold_out';
  if (quantityAvailable !== null && quantityAvailable <= 3) return 'limited';
  return 'available';
}

function mapShopifyProduct(p: ShopifyProduct): Product {
  const variant = p.variants.edges[0]?.node;
  const images = p.images.edges.map((e) => e.node.url);

  return {
    id: p.handle,
    name: p.title,
    variant: variant?.title === 'Default Title' ? p.productType : (variant?.title ?? ''),
    price: parseFloat(variant?.price.amount ?? '0'),
    category: deriveCategory(p.productType),
    status: deriveStatus(
      variant?.availableForSale ?? false,
      variant?.quantityAvailable ?? null
    ),
    description: p.description,
    images: images.length >= 2 ? images : [images[0] ?? '', images[0] ?? ''],
    shopifyVariantId: variant?.id ?? '',
  };
}

// ---------------------------------------------------------------------------
// Async data functions (Shopify Storefront API)
// ---------------------------------------------------------------------------

/** Returns true when Shopify env vars are configured */
function shopifyConfigured(): boolean {
  return !!(
    process.env.SHOPIFY_STORE_DOMAIN &&
    process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN
  );
}

/** Fetch every product from Shopify */
export async function getAllProducts(): Promise<Product[]> {
  if (!shopifyConfigured()) return staticProducts;

  const data = await shopifyFetch<GetAllProductsResponse>({
    query: GET_ALL_PRODUCTS_QUERY,
    variables: { first: 100 },
    revalidate: 60,
  });

  return data.products.edges.map((e) => mapShopifyProduct(e.node));
}

/** Fetch products filtered by category (uses Shopify product_type search) */
export async function getProductsByCategory(
  category: ProductCategory
): Promise<Product[]> {
  if (!shopifyConfigured()) {
    return staticProducts.filter((p) => p.category === category);
  }

  // Reverse-lookup the Shopify productType string for this category
  const productType =
    Object.entries(PRODUCT_TYPE_MAP).find(([, v]) => v === category)?.[0] ?? '';

  const data = await shopifyFetch<GetProductsByTypeResponse>({
    query: GET_PRODUCTS_BY_TYPE_QUERY,
    variables: { queryStr: `product_type:"${productType}"`, first: 50 },
    revalidate: 60,
  });

  return data.products.edges.map((e) => mapShopifyProduct(e.node));
}

/** Fetch a single product by its handle (slug / product id) */
export async function getProductById(
  handle: string
): Promise<Product | undefined> {
  if (!shopifyConfigured()) {
    return staticProducts.find((p) => p.id === handle);
  }

  const data = await shopifyFetch<GetProductByHandleResponse>({
    query: GET_PRODUCT_BY_HANDLE_QUERY,
    variables: { handle },
    revalidate: 60,
  });

  if (!data.product) return undefined;
  return mapShopifyProduct(data.product);
}

/** Returns all product handles for generateStaticParams */
export async function getAllProductHandles(): Promise<string[]> {
  if (!shopifyConfigured()) {
    return staticProducts.map((p) => p.id);
  }

  const data = await shopifyFetch<GetAllHandlesResponse>({
    query: GET_ALL_HANDLES_QUERY,
    variables: { first: 250 },
    cache: 'force-cache',
  });

  return data.products.edges.map((e) => e.node.handle);
}

// ---------------------------------------------------------------------------
// Static fallback data (used when Shopify env vars are not yet configured)
// ---------------------------------------------------------------------------

/** @internal used as fallback in development; not exported publicly */
export const staticProducts: Product[] = [
  // EXOTIC DANCEWEAR
  {
    id: 'liberty',
    name: 'Liberty',
    variant: 'Black/Pink Sparkly',
    price: 85.00,
    category: 'exotic',
    status: 'available',
    description: 'Stunning black and pink sparkly bikini set. Handcrafted with premium materials and eye-catching sparkle detail.',
    images: ['/images/liberty-front.jpg', '/images/liberty-back.jpg'],
    shopifyVariantId: '',
  },
  {
    id: 'jasmyn',
    name: 'Jasmyn',
    variant: 'Black/Red Snakeskin Velvet',
    price: 90.00,
    category: 'exotic',
    status: 'available',
    description: 'Luxurious black and red snakeskin velvet bikini set. Bold pattern with soft velvet texture.',
    images: ['/images/jasmyn-front.jpg', '/images/jasmyn-back.jpg'],
    shopifyVariantId: '',
  },
  {
    id: 'malibu',
    name: 'Malibu',
    variant: 'Black/Rainbow Sheer',
    price: 88.00,
    category: 'exotic',
    status: 'available',
    description: 'Vibrant black and rainbow sheer bikini set. Perfect for making a statement under the lights.',
    images: ['/images/malibu-front.jpg', '/images/malibu-back.jpg'],
    shopifyVariantId: '',
  },
  {
    id: 'genesis',
    name: 'Genesis',
    variant: 'Black Velvet Rhinestone Micro',
    price: 95.00,
    category: 'exotic',
    status: 'available',
    description: 'Premium black velvet micro bikini set adorned with rhinestones. Ultimate luxury and sparkle.',
    images: ['/images/genesis-front.jpg', '/images/genesis-back.jpg'],
    shopifyVariantId: '',
  },
  {
    id: 'jasmyn-2-0',
    name: 'Jasmyn 2.0',
    variant: 'Black/Red Snakeskin w/ Beaded Trim',
    price: 98.00,
    category: 'exotic',
    status: 'available',
    description: 'Enhanced version of our popular Jasmyn set featuring intricate beaded trim detail.',
    images: ['/images/jasmyn2-front.jpg', '/images/jasmyn2-back.jpg'],
    shopifyVariantId: '',
  },
  {
    id: 'esmee',
    name: 'Esmee',
    variant: 'Black/White',
    price: 85.00,
    category: 'exotic',
    status: 'available',
    description: 'Classic black and white bikini set. Timeless elegance with bold contrast.',
    images: ['/images/esmee-front.jpg', '/images/esmee-back.jpg'],
    shopifyVariantId: '',
  },
  {
    id: 'heaven',
    name: 'Heaven',
    variant: 'Pink Sparkly',
    price: 88.00,
    category: 'exotic',
    status: 'available',
    description: 'All-pink sparkly bikini set. Sweet, feminine, and full of shimmer.',
    images: ['/images/heaven-front.jpg', '/images/heaven-back.jpg'],
    shopifyVariantId: '',
  },
  // RAVE WEAR
  {
    id: 'dynamite-top',
    name: 'Dynamite Top',
    variant: 'Black Velvet w/ Beaded Trim',
    price: 45.00,
    category: 'rave',
    status: 'available',
    description: 'Black velvet halter top with stunning beaded trim. Perfect for festivals and raves.',
    images: ['/images/dynamite-front.jpg', '/images/dynamite-back.jpg'],
    shopifyVariantId: '',
  },
  {
    id: 'love-dynamite-top',
    name: 'Love Dynamite Top',
    variant: 'Pink Fuzzy',
    price: 45.00,
    category: 'rave',
    status: 'available',
    description: 'Soft pink fuzzy halter top. Cozy, cute, and perfect for standing out in the crowd.',
    images: ['/images/love-dynamite-front.jpg', '/images/love-dynamite-back.jpg'],
    shopifyVariantId: '',
  },
  // ACCESSORIES
  {
    id: 'money-bag-pink',
    name: 'Money Bag',
    variant: 'Pink',
    price: 25.00,
    category: 'accessories',
    status: 'available',
    description: 'Stylish pink money bag. Keep your essentials secure while you perform or party.',
    images: ['/images/moneybag-pink.jpg', '/images/moneybag-pink.jpg'],
    shopifyVariantId: '',
  },
  {
    id: 'money-bag-rainbow',
    name: 'Money Bag',
    variant: 'Rainbow',
    price: 25.00,
    category: 'accessories',
    status: 'available',
    description: 'Eye-catching rainbow money bag. Vibrant colors that pop under any lighting.',
    images: ['/images/moneybag-rainbow.jpg', '/images/moneybag-rainbow.jpg'],
    shopifyVariantId: '',
  },
  {
    id: 'money-bag-red-snakeskin',
    name: 'Money Bag',
    variant: 'Red Snakeskin',
    price: 28.00,
    category: 'accessories',
    status: 'available',
    description: 'Bold red snakeskin money bag. Fierce pattern with practical functionality.',
    images: ['/images/moneybag-snake.jpg', '/images/moneybag-snake.jpg'],
    shopifyVariantId: '',
  },
];
