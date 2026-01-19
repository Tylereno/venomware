export type ProductCategory = 'exotic' | 'rave' | 'accessories';
export type ProductStatus = 'available' | 'sold_out' | 'limited';

export interface Product {
  id: string;
  name: string;
  variant: string;
  price: number;
  category: ProductCategory;
  status: ProductStatus;
  description: string;
  images: string[]; // [0] = Front View, [1] = Back View
}

export const products: Product[] = [
  // EXOTIC DANCEWEAR
  {
    id: 'e1',
    name: 'Liberty',
    variant: 'Black/Pink Sparkly',
    price: 85.00,
    category: 'exotic',
    status: 'available',
    description: 'Stunning black and pink sparkly bikini set. Handcrafted with premium materials and eye-catching sparkle detail.',
    images: ['/images/liberty-front.jpg', '/images/liberty-back.jpg']
  },
  {
    id: 'e2',
    name: 'Jasmyn',
    variant: 'Black/Red Snakeskin Velvet',
    price: 90.00,
    category: 'exotic',
    status: 'available',
    description: 'Luxurious black and red snakeskin velvet bikini set. Bold pattern with soft velvet texture.',
    images: ['/images/jasmyn-front.jpg', '/images/jasmyn-back.jpg']
  },
  {
    id: 'e3',
    name: 'Malibu',
    variant: 'Black/Rainbow Sheer',
    price: 88.00,
    category: 'exotic',
    status: 'available',
    description: 'Vibrant black and rainbow sheer bikini set. Perfect for making a statement under the lights.',
    images: ['/images/malibu-front.jpg', '/images/malibu-back.jpg']
  },
  {
    id: 'e4',
    name: 'Genesis',
    variant: 'Black Velvet Rhinestone Micro',
    price: 95.00,
    category: 'exotic',
    status: 'available',
    description: 'Premium black velvet micro bikini set adorned with rhinestones. Ultimate luxury and sparkle.',
    images: ['/images/genesis-front.jpg', '/images/genesis-back.jpg']
  },
  {
    id: 'e5',
    name: 'Jasmyn 2.0',
    variant: 'Black/Red Snakeskin w/ Beaded Trim',
    price: 98.00,
    category: 'exotic',
    status: 'available',
    description: 'Enhanced version of our popular Jasmyn set featuring intricate beaded trim detail.',
    images: ['/images/jasmyn2-front.jpg', '/images/jasmyn2-back.jpg']
  },
  {
    id: 'e6',
    name: 'Esmee',
    variant: 'Black/White',
    price: 85.00,
    category: 'exotic',
    status: 'available',
    description: 'Classic black and white bikini set. Timeless elegance with bold contrast.',
    images: ['/images/esmee-front.jpg', '/images/esmee-back.jpg']
  },
  {
    id: 'e7',
    name: 'Heaven',
    variant: 'Pink Sparkly',
    price: 88.00,
    category: 'exotic',
    status: 'available',
    description: 'All-pink sparkly bikini set. Sweet, feminine, and full of shimmer.',
    images: ['/images/heaven-front.jpg', '/images/heaven-back.jpg']
  },
  // RAVE WEAR
  {
    id: 'r1',
    name: 'Dynamite Top',
    variant: 'Black Velvet w/ Beaded Trim',
    price: 45.00,
    category: 'rave',
    status: 'available',
    description: 'Black velvet halter top with stunning beaded trim. Perfect for festivals and raves.',
    images: ['/images/dynamite-front.jpg', '/images/dynamite-back.jpg']
  },
  {
    id: 'r2',
    name: 'Love Dynamite Top',
    variant: 'Pink Fuzzy',
    price: 45.00,
    category: 'rave',
    status: 'available',
    description: 'Soft pink fuzzy halter top. Cozy, cute, and perfect for standing out in the crowd.',
    images: ['/images/love-dynamite-front.jpg', '/images/love-dynamite-back.jpg']
  },
  // ACCESSORIES
  {
    id: 'a1',
    name: 'Money Bag',
    variant: 'Pink',
    price: 25.00,
    category: 'accessories',
    status: 'available',
    description: 'Stylish pink money bag. Keep your essentials secure while you perform or party.',
    images: ['/images/moneybag-pink.jpg', '/images/moneybag-pink.jpg']
  },
  {
    id: 'a2',
    name: 'Money Bag',
    variant: 'Rainbow',
    price: 25.00,
    category: 'accessories',
    status: 'available',
    description: 'Eye-catching rainbow money bag. Vibrant colors that pop under any lighting.',
    images: ['/images/moneybag-rainbow.jpg', '/images/moneybag-rainbow.jpg']
  },
  {
    id: 'a3',
    name: 'Money Bag',
    variant: 'Red Snakeskin',
    price: 28.00,
    category: 'accessories',
    status: 'available',
    description: 'Bold red snakeskin money bag. Fierce pattern with practical functionality.',
    images: ['/images/moneybag-snake.jpg', '/images/moneybag-snake.jpg']
  },
];

// Helper function to get products by category
export const getProductsByCategory = (category: ProductCategory): Product[] => {
  return products.filter(product => product.category === category);
};

// Helper function to get product by ID
export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};
