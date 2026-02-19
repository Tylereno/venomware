import { notFound } from 'next/navigation';
import { ProductCard } from '@/components/ProductCard';
import { getProductsByCategory, type ProductCategory } from '@/lib/data';

export const revalidate = 60; // ISR: revalidate every 60 seconds

interface ShopPageProps {
  params: Promise<{
    category: string;
  }>;
}

const categoryTitles: Record<ProductCategory, string> = {
  exotic: 'EXOTIC DANCEWEAR',
  rave: 'RAVE WEAR',
  accessories: 'ACCESSORIES',
};

const categoryDescriptions: Record<ProductCategory, string> = {
  exotic: 'Handcrafted bikini sets, bodysuits, and micro pieces designed to captivate',
  rave: 'Festival-ready tops and statement pieces for unforgettable nights',
  accessories: 'Perfect finishing touches to complete your look',
};

export async function generateStaticParams() {
  return [
    { category: 'exotic' },
    { category: 'rave' },
    { category: 'accessories' },
  ];
}

export async function generateMetadata({ params }: ShopPageProps) {
  const { category } = await params;
  const cat = category as ProductCategory;
  
  if (!categoryTitles[cat]) {
    return {};
  }

  return {
    title: `${categoryTitles[cat]} | VenomWare`,
    description: categoryDescriptions[cat],
  };
}

export default async function ShopPage({ params }: ShopPageProps) {
  const { category } = await params;
  const cat = category as ProductCategory;

  // Validate category
  if (!categoryTitles[cat]) {
    notFound();
  }

  const products = await getProductsByCategory(cat);

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center mb-12 space-y-4">
          <h1 className="text-5xl md:text-6xl font-montserrat font-black tracking-tight">
            {categoryTitles[cat]}
          </h1>
          <p className="text-xl text-white/60 font-inter max-w-2xl mx-auto">
            {categoryDescriptions[cat]}
          </p>
          <div className="h-1 w-24 bg-white mx-auto" />
        </div>

        {/* Products Grid */}
        {products.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-2xl text-white/60 font-inter">
              New items coming soon...
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {/* Product Count */}
        <div className="text-center mt-12">
          <p className="text-white/60 font-inter">
            Showing {products.length} {products.length === 1 ? 'item' : 'items'}
          </p>
        </div>
      </div>
    </div>
  );
}
