import type { JSX } from 'react';
import { Suspense } from 'react';

import { notFound } from 'next/navigation';

import { Star, Heart, ShoppingBag } from 'lucide-react';

import ProductImage from '@/components/product-image';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ProductRecommendations, RecommendationsSkeleton } from '@/components/product-recommendations';
import { ReviewList } from '@/components/review-list';
import { ReviewForm } from '@/components/review-form.';
import { getProductBySlug } from '@/helpers/getProductBySlug';
import { resolveOpenGraphImage } from '@/lib/utils';

import type { Metadata, ResolvingMetadata } from 'next';

export interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata(
  { params }: PageProps,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const { slug } = await params;

  const product = await getProductBySlug(slug);
  const src = product?.images;
  const images = await resolveOpenGraphImage(src);

  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'),
    title: product?.title,
    description: product?.description,
    openGraph: {
      title: product?.title,
      description: product?.description,
      images,
    },
  };
}

export default async function ProductPage({
  params,
}: PageProps): Promise<JSX.Element> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <main className='flex-1'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8 py-12'>
        <div className='grid lg:grid-cols-2 gap-12'>
          {/* Product Images */}
          <div className='space-y-4'>
            <div className=' relative aspect-square rounded-lg overflow-hidden bg-muted'>
              <ProductImage
                product={product}
                className='w-full h-full object-cover'
              />
            </div>
            <div className='grid grid-cols-3 gap-4'>
              <div className='relative aspect-square rounded-lg overflow-hidden bg-muted cursor-pointer hover:opacity-80 transition-opacity'>
                <ProductImage
                  product={product}
                  className='w-full h-full object-cover'
                />
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className='space-y-6'>
            <div>
              <p className='text-sm text-muted-foreground uppercase tracking-wider mb-2'>
                {product.category}
              </p>
              <h1 className='font-serif text-4xl font-semibold text-balance'>
                {product.title}
              </h1>
            </div>

            <div className='flex items-center gap-4'>
              <div className='flex items-center gap-1'>
                {[...Array(5)].map((_, i) => (
                  <Star
                    // eslint-disable-next-line react/no-array-index-key
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.floor(product.rating)
                        ? 'fill-accent text-accent'
                        : 'fill-muted text-muted'
                    }`}
                  />
                ))}
              </div>
              <span className='text-sm text-muted-foreground'>
                {product.rating} ({product?.reviews.length || 0} reviews)
              </span>
            </div>

            <div className='text-3xl font-semibold'>
              ${product.price.toFixed(2)}
            </div>

            <p className='text-muted-foreground leading-relaxed'>
              {product.description}
            </p>

            <div className='flex gap-3'>
              <Button size='lg' className='flex-1'>
                <ShoppingBag className='h-5 w-5 mr-2' />
                Add to Bag
              </Button>
              <Button size='lg' variant='outline'>
                <Heart className='h-5 w-5' />
              </Button>
            </div>

            {product.stock && (
              <p className='text-sm text-green-600 dark:text-green-400'>
                In Stock
              </p>
            )}

            <Card className='p-6 bg-secondary/30 gap-2.5'>
              <h3 className='font-semibold'>Product Details</h3>
              <ul className='space-y-2 text-sm text-muted-foreground'>
                {Object.entries(product?.dimensions).map(([key, value]) => (
                  <li key={`${key}-${value}`}>
                    <span className='capitalize'>{key}: {value} </span>
                    inches
                  </li>
                ))}
                <li className='capitalize'>brand: {product?.brand}</li>
                <li className='capitalize'>features: {product?.features}</li>
                <li className='capitalize'>return policy: {product?.returnPolicy}</li>
              </ul>
            </Card>
          </div>
        </div>

        {/* Reviews Section */}
        <div className='mt-20'>
          <h2 className='font-serif text-3xl font-semibold mb-8'>
            Customer Reviews
          </h2>
          <div className='grid lg:grid-cols-3 gap-8'>
            <div className='lg:col-span-2'>
              <ReviewList productReviews={product.reviews} />
            </div>
            <div className='lg:col-span-1'>
              <ReviewForm productId={product.id} productSlug={slug} />
            </div>
          </div>
        </div>

        {/* AI-Powered Recommendations */}
        <div className='mt-20'>
          <Suspense fallback={<RecommendationsSkeleton />}>
            <ProductRecommendations category={product.category} />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
