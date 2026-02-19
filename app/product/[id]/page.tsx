import { notFound } from 'next/navigation';
import Image from 'next/image';
import { getProductById, getAllProductHandles } from '@/lib/data';
import { formatPrice } from '@/lib/utils';
import { AddToCartButton } from '@/components/AddToCartButton';

export const revalidate = 60; // ISR: revalidate every 60 seconds

export async function generateStaticParams() {
  const handles = await getAllProductHandles();
  return handles.map((id) => ({ id }));
}

interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({ params }: ProductPageProps) {
  const { id } = await params;
  const product = await getProductById(id);
  
  if (!product) {
    return {};
  }

  return {
    title: `${product.name} - ${product.variant} | VenomWare`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    notFound();
  }

  const isSoldOut = product.status === 'sold_out';

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Images */}
          <div className="space-y-6">
            {product.images.map((image, index) => (
              <div
                key={index}
                className="relative aspect-[3/4] border border-white/20 overflow-hidden"
              >
                <Image
                  src={image}
                  alt={`${product.name} - View ${index + 1}`}
                  fill
                  className="object-cover"
                  priority={index === 0}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            ))}
          </div>

          {/* Product Info */}
          <div className="space-y-8">
            <div>
              <h1 className="text-5xl font-montserrat font-black tracking-tight mb-2">
                {product.name}
              </h1>
              <p className="text-2xl text-white/60 font-inter mb-4">
                {product.variant}
              </p>
              <p className="text-4xl font-inter font-bold">
                {formatPrice(product.price)}
              </p>
            </div>

            {product.status === 'limited' && (
              <div className="border border-white/40 px-4 py-3">
                <p className="text-sm uppercase tracking-wider text-white/80">
                  ⚡ Limited Stock Available
                </p>
              </div>
            )}

            <div className="prose prose-invert max-w-none">
              <p className="text-lg font-inter leading-relaxed">
                {product.description}
              </p>
            </div>

            <div className="border-t border-white/20 pt-8">
              <AddToCartButton product={product} disabled={isSoldOut} />
              
              {isSoldOut && (
                <p className="text-center text-white/60 mt-4 font-inter">
                  This item is currently sold out
                </p>
              )}
            </div>

            <div className="border border-white/20 p-6 space-y-3 text-sm font-inter">
              <h3 className="font-montserrat font-bold text-lg">PRODUCT DETAILS</h3>
              <ul className="space-y-2 text-white/80">
                <li>• Handcrafted with premium materials</li>
                <li>• Made to order - allow 1-2 weeks for production</li>
                <li>• Each piece is unique and may vary slightly</li>
                <li>• Hand wash only, lay flat to dry</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
